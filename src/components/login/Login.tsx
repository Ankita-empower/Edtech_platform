import React, { useState, useEffect } from "react";
import * as yup from "yup";
import "./Login.css";
import { Box, Button, Checkbox, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import logoImage from "../../assets/logo.png";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import { loginUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/slices/alertSlice";
import { setUserLoggedIn } from "../../redux/slices/authSlice";
import { VisibilityOffSharp, VisibilitySharp } from "@mui/icons-material";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Errors {
  [key: string]: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: localStorage.getItem("rememberedEmail") || "",
    password: localStorage.getItem("rememberedPassword") || "",
    rememberMe: localStorage.getItem("rememberMe") === "true" ? true : false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (await validate()) {
      setLoading(true);
      try {
        const { email, password, rememberMe } = formData;
        localStorage.setItem("email", email);
        const response = await loginUser({ email, password });

        localStorage.setItem("token", response?.token);
        localStorage.setItem("userId", response?.userId);

        dispatch(setUserLoggedIn());
        dispatch(showAlert({ message: "Login successful!", severity: "success" }));

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
          localStorage.setItem("rememberMe", "false");
        }

        navigate("/home");
      } catch (error: any) {
        dispatch(showAlert({ message: error.message || "Login failed", severity: "error" }));
        setFormData({ email: "", password: "", rememberMe: false });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container className="login-page">
      <Grid size={{ xs: 12, md: 6 }} className="login-left">
        <Box>
          <img src={logoImage} alt="Learnova Logo" className="login-logo" />
        </Box>
        <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
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
        <Box className="login-right">
          <Box className="login-card">
            <Typography variant="h5" component="h5">
              Welcome back!
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Box className="form-group">
                <Typography mb={1}>Email Address</Typography>
                <TextField
                  className={errors.email ? "error" : ""}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  fullWidth
                />
                {errors.email && <Box component="span" className="error-message">{errors.email}</Box>}
              </Box>

              <Box className="form-group">
                <Typography mb={1}>Password</Typography>
                <TextField
                  className={errors.password ? "error" : ""}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilitySharp /> : <VisibilityOffSharp />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && <Box component="span" className="error-message">{errors.password}</Box>}
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box display="flex" gap={0.5} alignItems="center">
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <Typography>Remember me</Typography>
                </Box>
                <Box>
                  <Typography component={Link} to="/forget-pwd" color="#ff6b4a" className="forgot-password-link">
                    Forgot Password?
                  </Typography>
                </Box>
              </Box>

              <Button type="submit" variant="contained" size="large" fullWidth sx={{ borderRadius: "16px", height: "58px" }} disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </Box>

            <Box className="social-login" gap={2}>
              <Button variant="outlined" size="large" sx={{ color: "#717171", height: "48px", display: "flex", gap: "8px" }}>
                <GoogleIcon sx={{ width: "18px", color: "#313638" }} />
                <Typography component="span" sx={{ color: "#313638", fontSize: "14px" }}>Log in with Google</Typography>
              </Button>
              <Button variant="outlined" size="large" sx={{ color: "#717171", height: "48px" }}>
                <AppleIcon sx={{ color: "#313638" }} />
                <Typography component="span" sx={{ color: "#313638", fontSize: "14px" }}>Log in with Apple</Typography>
              </Button>
            </Box>

            <Box display="flex" justifyContent="center" className="signup-link">
              <Typography> No account yet?</Typography>
              <Typography component="a" marginLeft={0.5} color="#ff6b4a" href="/signup">
                Sign Up
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
