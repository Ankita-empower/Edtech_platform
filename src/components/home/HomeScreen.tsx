import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Container,
  Stack,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";
import mainImage from '../../assets/create-course/education 1.png';
import createCourseImg from '../../assets/create-course/create-course.png';
import uploadImg from '../../assets/create-course/upload-doc.png';
import { Box } from "@mui/system";
import UploadFile from '../uploadFile/UploadFile';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../services/userService";
import { setUserData } from "../../redux/slices/userSlice";

const HomeScreen: React.FC = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCourse = () => {
    navigate('/create-course');
  }

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const storedEmail = localStorage.getItem("email");

        if (!storedEmail) return;

        const userData = await fetchUserProfile(storedEmail);

        dispatch(setUserData({ ...userData, loading: false, error: null }));

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Box className="home-page background-graphics h-100">
      <Container>
        <Box display='flex' flexDirection='column' justifyContent='center' className="h-100">
          <Box>
            <Box textAlign='center'><img src={mainImage} alt="Education" /></Box>
            <Typography variant="h5" gutterBottom textAlign="center">
              Hi John, lets get started 😉
            </Typography>
            <Typography variant="subtitle1" textAlign="center" gutterBottom>
              Type what you’d like to learn and get an original study plan personalized for you
            </Typography>
          </Box>

          <Stack spacing={4} direction={{ xs: "column", md: "row" }} sx={{ marginTop: 5 }}>
            {/* Create a Course Card */}
            <Box sx={{ width: 300, textAlign: "center", flex: "1" }}>
              <CardContent className="home-card">
                <Typography display='flex' alignItems='center' justifyContent='center' gap={1} fontWeight={700}>
                  <img src={createCourseImg} alt="Education" />Create a Course
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Generate personalized courses with approved study materials from the web.
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Write here..."
                 className="course-textfield"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography className="label">Teach me:</Typography>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          className="create-btn"
                          onClick={handleCreateCourse}
                        >
                          Create
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </CardContent>
            </Box>

            {/* Upload Documents Card */}
            <Box sx={{ width: 300, textAlign: "center", flex: "1" }}>
              <CardContent className="home-card">
                <Typography display='flex' alignItems='center' justifyContent='center' gap={1} fontWeight={700}>
                  <img src={uploadImg} alt="Education" />Upload Documents
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Uploading additional materials helps building a course tailored just for your needs
                </Typography>
                <Button
                  className="upload-btn"
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<FileUploadIcon />}
                  size="large"
                  fullWidth
                  sx={{ height: "56px" }}
                  onClick={handleOpen}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
              </CardContent>
            </Box>
          </Stack>
        </Box>
      </Container>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle textAlign='center'>
          Upload Files
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UploadFile onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HomeScreen;