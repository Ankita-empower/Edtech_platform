import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Divider, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

const difficultyLabels = ["Beginner", "Moderate", "Advanced"];

const CourseDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, index } = location.state || {};
  if (!course) {
    return <Typography>Error: No course data found.</Typography>;
  }

  const handleViewMyCourses = () => {
    navigate("/my-courses");
  }

  return (
    <Box className="create-course background-graphics">
      <Box className="main-wrapper">
        <Box className="content-wrapper">
          <Grid container spacing={4} sx={{ maxWidth: "1335px" }} mx="auto">
            <Grid size={{ xs: 12, md: 12, lg: 7 }} >
              <Box>
                <CardContent className="p-40">
                  {/* <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            Course {index + 1}
          </Typography> */}
                  <Typography variant="h5" mb={1}>{course.title}</Typography>
                  <Typography variant="body1">{course.description}</Typography>
                  <Typography variant="body1">
                    <strong>Category:</strong> {course.category}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Duration:</strong> {course.duration} mins
                  </Typography>
                  <Typography variant="body1">
                    <strong>Difficulty:</strong> {difficultyLabels[course.difficulty]}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h5">Lessons</Typography>
                  {course.lessons?.length > 0 ? (
                    course.lessons?.map((lesson: any) => (
                      <Box key={lesson.id} sx={{ my: 2 }}>
                        <Typography variant="h6">{lesson.title}</Typography>
                        <div dangerouslySetInnerHTML={{ __html: lesson.body }} />
                      </Box>
                    ))
                  ) : (
                    <Typography>No lessons available.</Typography>
                  )}
                  <Button variant="contained" color="primary" onClick={handleViewMyCourses} sx={{textAlign: "right"}}>
                    My Courses
                  </Button>
                </CardContent>

              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseDetails;
