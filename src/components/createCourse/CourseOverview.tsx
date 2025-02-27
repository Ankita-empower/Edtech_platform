import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { createCourse } from "../../services/createCourseService";
import { showAlert } from "../../redux/slices/alertSlice"
import { resetCourseData } from "../../redux/slices/courseSlice";
import Loader from "../loader/Loading";
import { fetchCourseById } from "../../services/userCoursesService";
import { RootState } from "../../store/store";
import { Category, Description } from "@mui/icons-material";

const steps = ["Settings", "Lessons", "Overview"];

const CourseOverview: React.FC = () => {
  // const courseData = useSelector((state: any) => state.course?.courseData);
  const cId = useSelector((state: RootState)=> state.course?.courseData?.id ?? 0)
  const [activeStep, setActiveStep] = useState(2);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({
    category: "",
    description: "",
    difficulty: 0,
    duration: 0,
    id: 0,
    lessons : [],
    publicStatus: true,
    title: "",
    userId : localStorage.getItem("userId") ?? 0
  })

useEffect(()=>{
  const fetchCourse = async ()=>{
    const response = await fetchCourseById(cId);
    console.log("response course overview",response)
  setCourseData(
    {
      id: response.id,
      title: response.title,
      description: response.description,
      category: response.category,
      duration: response.duration,
      publicStatus: response.publicStatus,
      difficulty: response.difficulty,
      userId: response.userId,
      lessons: response.lessons || [], 
    }
  );
  }
 fetchCourse()
}, [])

  // const handleCreateCourse = async () => {

  //   const authToken = localStorage.getItem("token");
  //   const userId = localStorage.getItem("userId");

  //   if (!authToken) {

  //     dispatch(showAlert({ message: "Authentication required!", severity: "error" }));

  //     return;
  //   }

  //   if (!courseData) {

  //     dispatch(showAlert({ message: "No course data available", severity: "error" }));
  //     return;
  //   }

  //   setLoading(true);

  //   // Construct API Payload
  //   const payload = {
  //     title: courseData.title || "",
  //     description: courseData.description || "",
  //     category: courseData.category || "",
  //     // tags: courseData.tags || "",
  //     duration: Number(courseData.duration) || 0,
  //     publicStatus: courseData.publicStatus ?? true,
  //     difficulty: courseData.difficulty || 0,
  //     userId: userId ? userId : courseData.userId || null,
  //     lessons: courseData.lessons
  //       ? courseData.lessons.map((lesson: any) => ({
  //         id: lesson.id || 0,
  //         title: lesson.title || "",
  //         body: lesson.body || "",
  //         courseId: lesson.courseId || 0,
  //         userId: userId ? userId : lesson.userId || null,
  //         // course: courseData.title || "",
  //         lesson_Media: lesson.lessonMedia
  //           ? lesson.lessonMedia.map((media: any) => ({
  //             id: media.id || 0,
  //             type: media.type || "",
  //             url: media.url || "",
  //             lessonId: media.lessonId || 0,
  //           }))
  //           : [],
  //         quizzes: lesson.quizzes
  //           ? lesson.quizzes.map((quiz: any) => ({
  //             id: quiz.id || 0,
  //             lessonId: quiz.lessonId || 0,
  //             title: quiz.title || "",
  //             retakeCooldDownTime: quiz.retakeCooldDownTime || 0,
  //             userId: quiz.userId || null,
  //             questions: quiz.questions
  //               ? quiz.questions.map((question: any) => ({
  //                 id: question.id || 0,
  //                 quizId: question.quizId || 0,
  //                 question: question.question || "",
  //                 optionA: question.optionA || "",
  //                 optionB: question.optionB || "",
  //                 optionC: question.optionC || "",
  //                 optionD: question.optionD || "",
  //                 correctAnswer: question.correctAnswer || "",
  //                 answerType: question.answerType || 0,
  //               }))
  //               : [],
  //           }))
  //           : [],
  //       }))
  //       : [],
  //   };


  //   try {
  //     const response = await createCourse(payload);


  //     dispatch(showAlert({ message: "Course created successfully!", severity: "success" }));
  //     dispatch(resetCourseData());
  //     navigate(`/course/${response.id}`, { state: { course: response } });
  //   } catch (error) {
  //     dispatch(showAlert({ message: "Error creating course", severity: "error" }));
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    navigate("/create-lessons");
  };

  const handleCancel = () => {
    dispatch(resetCourseData());
    navigate("/home");
  };

  const handleViewCourses = () => {
    navigate("/my-courses")
  }

  return (
    <Box className="background-graphics">
      {loading ? (<Loader message="Creating course..." />) :
        (<Box className="main-wrapper">
          <Box className="content-wrapper">
          <Grid container spacing={4} sx={{ maxWidth: "1335px" }} mx="auto">
            <Grid size={{ xs: 12, md: 12, lg: 8 }} >
              <Box>
                <CardContent className="p-40">
                  <Typography variant="h5" gutterBottom>
                    Course Overview
                  </Typography>
                  <Stepper activeStep={activeStep} alternativeLabel  sx={{
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
                          border: "2px solid #ff6b4a",
                          color: "#ff6b4a !important",
                          backgroundColor: "#fff", // Change outline color for completed step
                        },
                      }}>
                    {steps.map((label, index) => (
                      <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <Typography variant="h6">Course Details</Typography>
                  <Typography><strong>Title:</strong> {courseData?.title}</Typography>
                  <Typography><strong>Category:</strong> {courseData?.category}</Typography>
                  <Typography><strong>Difficulty:</strong> {courseData?.difficulty}</Typography>
                  <Typography><strong>Duration:</strong> {courseData?.duration} min</Typography>
                  <Typography><strong>Description:</strong> {courseData?.description}</Typography>

                  <Divider sx={{ marginY: "16px" }} />

                  <Typography variant="h5" gutterBottom>Lessons Overview</Typography>
                  {courseData?.lessons && courseData.lessons.length > 0 ? (
                    courseData.lessons.map((lesson: any) => (
                      <Box key={lesson.title} sx={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                        <Typography variant="h6">{lesson.title}</Typography>
                        <Typography><strong>Content:</strong></Typography>
                        <div dangerouslySetInnerHTML={{ __html: lesson.body }} />

                        {lesson.lessonMedia?.length > 0 && (
                          <>
                            <Typography variant="h6" sx={{ marginTop: "10px" }}>Attached Media</Typography>
                            {lesson.lessonMedia.map((media: any) => (
                              <Box key={media.id} mt={1} display="flex" alignItems="center">
                                {media.type === "image" && <img src={media.url} alt="Lesson Media" width="100%" />}
                                {media.type === "video" && <video src={media.url} controls width="100%" />}
                                {(media.type === "pdf" || media.type === "document") && (
                                  <Box display="flex" alignItems="center">
                                    <InsertDriveFileIcon sx={{ marginRight: "8px", color: "blue" }} />
                                    <Typography variant="body1" sx={{ marginRight: "8px" }}>{media.name}</Typography>
                                    <Button variant="outlined" color="primary" href={media.url} target="_blank">View</Button>
                                  </Box>
                                )}
                              </Box>
                            ))}
                          </>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography>No lessons available.</Typography>
                  )}

                  <Box display="flex" justifyContent="space-between" mt={3} gap={2}>
                  <Button variant="outlined" onClick={handleViewCourses} >View Courses</Button>
                    {/* <Button variant="outlined" onClick={handleBack} disabled={activeStep === 1}>Back</Button>
                    <Button variant="contained" color="primary" onClick={handleCreateCourse} disabled={loading}>
                      {loading ? "Creating..." : "Create Course"}
                    </Button>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button> */}
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
          </Box>
        </Box>
        )}
    </Box>
  );
};

export default CourseOverview;
