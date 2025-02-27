import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; 
import courseReducer from "../slices/courseSlice";
import alertReducer from "../slices/alertSlice";
import getUserCoursesReducer from "../slices/getUserCoursesSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    alert: alertReducer,
    userCourses: getUserCoursesReducer,
    user: userReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
