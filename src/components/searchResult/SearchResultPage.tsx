import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchResultPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const item = location.state?.item;

  if (!item) {
    return <Typography>No course details available</Typography>;
  }

  return (
    <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" , marginTop: "135px"}}>
      <Paper elevation={3} sx={{ padding: "20px", maxWidth: "500px" }}>
        <Typography variant="h5" gutterBottom>{item.title}</Typography>
        <Typography variant="body1"><strong>Description:</strong> {item.description}</Typography>
        <Typography variant="body1"><strong>Category:</strong> {item.category}</Typography>
        <Typography variant="body1"><strong>Difficulty:</strong> {getDifficultyLabel(item.difficulty)}</Typography>
        <Typography variant="body1"><strong>Duration:</strong> {item.duration} mins</Typography>
        <Typography variant="body1"><strong>Public Status:</strong> {item.publicStatus ? "Public" : "Private"}</Typography>
        <Typography variant="body1"><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString("en-IN")}</Typography>
      </Paper>
    </Box>
  );
};

// Function to get difficulty label
const getDifficultyLabel = (difficulty: number) => {
  switch (difficulty) {
    case 0:
      return "Beginner";
    case 1:
      return "Intermediate";
    case 2:
      return "Advanced";
    default:
      return "Unknown";
  }
};

export default SearchResultPage;
