import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Stepper,
  Card,
  CardContent,
  InputLabel,
  Step,
  StepLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
  Switch,
  SelectChangeEvent,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { setCourseData } from "../../redux/slices/courseSlice";
import { RootState } from "../../redux/store/store";
import { resetCourseData } from "../../redux/slices/courseSlice";
import { createCourse } from "../../services/createCourseService";
import { showAlert } from "../../redux/slices/alertSlice";
import Loader from "../loader/Loading";

// Define Lesson Media Type
interface LessonMedia {
  id: number;
  type: string;
  url: string;
  lessonId: number;
  lesson: string;
}

// Define Lesson Type (Matching `LessonData` in Redux)
interface Lesson {
  id: number;
  title: string;
  body: string;
  lessonMedia: LessonMedia[];
}

// Define Course Data Type
interface CourseData {
  category: string;
  difficulty: number;
  title: string;
  duration: string;
  gender: string;
  style: string;
  description: string;
  flashcards: boolean;
  lessons: Lesson[];
}

const validationSchema = yup.object({
  category: yup.string().required("Course category is required"),
  title: yup.string().required("Course title is required"),
  duration: yup
    .number()
    .typeError("Duration must be a number")
    .required("Duration is required")
    .positive("Duration must be greater than zero"),
  gender: yup.string().required("Please select a gender"),
  description: yup.string().required("Course description is required"),
});

