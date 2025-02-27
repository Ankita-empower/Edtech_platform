import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen text-center"
    >
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <Typography variant="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Oops! The page you are looking for does not exist.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>Go Home</Button>
      </Container>
    </motion.div>
  );
};

export default NotFoundPage;
