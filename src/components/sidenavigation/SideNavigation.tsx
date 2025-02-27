import React from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../assets/logo.png";
// import userImg from "../../assets/images/avatar.png";

const drawerWidth = 240;

interface SideNavigationProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ isDrawerOpen, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={isDrawerOpen}
        sx={{
          width: isDrawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? drawerWidth : 0,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Box className="sidebar-header">
          <img src={logo} alt="Logo" width="180px" />
        </Box>
        <Divider />
        <Box className="menu">
          <Box className="menu-item">
            <Link to="/home">
              <HomeOutlinedIcon />
              Home
            </Link>
          </Box>
          <Box className="menu-item">
            <Link to="/user-profile">
              <AccountCircleOutlinedIcon />
              My Profile
            </Link>
          </Box>
          <Box className="menu-item">
            <Link to="/create-course">
              <NoteAddOutlinedIcon />
              Create Course
            </Link>
          </Box>
          <Box className="menu-item">
            <Link to="/my-courses">
              <DescriptionOutlinedIcon />
              My Courses
            </Link>
          </Box>
          <Box className="menu-item">
            <Link to="/my-courses">
              <DescriptionOutlinedIcon />
              Logout
            </Link>
          </Box>
        </Box>
      </Drawer>

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
            flexGrow: 1,
            padding: 3,
            transition: "margin-left 0.3s ease-out",
            marginLeft: isDrawerOpen ? `${drawerWidth}px` : "0px",
            width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`,
          }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", mx: "14px", minHeight: "82px" }}>
          {/* Sidebar Toggle Button */}
          <IconButton onClick={toggleDrawer} edge="start">
            <MenuIcon />
          </IconButton>

          {/* Notification Icon */}
          <IconButton>
            <NotificationsIcon sx={{ color: "#333" }} />
          </IconButton>

          {/* User Profile */}
          <Button onClick={handleMenuClick}>
            {/* <Avatar src={userImg} sx={{ width: 40, height: 40 }} /> */}
            <Typography variant="body1" fontWeight="bold" color="black">
              John Doe
            </Typography>
            <ExpandMoreOutlinedIcon />
          </Button>

          {/* Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

    </Box>
  );
};

export default SideNavigation;
