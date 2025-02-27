import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QuizDialog from "../quiz/QuizDialog";
import {
  handleSaveLessons,
  addLessonToCourse,
} from "../../redux/slices/courseSlice";
import RightPanel from "./RightPanel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { showAlert } from "../../redux/slices/alertSlice";
import DeleteIcon from "../../assets/icons/trash.png";
import { RootState } from "../../redux/store/store";
import axios from "axios";
import {
  createLesson,
  uploadLessonMedia,
} from "../../services/createCourseService";
import Loader from "../loader/Loading";

interface LessonMedia {
  id: number;
  type: string;
  url: string;
  lessonId: number;
  lesson: string;
  name?: string; // File name
}

interface LessonData {
  id: number;
  title: string;
  body: string;
  lessonMedia: LessonMedia[];
}

interface QuizData {
  title: string;
  questions: {
    id: number;
    question: string;
    answerType: number;
    correctAnswer: string;
    options: string[];
  }[];
}

const steps = ["Course", "Lessons", "Overview"];

const CreateLesson: React.FC = () => {
  const availableResource = useSelector(
    (state: RootState) => state.course?.courseData
  );
  const [lessonTitle, setLessonTitle] = useState("");
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [lessonContent, setLessonContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState<LessonMedia[]>([]);
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (activeStep === 1) {
      navigate("/course-overview");
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    navigate("/create-course");
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setIsFileUploading(true);
      const file = event.target.files[0];
      const fileType = file.type.includes("image")
        ? "image"
        : file.type.includes("video")
        ? "video"
        : file.type.includes("pdf")
        ? "pdf"
        : "document";

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await uploadLessonMedia(formData);

        if (response) {
          const fileUrl = response.url;

          setMediaFiles((prevMedia) => [
            ...prevMedia,
            {
              id: 0,
              type: fileType,
              url: fileUrl,
              lessonId: 0,
              lesson: lessonTitle,
              name: file.name,
            },
          ]);
        }
      } catch (error) {
        console.error("File upload error:", error);
        dispatch(
          showAlert({
            message: "File upload failed. Please try again.",
            severity: "error",
          })
        );
      }
      setIsFileUploading(false);
    }
  };

  const handleRemoveFile = (name: string) => {
    setMediaFiles((prevMedia) =>
      prevMedia.filter((file) => file.name !== name)
    );
  };

  const handleSaveQuiz = async (savedQuiz: QuizData) => {
    console.log("handle save quiz in crate lessons", savedQuiz)
    setQuiz(savedQuiz); 
    handleCreateLessonWithQuiz(savedQuiz);
    // setTimeout(() => {
    //   handleCreateLessonWithQuiz(savedQuiz);
    // }, 100);
  
   
  };

  const handleCreateLessonWithQuiz = async (savedQuiz: QuizData)=>{
    console.log("handleCreateLessonWithQuiz")
    if (lessonTitle.trim() && lessonContent.trim()) {
      setLoading(true);
      const newLesson: LessonData = {
        id: 0,
        title: lessonTitle,
        body: lessonContent,
        lessonMedia: mediaFiles,
      };

      const userId = localStorage.getItem("userId") || null
      const payload = {
        id: 0,
        title: lessonTitle,
        body: lessonContent,
        lessonMedia: mediaFiles,
        courseId: availableResource?.id || 0,
        userId: userId,

        quizzes: savedQuiz
        ? [
            {
                id: 0,
                lessonId: 0,
                title: savedQuiz.title,
                userId: userId, 
                completionTime: 0, 
                retakeCooldDownTime: 0, 
                questions: savedQuiz.questions.map((q) => ({
                    id: 0,
                    question: q.question,
                    answerType: q.answerType,
                    correctAnswer: q.correctAnswer,
                    optionA: q.options[0] || "", 
                    optionB: q.options[1] || "",
                    optionC: q.options[2] || "",
                    optionD: q.options[3] || "",
                })),
            },
        ]
        : [],
      };

      try {
        console.log("Sending Payload:", payload);
        const response = await createLesson(payload);
        console.log("Create lesson Response data", response);
        dispatch(
          showAlert({
            message: "Lesson added to course successfully.",
            severity: "success",
          })
        );
        dispatch(addLessonToCourse(response));
        setLessons([...lessons, newLesson]);
        setLessonTitle("");
        setLessonContent("");
        setQuiz(null);
        setMediaFiles([]);
      } catch (error) {
        dispatch(
          showAlert({
            message: "error creating course.",
            severity: "info",
          })
        );
        setLessonTitle("")
        setLessonContent("")

      } finally {
        setLoading(false);
      }
    } else {
      dispatch(
        showAlert({
          message:
            "Lesson title and lesson content are required to proceed further!",
          severity: "info",
        })
      );
    }
  }
  

  const handleAddLesson = async () => {
    console.log("handle add lesson in createlesson.tsx", quiz)
    if (!quiz) {
      setQuizDialogOpen(true);
      return;
    }
  };

  

  const handleCourseOverview = () => {
    // dispatch(handleSaveLessons(lessons));
    navigate("/course-overview");
  };

  return (
    <Box className="create-lesson background-graphics">
      {loading ? (
        <Loader message="Adding Lesson..." />
      ) : (
        <Box className="main-wrapper">
          <Box className="content-wrapper">
            <Grid container spacing={4} sx={{ maxWidth: "1335px" }} mx="auto">
              <Grid size={{ xs: 12, md: 12, lg: 8 }}>
                <CardContent>
                  <Box className="panel-wrapper">
                    <Box className="panel-content">
                      <Typography variant="h5" gutterBottom>
                        Create Lesson
                      </Typography>
                      <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{
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
                        }}
                      >
                        {steps.map((label, index) => (
                          <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>

                      <Typography variant="h6" gutterBottom>
                        Lesson Title
                      </Typography>

                      <TextField
                        fullWidth
                        label="Lesson Title"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        sx={{ margin: "0" }}
                      />
                    </Box>
                    <Box className="panel-body">
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        Lesson Content
                      </Typography>

                      {/* Quill Editor */}
                      <ReactQuill
                        placeholder="Type or Paste your content here"
                        theme="snow"
                        value={lessonContent}
                        onChange={setLessonContent}
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["bold", "italic", "underline", "strike"],
                            [{ color: [] }, { background: [] }],
                            [{ align: [] }],
                            ["link", "image", "video"],
                            ["clean"],
                          ],
                        }}
                        style={{ height: "auto" }}
                      />

                      {/* Display Attached Files */}
                      {mediaFiles.length > 0 && (
                        <Box mt={2}>
                          <Typography className="sub-heading">
                            MATERIALS
                          </Typography>
                          {mediaFiles.map((file) => (
                            <Box
                              key={file.name}
                              display="flex"
                              alignItems="baseline"
                              my={1}
                              justifyContent="space-between"
                            >
                              <Box display="flex">
                                <Typography
                                  variant="body1"
                                  sx={{ marginRight: "8px" }}
                                >
                                  {file.name}
                                </Typography>

                                {/* Optionally, show a preview for image and video files */}
                                {file.type === "image" && (
                                  <img
                                    src={file.url}
                                    alt={file.name}
                                    style={{
                                      width: "auto",
                                      height: "50px",
                                      marginLeft: "16px",
                                    }}
                                  />
                                )}
                                {file.type === "video" && (
                                  <video width="50" height="50" controls>
                                    <source src={file.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                              </Box>
                              {/* Display the file type (e.g., PDF, DOC, etc.) and the delete button */}
                              <IconButton
                                color="error"
                                onClick={() =>
                                  file.name && handleRemoveFile(file.name)
                                }
                                sx={{ padding: "0" }}
                              >
                                <img src={DeleteIcon} alt="delete" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Box className="panel-footer">
                      {/* Attach File Button */}

                      <Button
                        className="Attach-file-btn"
                        component="label"
                        disabled={isFileUploading}
                        fullWidth
                      >
                        {isFileUploading ? "Attaching file... " : "Attach File"}
                        <input
                          type="file"
                          hidden
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4"
                          onChange={handleFileUpload}
                        />
                      </Button>

                      <Box
                        mt={3}
                        display="flex"
                        justifyContent="space-between"
                        gap={2}
                      >
                        {/* <Button
                        variant="outlined"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        Back
                      </Button> */}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddLesson}
                          disabled={!(lessonTitle && lessonContent)}
                        >
                          Create Lesson
                        </Button>
{/* 
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleCourseOverview}
                          disabled={!lessonTitle}
                        >
                          Create Quiz
                        </Button> */}

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleCourseOverview}
                        >
                          Course Overview
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Grid>
              <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                <RightPanel lessons={lessons || []} />
              </Grid>
            </Grid>
          </Box>
          {/* ✅ Quiz Dialog Component */}
          <QuizDialog open={quizDialogOpen} onClose={() => setQuizDialogOpen(false)} onSaveQuiz={handleSaveQuiz} />
        </Box>
      )}
    </Box>
  );
};

export default CreateLesson;
