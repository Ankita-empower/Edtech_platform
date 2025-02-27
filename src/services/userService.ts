import apiClient from "../api/axiosSetup";

// interface UserState {
//   // Define the properties of UserState here
//   id: string;
//   name: string;
//   // Add other properties as needed
// }

interface UserProfile {
    // data: UserState;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
  }

export const fetchUserProfile = async (email: string): Promise<UserProfile> => {
  try {
    const response = await apiClient.post("/Auth/getProfile", null, {
      params: { email }, 
    });

    return response.data?.data; 
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch user profile");
  }
};
