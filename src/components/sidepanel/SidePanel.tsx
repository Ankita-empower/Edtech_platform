import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate hook
import "./SidePanel.css"; // Ensure you have the CSS file for styles
import logoImage from "../../assets/logo.png";
import createcourseIcon from "../../assets/icons/create-course.png";
import browsecourceIcon from "../../assets/icons/browse-course.png";
import homeIcon from "../../assets/icons/home.png";
import logoutIcon from "../../assets/icons/logout.png";
import { Box, IconButton } from "@mui/material";
import { logoutUser } from "../../services/authService"; 
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/slices/alertSlice";
import { clearUserData } from "../../redux/slices/userSlice";

interface SidePanelProps {
  isOpen: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      dispatch(clearUserData())
    } catch (error: any) {
      dispatch(
        showAlert({
          message: error.message || "Login failed",
          severity: "error",
        })
      );
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <Box className={`side-panel ${isOpen ? "open" : "closed"}`}>
        <Box className="menu h-100">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={3}
          >
            <img src={logoImage} alt="logo" width="178px" />
          </Box>

          <Box display="flex" flexDirection="column" gap={3} flex={1}>
            <Box className="menu-item">
              <Link to="/home">
                <img src={homeIcon} alt="home" />
                Home
              </Link>
            </Box>

            {/* <Box className="menu-item">
            <Link to="/login">
              Login
            </Link>
          </Box>

          <Box className="menu-item">
            <Link to="/signup">
              SignUp
            </Link>
          </Box> */}

           

            <Box className="menu-item">
              <Link to="/create-course">
                <img src={createcourseIcon} alt="create-course" />
                Create Course
              </Link>
            </Box>

             <Box className="menu-item">
            <Link to="/my-courses">
              <img src={browsecourceIcon} alt="browse-courses" />
              My Courses
            </Link>
          </Box>

            {/* <Box className="menu-item">
            <Link to="/forget-pwd">
              Forgot Password
            </Link>
          </Box> */}
          </Box>

          <Box className="menu-item" my={3}>
            <IconButton onClick={handleLogout} sx={{ padding: 0 }}>
              <img src={logoutIcon} alt="logout" />
              Log Out
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidePanel;
