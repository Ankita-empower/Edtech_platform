import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserCourses, Course } from "../../services/userCoursesService";

// ✅ Async Thunk to Fetch Courses
export const fetchUserCourses = createAsyncThunk(
  "userCourses/fetchUserCourses",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getUserCourses(userId);
      return response?.$values ?? []; // ✅ Ensure response is an array
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Define Initial State
interface UserCoursesState {
  courses: Course[]; // Ensure it's an array
  loading: boolean;
  error: string | null;
}

const initialState: UserCoursesState = {
  courses: [], // Ensure it's an array
  loading: false,
  error: null,
};

// ✅ Create Slice
const getUserCoursesSlice = createSlice({
  name: "userCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.courses = action.payload ?? []; // ✅ Ensure courses is always an array
      })
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.courses = []; // ✅ Reset courses on failure
      });
  },
});

// ✅ Export Reducer
export default getUserCoursesSlice.reducer;
