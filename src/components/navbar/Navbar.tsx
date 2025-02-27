import React, { useState, useEffect } from "react";
import {
  TextField,
  IconButton,
  Drawer,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Chip,
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";
import SidePanel from "../sidepanel/SidePanel";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { RootState } from "../../redux/store/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchCourseById, searchCourses } from "../../services/userCoursesService";
import { debounce } from "lodash";
import { showAlert } from "../../redux/slices/alertSlice";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 310; // Sidebar width

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state?.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // interface SearchResult {
  //   searchResult : [{
  //     category: string;
  //     description: string;
  //     difficulty: number;
  //     createdAt: string;
  //     updatedAt: string;
  //     duration: number;
  //     id: number;
  //     publicStatus: true;
  //     title: string;
  //     userId: string;
  //   }]
  
  // }

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setShowDropdown(false);
    setSearchQuery("");
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!document.getElementById("search-container")?.contains(event.target as Node)) {
        setShowDropdown(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value.length >= 3) {
      debouncedSearch(value);
    } else {
      setShowDropdown(false);
      
    }
  };

  const fetchSearchResults = async (query: string) => {
    // if (query.length < 2 || !query.trim().includes(" ")) return;
    setLoading(true);
    try {
      const response = await searchCourses(query);
      setSearchResults(response);
      setShowDropdown(true);
    } catch {
       dispatch(showAlert({ message: "Error searching courses", severity: "error" }));
      console.error("Error fetching search results");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(fetchSearchResults, 500);

  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await searchCourses(searchQuery);
  //     console.log("Search Results", response);
  //     setSearchResults(response);
  //   } catch (err) {
  //     setError("Error fetching search results");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleItemClick = async (item: any) => {
    setSelectedItem(item);
    const courseData = await fetchCourseById(item.id);
    console.log("Course Data", courseData);
    if (courseData) {
      navigate(`/view-course-detail`, { state: { course: courseData } });
    }
    else{
      dispatch(showAlert({ message: "Error fetching course details", severity: "error" }));
    }
    // navigate(`/search/course/${item.id}`, { state: { item } }); 
    // setDialogOpen(true);
  };

//   const convertToIST = (dateString : Date) => {
//     const date = new Date(dateString);

//     // Convert to IST (UTC+5:30)
//     const options: Intl.DateTimeFormatOptions = {
//         timeZone: "Asia/Kolkata",
//         day: "2-digit",
//         month: "2-digit",
//         year: "2-digit"
//     };

//     return new Intl.DateTimeFormat("en-GB", options).format(date);
// };

const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar (Persistent Drawer - Always Open) */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ height: "100%", overflow: "hidden" }}>
          <SidePanel isOpen={true} />
          <Divider />
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, marginLeft: `${drawerWidth}px` }}
      >
        {/* Fixed Navbar */}
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#fff",
            boxShadow: "none",
            borderBottom: "1px solid #ddd",
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mx: "14px",
              minHeight: "82px !important",
            }}
          >
            {/* Search Bar */}
            <Box sx={{ position: "relative" }}>
              <TextField
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                placeholder="Search..."
                sx={{ bgcolor: "white", borderRadius: "4px" }}
              />
              <IconButton
                onClick={showDropdown ? handleCloseDropdown : undefined}
                className="search-field"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showDropdown ? <CloseIcon /> : <SearchIcon />}
              </IconButton>

              {showDropdown && (
                <List
                  sx={{
                    position: "absolute",
                    top: "110%",
                    left: 0,
                    bgcolor: "white",
                    boxShadow: 3,
                    borderRadius: "4px",
                    zIndex: 10,
                  }}
                >
                  {searchResults.map((result : any, index : any) => (
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{ overflow: "auto" }}
                    >
                      <ListItemButton onClick={() => handleItemClick(result)}>
                        <ListItemText
                          sx={{ color: "black" }}
                          primary={result.title}
                          secondary={truncateText(result.description, 16)}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
              {
                showDropdown && !searchResults.length && (
                  <Typography color="error" position="absolute" className="error">No results found</Typography>
                )
              }

              {/* Error Message */}
              {error && <Typography color="error">{error}</Typography>}
            </Box>

            {/* Right Section */}
            <Box display="flex" alignItems="center" gap={2}>
              <Divider orientation="vertical" flexItem />

              {/* Notification Icon */}
              <IconButton>
                <NotificationsIcon sx={{ color: "#333" }} />
              </IconButton>

              {/* Vertical Divider */}
              <Divider orientation="vertical" flexItem />

              {/* Profile Section */}
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  src="https://source.unsplash.com/50x50/?man,portrait"
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Chip
                    label="INDIVIDUAL"
                    size="small"
                    sx={{
                      bgcolor: "#F6D365",
                      color: "#333",
                      fontWeight: "bold",
                      height: "20px",
                      fontSize: "0.7rem",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography variant="body1" fontWeight="bold" color="black">
                    <Link to="/user-profile">
                      {user.firstName} {user.lastName}
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        {/* <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{selectedItem?.title}</DialogTitle>
          <DialogContent>
            <Typography>Description : {selectedItem?.description}</Typography>
            <Typography>Category : {selectedItem?.category}</Typography>
            <Typography>Difficulty : {getDifficultyLabel(selectedItem?.difficulty)}</Typography>
            <Typography>Duration : {selectedItem?.duration} minutes</Typography>
            <Typography> {selectedItem ? `${"Created At"} : ${convertToIST(selectedItem?.createdAt)}` : ""}</Typography>
            <Typography>{selectedItem ? `${"Updated At"} : ${convertToIST(selectedItem?.updatedAt)}` : ""}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog> */}
      </Box>
    </Box>
  );
};

export default Navbar;
