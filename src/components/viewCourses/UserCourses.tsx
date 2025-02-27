import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { getUserCourses } from "../../services/userCoursesService";
import Loader from "../loader/Loading";
import laravelImg from '../../assets/icons/laravel.png';
import avtarImg from '../../assets/icons/avatar.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PaidIcon from '@mui/icons-material/Paid';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Define Types
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

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: number;
  difficulty: number;
  lessons: Lesson[];
}

const difficultyLabels: Record<number, string> = {
  0: "Beginner",
  1: "Moderate",
  2: "Advanced",
};

const UserCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userCourses = await getUserCourses();
        setCourses(userCourses);
      } catch (err) {
        setError("Error fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course: Course) => {
    navigate("/view-course-detail", { state: { course } });
  };

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <Box className="user-course background-graphics">
      <Box className="main-wrapper">
        <Box className="content-wrapper">
          <Typography variant="h5" fontWeight="bold" paddingBottom={2}>
            My Courses
          </Typography>

          {loading && <Loader message="Loading Courses..." />}
          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={3}>
            {courses.length > 0 ? (
              courses.map((course) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={course.id}>
                  <Card
                    sx={{
                      bgcolor: "white",
                      borderRadius: "12px",
                      cursor: "pointer",
                      padding: "20px",
                      "&:hover": { boxShadow: 4 },
                    }}
                    onClick={() => handleCourseClick(course)}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <Box className="first" display="flex" alignItems="center" justifyContent="space-between">
                          <Box><img src={laravelImg} alt="Laravel" /></Box>
                          <Box display="flex" gap={1} alignItems="center">
                            <Typography
                              className="gradient-chip"
                              variant="caption"
                            >
                              PREF243D
                            </Typography>
                            <Typography
                              className="active-chip"
                              variant="caption"
                            >
                              PREF243D
                            </Typography>
                            <Box><MoreVertIcon/></Box>
                          </Box>
                        </Box>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {course.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {truncateText(course.description, 50)}
                          </Typography>
                        </Box>
                        {/* Tags */}
                        <Box className="action">
                          <Box><VisibilityIcon /></Box>
                          <Box className="percent-details"><ArrowOutwardIcon />88%</Box>
                          <Box className="dollar-details"><PaidIcon />$15,302.00</Box>
                        </Box>
                      </Box>
                      <Box>
                        <AvatarGroup total={24} className="circle-ring">
                          <Avatar alt="Remy Sharp" src={avtarImg} />
                          <Avatar alt="Travis Howard" src={avtarImg} />
                          <Avatar alt="Agnes Walker" src={avtarImg} />
                          <Avatar alt="Trevor Henderson" src={avtarImg} />
                        </AvatarGroup>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              !loading && <Typography>No courses found.</Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCourses;
