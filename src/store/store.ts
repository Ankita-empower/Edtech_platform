import { configureStore } from '@reduxjs/toolkit';
import courseReducer from '../redux/slices/courseSlice'; 
import alertReducer from '../redux/slices/alertSlice';

const store = configureStore({
  reducer: {
    course: courseReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
