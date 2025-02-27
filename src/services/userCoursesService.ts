import axios from "axios";
import apiClient from "../api/axiosSetup";

interface LessonMedia {
  id: number;
  type: string;
  url: string;
  lessonId: number;
}

interface Lesson {
  id: number;
  title: string;
  body: string;
  lesson_Media: LessonMedia[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: number;
  difficulty: number;
  lessons: Lesson[];
}

// interface SearchResponse {
//   searchResult: [
//     {
//  category: string;
//   description: string;
//   difficulty: number;
//   createdAt: string;
//   updatedAt: string;
//   duration: number;
//   id: number;
//   publicStatus: true;
//   title: string;
//   userId: string;
//     }
//   ];
 
// }

export const getUserCourses = async (): Promise<Course[]> => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User ID not found.");

    const response = await apiClient.get<Course[]>(
      `/Course/getCoursesByUserId/${userId}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching courses");
  }
};

export const searchCourses = async (query: string): Promise<any> => {
  try {
    const response = await apiClient.get<any>(
      `/Course/search?query=${query}`
    );
    console.log("Search Results service", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error fetching search results"
    );
  }
};

export const fetchCourseById = async (courseId: number): Promise<any> => {
  try {
    const response = await apiClient.get<any>(`/Course/getCourseById/${courseId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching course");
    
  }
}

// export const getUserCourses = async (): Promise<Course[]> => {
//   try {
//     const userId = localStorage.getItem("userId");
//     if (!userId) throw new Error("User ID not found.");
//     const token = localStorage.getItem("token");

//     const response = await axios.get("https://8c08-103-15-66-85.ngrok-free.app/api/v1/Course/getCoursesByUserId/1afb32ac-7c96-438f-bf9f-21f64be4a057",{
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "ngrok-skip-browser-warning": "true"
//     }});
//     console.log("Response", response.data, "userId", userId);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Error fetching courses");
//   }
// };
