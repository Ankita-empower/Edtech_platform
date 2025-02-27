import React from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Lesson {
  id: number;
  title: string;
  body: string;
  lesson_Media: {
    id: number;
    type: string;
    url: string;
    lessonId: number;
  }[];
}

interface LessonListProps {
  lessons: Lesson[];
  course: any; // Pass the whole course object for navigation
}

const LessonList: React.FC<LessonListProps> = ({ lessons, course }) => {
  const navigate = useNavigate();

  const handleLessonClick = (lesson: Lesson) => {
    navigate("/lesson-details", { state: { lesson, course } });
  };

  return (
    <Box mt={2}>
      <Typography variant="h6">Lessons:</Typography>
      {lessons.length > 0 ? (
        lessons.map((lesson, index) => (
          <Card
            key={lesson.id}
            sx={{ marginTop: 2, cursor: "pointer", "&:hover": { boxShadow: 4 } }}
            onClick={() => handleLessonClick(lesson)}
          >
            <CardContent>
              <Typography variant="h6">
                Lesson {index + 1}: {lesson.title}
              </Typography>
              {/* <Divider sx={{ my: 1 }} /> */}
              {/* <Typography variant="body2" color="textSecondary">
                {lesson.body.length > 50 ? lesson.body.substring(0, 50) + "..." : lesson.body}
              </Typography> */}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No lessons available.</Typography>
      )}
    </Box>
  );
};

export default LessonList;
