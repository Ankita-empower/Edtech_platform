import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Grid2
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BrowseCourse: React.FC = () => {
  const navigate = useNavigate();

  const courses = ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"];

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EdTech Platform
          </Typography>
          <Button color="inherit" onClick={() => navigate("/create-course")}>Create Course</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hello User, Let's get Started
        </Typography>
        <TextField
          label="Search Course"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 4 }}
        />

        <Grid2 container spacing={2}>
          {courses.map((course, index) => (
            <div key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{course}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/course/${index + 1}`)}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default BrowseCourse