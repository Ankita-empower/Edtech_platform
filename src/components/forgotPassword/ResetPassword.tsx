import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
// import "./ResetPassword.css";
import logoImage from "../../assets/logo-black.png";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Za-z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPassword: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  const handleResetPassword = async (values: { newPassword: string }) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://4a44-103-15-66-85.ngrok-free.app/api/V1/Auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, newPassword: values.newPassword }),
        }
      );
      const data = await response.json();
      if (data.message === "Password reset successfully.") {
        alert("Password reset successfully. Please sign in.");
        navigate("/login");
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
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
          <Box className="reset-password-container">
            <Typography variant="h5" component="h5" gutterBottom>
              Reset Password
            </Typography>
            <Formik
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={handleResetPassword}
            >
              {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
                <Form>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.newPassword && Boolean(errors.newPassword)}
                      helperText={touched.newPassword && errors.newPassword}
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                  </Box>

                  {message && (
                    <Box mb={2}>
                      <Typography variant="body2" color="error.main">
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
                      {loading ? <CircularProgress size={24} /> : "Reset Password"}
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

export default ResetPassword;
