import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Container,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Chip,
} from "@mui/material";
import {  UploadFile} from "@mui/icons-material";

const ViewCourse: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [courseTitle, setCourseTitle] = useState("UI/UX Design");
  const [description, setDescription] = useState(
    "Unlock the secrets of creating captivating digital experiences with our immersive UI/UX design online course."
  );
  // @ts-ignore: Ignore unused variable
  const [lessons, setLessons] = useState([
    "Fundamentals of UI/UX Design",
    "Wireframing and Prototyping",
    "Visual Design and Branding",
    "Usability Testing and Iteration",
    "Designing for Accessibility and Inclusivity",
  ]);

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

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <AppBar position="static" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Course
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Stack spacing={4}>
          {/* Course Title and Description Section */}
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {courseTitle}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {description}
              </Typography>
              <Stack spacing={2} direction="row">
                <TextField
                  fullWidth
                  label="Edit Title"
                  variant="outlined"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  fullWidth
                  label="Edit Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ flex: 2 }}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary">
                Save Changes
              </Button>
            </CardActions>
          </Card>

          {/* Stepper for Lessons */}
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Lessons
              </Typography>
              <Stepper activeStep={activeStep} alternativeLabel>
                {lessons.map((lesson, index) => (
                  <Step key={index}>
                    <StepLabel>{lesson}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={activeStep === lessons.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Additional Features Section */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            {/* Materials Section */}
            <Card elevation={3} sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Materials
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<UploadFile />}
                >
                  Upload Materials
                </Button>
              </CardContent>
            </Card>

            {/* Pending Enrollment Requests */}
            <Card elevation={3} sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Pending Enrollment Requests
                </Typography>
                <Stack spacing={1}>
                  <Chip label="Cooper Workman" onDelete={() => {}} />
                  <Chip label="Emery Pasquinelli Arcand" onDelete={() => {}} />
                  <Chip label="Allison Schleifer" onDelete={() => {}} />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ViewCourse ;
