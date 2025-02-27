import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initial } from "lodash";

interface LessonMedia {
  id: number;
  type: string;
  url: string;
  lessonId: number;
  lesson: string;
}

interface LessonData {
  id: number;
  title: string;
  body: string;
  courseId: number;
  // lessonMedia: LessonMedia[];
}

// interface CourseData {
//   category: string;
//   difficulty: number;
//   title: string;
//   duration: string;
//   gender: string;
//   style: string;
//   description: string;
//   flashcards: boolean;
//   lessons: LessonData[];
// }

interface CourseState {
  courseData: CourseData | null;
}

// const initialState: CourseState = {
//   courseData: {
//     category: '',
//     difficulty: 0,
//     title: '',
//     duration: '',
//     gender: '',
//     style: '',
//     description: '',
//     flashcards: false,
//     lessons: [],
//   },
// };

const initialState: CourseState = {
  courseData: {
  id: 0,
  title: '',
  description: '',
  duration: 0,
  publicStatus: true,
  difficulty: 0,
  createdAt: '',
  updatedAt:'',
  userId: '',
  lessons : [{
    id: 0,
    title: "",
    body: "",
    courseId: 0,
  }]
  },
};

interface CourseData {
  id: number;
  title: string;
  description: string;
  duration: number;
  publicStatus: boolean;
  difficulty: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  lessons: LessonData[];
}

// const courseSlice = createSlice({
//   name: 'createCourse',
//   initialState,
//   reducers: {
//     setCourseData: (state, action: PayloadAction<CourseData>) => {
//       state.courseData = action.payload;
//     },
//     addLessonToCourse: (state, action: PayloadAction<LessonData>) => {
//       if (state.courseData) {
//         state.courseData.lessons.push(action.payload);
//       }
//     },
//     removeLessonFromCourse: (state, action: PayloadAction<number>) => {
//       if (state.courseData) {
//         state.courseData.lessons = state.courseData.lessons.filter(
//           (lesson) => lesson.id !== action.payload
//         );
//       }
//     },
//     handleSaveLessons: (state, action: PayloadAction<LessonData[]>) => {
//       if (!state.courseData) return; // Ensure courseData exists
//       if (!Array.isArray(state.courseData.lessons)) {
//         state.courseData.lessons = []; // Initialize if undefined
//       }
//       state.courseData.lessons = [...state.courseData.lessons, ...action.payload];
//     },
//     resetCourseData: (state) => {
//       state.courseData = null;
//     },
//   },
// });

const courseSlice = createSlice({
  name: "createCourse",
  initialState,
  reducers: {
    setCourseData: (state, action: PayloadAction<CourseData>) => {
      state.courseData = action.payload;
    },
    addLessonToCourse: (state, action: PayloadAction<LessonData>) => {
      if (state.courseData) {
        state.courseData.lessons.push(action.payload);
      }
    },
    removeLessonFromCourse: (state, action: PayloadAction<number>) => {
      if (state.courseData) {
        state.courseData.lessons = state.courseData.lessons.filter(
          (lesson) => lesson.id !== action.payload
        );
      }
    },
    handleSaveLessons: (state, action: PayloadAction<LessonData[]>) => {
      if (!state.courseData) return; // Ensure courseData exists
      if (!Array.isArray(state.courseData.lessons)) {
        state.courseData.lessons = []; // Initialize if undefined
      }
      state.courseData.lessons = [
        ...state.courseData.lessons,
        ...action.payload,
      ];
    },
    resetCourseData: (state) => {
      state.courseData = null;
    },
  },
});
export const {
  setCourseData,
  addLessonToCourse,
  removeLessonFromCourse,
  handleSaveLessons,
  resetCourseData,
} = courseSlice.actions;
export default courseSlice.reducer;
