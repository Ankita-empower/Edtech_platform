import apiClient from "../api/axiosSetup"; // ✅ Use apiClient (Interceptor Enabled)

interface LoginPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface SignUpResponse {
  token: string;
  user: any;
}

interface LoginResponse {
  data: string;
  token: string;
  userId: string;
  user: any;
}

interface ForgotPasswordPayload {
  email: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

interface ApiResponse {
  message: string;
}


export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post("/Auth/login", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const signUpUser = async (data: SignUpPayload): Promise<SignUpResponse> => {

  try {
    const response = await apiClient.post("/Auth/register", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Sign-up failed");
  }
};


export const logoutUser = async (): Promise<void> => {
  try {
    const response = await apiClient.post("/Auth/logout", {});
    
    if (response.status === 200) {
      localStorage.removeItem("token");
      return;
    }

    throw new Error("Logout failed");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};


export const sendOtp = async (data: ForgotPasswordPayload): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post("/Auth/send-otp", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to send OTP");
  }
};


export const verifyOtp = async (data: VerifyOtpPayload): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post("/Auth/verify-otp", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
  }
};


export const resetPassword = async (data: ResetPasswordPayload): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post("/Auth/reset-password", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
};
