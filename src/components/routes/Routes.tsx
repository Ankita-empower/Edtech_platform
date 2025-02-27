import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import ResetPassword from "../forgotPassword/ResetPassword";
import HomeScreen from "../home/HomeScreen";
import BrowseCourse from "../browseCourse/BrowseCourse";
import CreateCourse from "../createCourse/CreateCourse";
import UploadFile from "../uploadFile/UploadFile";
import UserProfile from "../userProfile/UserProfile";
import CourseOverview from "../createCourse/CourseOverview";
import VerifyOtp from "../forgotPassword/VerifyOtp";
import UserCourses from "../viewCourses/UserCourses";
import CourseDetails from "../createCourse/CourseDetails";
import ViewLesson from "../viewCourses/ViewLesson";
import CreateLesson from "../createCourse/CreateLesson";
import ViewCourse from "../viewCourses/ViewCourse";
import Alert from "../alert/Alert";
import SearchResultPage from "../searchResult/SearchResultPage";
import NotFoundPage from "../pageNotFound/NotFoundPage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  return isAuthenticated && token ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-pwd" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Protected Routes */}
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/browse-course" element={<BrowseCourse />} />
        <Route path="/create-lessons" element={<CreateLesson />} />
        <Route path="/upload-file" element={<UploadFile />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/course-overview" element={<CourseOverview />} />
        <Route path="/my-courses" element={<UserCourses />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/lesson-details" element={<ViewLesson />} />
        <Route path="/view-course-detail" element={<ViewCourse />} />
        <Route path="/search/course/:id" element={<SearchResultPage />} />

        {/* <Route path="/create-course" element={<ProtectedRoute><CreateCourse /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
        <Route path="/browse-course" element={<ProtectedRoute><BrowseCourse /></ProtectedRoute>} />
        <Route path="/create-lessons" element={<ProtectedRoute><CreateLesson /></ProtectedRoute>} />
        <Route path="/upload-file" element={<ProtectedRoute><UploadFile /></ProtectedRoute>} />
        <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/course-overview" element={<ProtectedRoute><CourseOverview /></ProtectedRoute>} />
        <Route path="/my-courses" element={<ProtectedRoute><UserCourses /></ProtectedRoute>} />
        <Route path="/course/:courseId" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/course-details" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/lesson-details" element={<ProtectedRoute><ViewLesson /></ProtectedRoute>} />
        <Route path="/view-course-detail" element={<ProtectedRoute><ViewCourse /></ProtectedRoute>} />
        <Route path="/search/course/:id" element={<ProtectedRoute><SearchResultPage /></ProtectedRoute>} /> */}
        
        {/* Catch-all Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Alert />
    </>
  );
};

export default AppRoutes;