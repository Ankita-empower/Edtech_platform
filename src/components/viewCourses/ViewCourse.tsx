import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Divider,
} from "@mui/material";
import LessonList from "./LessonList";

const difficultyLabels = ["Beginner", "Moderate", "Advanced"];

const ViewCourse: React.FC = () => {
  const location = useLocation();
  const { course } = location.state || {};

  if (!course) {
    return <Typography>Error: No course data found.</Typography>;
  }

  return (
    <Box className="user-course background-graphics">
      <Box className="main-wrapper">
              <Box className="content-wrapper">
      <Card elevation={3} sx={{ padding: "20px", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {course.title}
        </Typography>

        {/* Course Metadata */}
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Category:</strong> {course.category}
        </Typography>
        <Typography variant="body1">
          <strong>Duration:</strong> {course.duration} mins
        </Typography>
        <Typography variant="body1">
          <strong>Difficulty:</strong> {difficultyLabels[course.difficulty]}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Course Description */}
        <Typography variant="h6">Description</Typography>
        <Typography>{course.description}</Typography>
      </Card>

      {/* Lessons List */}
      <LessonList lessons={course.lessons} course={course} />
    </Box>
    </Box>
    </Box>
  );
};

export default ViewCourse;
