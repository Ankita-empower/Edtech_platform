import apiClient from "../api/axiosSetup"; 

// Define the interface for the course creation payload
export interface CreateCoursePayload {
  title: string;
  description: string;
  category: string;
  // tags?: string;
  duration: number;
  publicStatus: boolean;
  difficulty: number; // Enum (0 = Beginner, 1 = Moderate, 2 = Advanced)
  userId: string | null;
  lessons?: Array<{
    title: string;
    body: string;
  }>;
}

// export interface CreateCourseResponse {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   tags: string;
//   duration: number;
//   publicStatus: boolean;
//   difficulty: number;
//   createdAt: string;
//   updatedAt: string;
//   userId: string;
//   lessons: Array<{
//     id: number;
//     title: string;
//     body: string;
//     courseId: number;
//     lesson_Media: Array<{
//       id: number;
//       type: string;
//       url: string;
//       lessonId: number;
//     }>;
//   }>;
// }

export interface CreateCourseResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string;
  duration: number;
  publicStatus: boolean;
  difficulty: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  lessons: Array<{
    id: number;
    title: string;
    body: string;
    courseId: number; // ✅ Ensure this is a `number`
  }>;
}

interface UploadResponse {
  url: string;
  data: {
    url: string;
  };
}


export const createCourse = async (data: CreateCoursePayload): Promise<CreateCourseResponse> => {
  try {
    const response = await apiClient.post<CreateCourseResponse>("/Course", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error creating course");
  }
};

export const uploadLessonMedia = async (data: FormData): Promise<UploadResponse> => {
  try {
 
    const response =  await apiClient.post(`/Lesson_Media/upload`, data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
     
      return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error uploading lesson media");
  }
}


export const createLesson = async (data : any): Promise<any> => {
  try {
    const response = await apiClient.post<CreateCourseResponse>("/Lesson", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error creating lesson");
  }
}


export const getUserCourses = async (): Promise<CreateCourseResponse[]> => {
  try {
    const response = await apiClient.get<CreateCourseResponse[]>("/Course/user");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching courses");
  }
};


export const deleteCourse = async (courseId: number): Promise<void> => {
  try {
    await apiClient.delete(`/Course/${courseId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error deleting course");
  }
};

// ✅ Update Course API
export const updateCourse = async (courseId: number, data: Partial<CreateCoursePayload>): Promise<CreateCourseResponse> => {
  try {
    const response = await apiClient.put<CreateCourseResponse>(`/Course/${courseId}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating course");
  }
};
