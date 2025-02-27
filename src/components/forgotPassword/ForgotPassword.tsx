import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import "./ForgotPassword.css";
import logoImage from "../../assets/logo-black.png";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSendOtp = async (email: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://4a44-103-15-66-85.ngrok-free.app/api/V1/Auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      setMessage(data.message);
      alert(data.message);
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box>
      <Container className="h-100" maxWidth="sm" sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Box>
          <Box textAlign='center'>
            <img src={logoImage} alt="Learnova Logo" className="login-logo"/>
          </Box>
          <Box className="forgot-password-container">
            <Typography variant="h5" component="h5" gutterBottom>
              Forgot Password
            </Typography>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={({ email }) => handleSendOtp(email)}
            >
              {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
                <Form>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Box>

                  {message && (
                    <Box mb={2}>
                      <Typography variant="body2" color="success.main">
                        {message}
                      </Typography>
                    </Box>
                  )}

                  <Box mb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading || isSubmitting}
                      fullWidth
                    >
                      {loading ? <CircularProgress size={24} /> : "Send OTP"}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;