const CreateCourse: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const availableCourseData = useSelector(
    (state: RootState) => state?.course?.courseData
  );
  const [lessons, setLessons] = useState<string[]>([
    "Course",
    "Lessons",
    "Overview",
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [courseData, updateCourseData] = useState<CourseData>({
  //   category: availableCourseData?.category || "",
  //   difficulty: availableCourseData?.difficulty || 0,
  //   title: availableCourseData?.title || "",
  //   duration: availableCourseData?.duration || "",
  //   gender: availableCourseData?.gender || "",
  //   style: availableCourseData?.style || "",
  //   description: availableCourseData?.description || "",
  //   flashcards: availableCourseData?.flashcards || false,
  //   lessons: availableCourseData?.lessons || [],
  // });

  const [courseData, updateCourseData] = useState<CourseData>({
    category:  "",
    difficulty:  0,
    title: "",
    duration:  "",
    gender: "",
    style: "",
    description:  "",
    flashcards: false,
    lessons: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep < lessons.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(courseData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationError: any) {
      const newErrors: Record<string, string> = {};
      validationError.inner.forEach((err: yup.ValidationError) => {
        if (err.path) {
          newErrors[err.path] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let updatedValue: string | boolean | number = type === "checkbox" 
      ? (e.target as HTMLInputElement).checked 
      : value;
  
    
    if (name === "duration") {
      const numericValue = Number(value);
      if (numericValue < 1 || isNaN(numericValue)) return; 
      updatedValue = numericValue;
    }
  
    updateCourseData((prev) => ({ ...prev, [name]: updatedValue }));
    validateField(name, updatedValue); 
  };
  

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const updatedValue = name === "difficulty" ? Number(value) : value;

    updateCourseData((prev) => ({ ...prev, [name]: updatedValue }));
    validateField(name, updatedValue); // Validate field on change
  };

  const validateField = async (name: string, value: any) => {
    try {
      await (yup.reach(validationSchema, name) as yup.AnySchema).validate(
        value
      );
      setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error if valid
    } catch (validationError: any) {
      setErrors((prev) => ({ ...prev, [name]: validationError.message })); // Set error message
    }
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    updateCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    updateCourseData((prev) => ({ ...prev, gender: value }));
    validateField("gender", value); // Validate field on change
  };

  const handleCancel = () => {
    dispatch(resetCourseData());
    navigate("/home");
  };

  const handleSaveAndContinue = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
    setLoading(true);
    const userId = localStorage.getItem("userId");

    const payload = {
      id: 0,
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      duration: Number(courseData.duration),
      publicStatus: true,
      difficulty: courseData.difficulty,
      // createdAt: "",
      // updatedAt: "",
      userId: userId || "",
      lessons: [], 
    };

      try {
        const response = await createCourse(payload);
        console.log("response")
    
          dispatch(showAlert({ message: "Course created successfully!", severity: "success" }));
          dispatch(setCourseData(response));
          navigate("/create-lessons");
          // navigate(`/course/${response.id}`, { state: { course: response } });
        } catch (error) {
          dispatch(showAlert({ message: "Error creating course", severity: "error" }));
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
   

  };

  return (
    <Box className="create-course background-graphics">
      {loading ? (<Loader message="Creating course..." />) : (
      <Box className="main-wrapper">
      <Box className="content-wrapper">
      <Grid container spacing={4} sx={{ maxWidth: "1335px" }} mx="auto">
        <Grid size={{ xs: 12, md: 12, lg: 8 }} className="left-panel">
          <Box>
            <Box>
              <CardContent>
              <Box className="panel-content" sx={{paddingBottom: "40px"}}>
                <Typography variant="h5" gutterBottom>
                  Create a Course
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel sx={{
                  my: "24px",
                  ".MuiStepIcon-root": {
                    color: "transparent !important", // Make the default step icon transparent
                    border: "2px solid gray", // Add an outlined effect
                    borderRadius: "50%", // Make sure it's circular
                  },
                  ".MuiStepIcon-text": {
                    fill: "gray", // Default step number color
                  },
                  ".Mui-active .MuiStepIcon-root": {
                    border: "2px solid #ff6b4a", // Change outline color for active step
                    
                  },
                  ".Mui-active .MuiStepIcon-text": {
                    fill: "#ff6b4a", // Change active step number text color
                  },
                  ".Mui-completed .MuiStepIcon-root": {
                    border: "none",
                    backgroundColor: "#ff6b4a", // Change outline color for completed step
                  },
                }}>
                  {lessons.map((lesson, index) => (
                    <Step key={index}>
                      <StepLabel>{lesson}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                      <Box mt={3}>
                        <Grid container spacing={2}>
                          <Grid size={6}>
                            <FormControl fullWidth margin="normal">
                              <InputLabel>Course Category</InputLabel>
                              <Select
                                value={courseData.category}
                                name="category"
                                onChange={handleCategoryChange}
                              >
                                <MenuItem value="Web Design">
                                  Web Design
                                </MenuItem>
                                <MenuItem value="Prototyping">
                                  Prototyping
                                </MenuItem>
                              </Select>
                              {errors.category && (
                                <FormHelperText>
                                  {errors.category}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid size={6}>
                            <FormControl fullWidth margin="normal">
                              <InputLabel>Difficulty</InputLabel>
                              <Select
                                value={courseData.difficulty.toString()}
                                name="difficulty"
                                onChange={handleSelectChange}
                              >
                                <MenuItem value="0">Beginner</MenuItem>
                                <MenuItem value="1">Moderate</MenuItem>
                                <MenuItem value="2">Advanced</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>

                        <FormControl fullWidth margin="normal">
                          <TextField
                            label="Course Title"
                            name="title"
                            variant="outlined"
                            value={courseData.title}
                            onChange={handleInputChange}
                          />
                          {errors.title && (
                            <FormHelperText>{errors.title}</FormHelperText>
                          )}
                        </FormControl>

                        <Grid container spacing={2} alignItems="center">
                          <Grid size={6}>
                            <FormControl fullWidth margin="normal">
                              <TextField
                                label="Duration"
                                type="number"
                                variant="outlined"
                                name="duration"
                                value={courseData.duration}
                                onChange={handleInputChange}
                              />
                              {errors.duration && (
                                <FormHelperText>
                                  {errors.duration}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid size={6}>
                            <FormControl
                              component="fieldset"
                              error={!!errors.gender}
                            >
                              <Typography>Gender</Typography>
                              <RadioGroup
                                row
                                value={courseData.gender}
                                onChange={handleGenderChange}
                              >
                                <FormControlLabel
                                  value="male"
                                  control={<Radio />}
                                  label="Male"
                                />
                                <FormControlLabel
                                  value="female"
                                  control={<Radio />}
                                  label="Female"
                                />
                              </RadioGroup>
                              {errors.gender && (
                                <FormHelperText>{errors.gender}</FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>

                        <FormControl margin="normal">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={courseData.flashcards}
                                onChange={handleInputChange}
                                name="flashcards"
                              />
                            }
                            label="Enable Flashcards"
                          />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <InputLabel>Choose Style</InputLabel>
                          <Select
                            name="style"
                            value={courseData.style}
                            onChange={handleSelectChange}
                          >
                            <MenuItem value="Celine Dion">Celine Dion</MenuItem>
                            <MenuItem value="Adele">Adele</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <TextField
                            label="Course Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="description"
                            value={courseData.description}
                            onChange={handleInputChange}
                          />
                          {errors.description && (
                            <FormHelperText>
                              {errors.description}
                            </FormHelperText>
                          )}
                        </FormControl>

                        <FormControlLabel
                          control={
                            <Switch
                              checked={courseData.flashcards}
                              onChange={handleInputChange}
                              name="flashcards"
                            />
                          }
                          label="Create Flashcards"
                        />

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mt={3}
                          gap={2}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveAndContinue}
                            disabled={loading}
                          >
                             {loading ? "Creating..." : "Create Course"}
                          </Button>
                          <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box> )}
    </Box>
  );
};

export default CreateCourse;
