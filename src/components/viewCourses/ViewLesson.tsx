import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const ViewLesson: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lesson, course } = location.state || {};

  if (!lesson || !course) {
    return <Typography>Error: Lesson or Course data not found.</Typography>;
  }

  const handleLessonClick = (selectedLesson: any) => {
    navigate("/lesson-details", { state: { lesson: selectedLesson, course } });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", padding: "40px", marginTop: "100px", marginLeft: "300px",  }}>
      {/* Lesson Content */}
      <Box flex={3} sx={{ paddingRight: "20px" }}>
        <Card elevation={3} sx={{ padding: "20px" }}>
          <Typography variant="h5" fontWeight="bold">
            {lesson.title}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Lesson Body */}
          <div dangerouslySetInnerHTML={{ __html: lesson.body }} />

          {/* Lesson Media */}
          {lesson.lesson_Media.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Materials</Typography>
              {lesson.lesson_Media.map((media: any) => (
                <Box key={media.id} sx={{ mt: 1 }}>
                  {media.type === "pdf" ? (
                    <Typography variant="body2">
                      📄{" "}
                      <a
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF
                      </a>
                    </Typography>
                  ) : media.type === "video" ? (
                    <iframe
                      src={media.url}
                      width="100%"
                      height="300"
                      frameBorder="0"
                      allowFullScreen
                    />
                  ) : (
                    <Typography variant="body2">
                      {media.type}: {media.url}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Card>
      </Box>

      {/* Side Panel - Lesson List */}
      <Box flex={1} sx={{ padding: "20px", bgcolor: "#f5f5f5" }}>
        <Typography variant="h6" fontWeight="bold">
          Schedule
        </Typography>
        <List>
          {course.lessons.map((l: any, index: number) => (
            <ListItem
              key={l.id}
              sx={{
                cursor: "pointer",
                backgroundColor: l.id === lesson.id ? "#e0e0e0" : "transparent",
                "&:hover": { backgroundColor: "#ddd" },
              }}
            >
              <Button
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  textTransform: "none",
                  color: "black",
                }}
                onClick={() => handleLessonClick(l)}
              >
                <ListItemText
                  primary={`Lesson ${index + 1}: ${l.title}`}
                  // secondary={
                  //   l.body.length > 30 ? l.body.substring(0, 30) + "..." : l.body
                  // }
                />
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ViewLesson;
