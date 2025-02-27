import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  message?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading...", size = 50 }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress size={size} />
      <Typography variant="h6" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
