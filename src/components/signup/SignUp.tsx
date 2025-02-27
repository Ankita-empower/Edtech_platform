import React, { useState } from "react";
import * as yup from "yup";
import "./SignUp.css";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import logoImage from "../../assets/logo.png";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import { signUpUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/slices/alertSlice";
import { VisibilityOffSharp, VisibilitySharp } from "@mui/icons-material";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  [key: string]: string;
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/(?=.*[a-z])/, "Must include at least one lowercase letter")
    .matches(/(?=.*[A-Z])/, "Must include at least one uppercase letter")
    .matches(/(?=.*\d)/, "Must include at least one number")
    .matches(/(?=.*[@$!%*?&#])/, "Must include at least one special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords do not match")
    .required("Confirm Password is required"),
});

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showPasswords, setShowPasswords] = useState<{ password: boolean; confirmPassword: boolean }>({
    password: false,
    confirmPassword: false,
  });

  const dispatch = useDispatch(); // Initialize dispatch for Redux

  const validate = async (): Promise<boolean> => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const newErrors: Errors = {};
      err.inner.forEach((validationError: yup.ValidationError) => {
        if (validationError.path) {
          newErrors[validationError.path] = validationError.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const isValid = await validate();

    if (isValid) {
      setLoading(true);
      const apiData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      try {
        const response = await signUpUser(apiData);
        dispatch(
          showAlert({
            message: "Sign-up successful! Please login now.",
            severity: "success",
          })
        );
        navigate("/login");
      } catch (error: any) {
        dispatch(
          showAlert({
            message: error.message || "Sign-up failed",
            severity: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Grid container className="signup-page">
      <Grid size={{ xs: 12, md: 6 }} className="login-left">
        <Box>
          <img src={logoImage} alt="Learnova Logo" className="login-logo" />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexGrow={1}
          justifyContent="center"
        >
          <Box position="relative" className="img-wrapper">
            <Box className="img-box" sx={{ top: "0", left: "0" }}>
              <PhotoOutlinedIcon sx={{ fontSize: "100px", color: "#F06543" }} />
            </Box>
            <Box className="img-box" sx={{ bottom: "0", right: "0" }}>
              <PhotoOutlinedIcon sx={{ fontSize: "100px", color: "#F06543" }} />
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} sx={{ overflow: "auto", height: "100%" }}>
        <Box className="signup-right">
          <Box className="signup-card">
            <Typography variant="h5" component="h5">
              Welcome to Edtech!
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Tell us about yourself:
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              {/* First Name Field */}
              <Box className="form-group">
                <Typography mb={1}>First Name</Typography>
                <TextField
                  className={errors.firstName ? "error" : ""}
                  id="outlined-size-normal"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  fullWidth
                />
                {errors.firstName && (
                  <Box component="span" className="error-message">
                    {errors.firstName}
                  </Box>
                )}
              </Box>

              {/* Last Name Field */}
              <Box className="form-group">
                <Typography mb={1}>Last Name</Typography>
                <TextField
                  className={errors.lastName ? "error" : ""}
                  id="outlined-size-normal"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  fullWidth
                />
                {errors.lastName && (
                  <Box component="span" className="error-message">
                    {errors.lastName}
                  </Box>
                )}
              </Box>

              {/* Email Address Field */}
              <Box className="form-group">
                <Typography mb={1}>Email Address</Typography>
                <TextField
                  className={errors.email ? "error" : ""}
                  id="outlined-size-normal"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  fullWidth
                />
                {errors.email && (
                  <Box component="span" className="error-message">
                    {errors.email}
                  </Box>
                )}
              </Box>

              {/* Password Field */}
              <Box className="form-group">
                <Typography mb={1}>Password</Typography>
                <TextField
                  className={errors.password ? "error" : ""}
                  id="outlined-size-normal"
                  name="password"
                  type={showPasswords.password ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility("password")} edge="end">
                          {showPasswords.password ? <VisibilitySharp /> : <VisibilityOffSharp />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && (
                  <Box component="span" className="error-message">
                    {errors.password}
                  </Box>
                )}
              </Box>

              {/* Confirm Password Field */}
              <Box className="form-group">
                <Typography mb={1}>Confirm Password</Typography>
                <TextField
                  className={errors.confirmPassword ? "error" : ""}
                  id="outlined-size-normal"
                  name="confirmPassword"
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility("confirmPassword")} edge="end">
                          {showPasswords.confirmPassword ? <VisibilitySharp /> : <VisibilityOffSharp />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.confirmPassword && (
                  <Box component="span" className="error-message">
                    {errors.confirmPassword}
                  </Box>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ borderRadius: "16px", height: "58px" }}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            </Box>

            {/* Social Login Buttons */}
            <Box className="social-login" gap={2}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: "#717171",
                  height: "48px",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <GoogleIcon sx={{ width: "18px", color: "#313638" }} />
                <Typography
                  component="span"
                  sx={{ color: "#313638", fontSize: "14px" }}
                >
                  Sign up with Google
                </Typography>
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ color: "#717171", height: "48px" }}
              >
                <AppleIcon sx={{ color: "#313638" }} />
                <Typography
                  component="span"
                  sx={{ color: "#313638", fontSize: "14px" }}
                >
                  Sign up with Apple
                </Typography>
              </Button>
            </Box>

            {/* Sign up / Login Link */}
            <Box display="flex" justifyContent="center" className="signup-link">
              <Typography> Already have an account?</Typography>
              <Typography
                component="a"
                marginLeft={0.5}
                color="#ff6b4a"
                href="/login"
              >
                Login
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
