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
// import "./VerifyOtp.css";
import logoImage from "../../assets/logo-black.png";

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .matches(/^[0-9]+$/, "OTP must be numeric")
    .required("OTP is required"),
});

const VerifyOtp: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerifyOtp = async (otp: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://4a44-103-15-66-85.ngrok-free.app/api/V1/Auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();
      if (data.message === "OTP verified successfully.") {
        alert("OTP verified successfully. Please reset your password.");
        navigate("/reset-password", { state: { email, otp } });
      } else {
        setMessage("Invalid or expired OTP.");
      }
    } catch (error) {
      setMessage("Failed to verify OTP. Please try again.");
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
          <Box className="verify-otp-container">
            <Typography variant="h5" component="h5" gutterBottom>
              Verify OTP
            </Typography>
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={validationSchema}
              onSubmit={({ otp }) => handleVerifyOtp(otp)}
            >
              {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
                <Form>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="OTP"
                      name="otp"
                      type="text"
                      value={values.otp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.otp && Boolean(errors.otp)}
                      helperText={touched.otp && errors.otp}
                      inputProps={{ maxLength: 6 }}
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
                      {loading ? <CircularProgress size={24} /> : "Verify OTP"}
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

export default VerifyOtp;
