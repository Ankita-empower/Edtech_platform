import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of your alert state
interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

const initialState: AlertState = {
  open: false,
  message: '',
  severity: 'success',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    // Show alert with message and severity
    showAlert: (state, action: PayloadAction<{ message: string, severity: 'success' | 'error' | 'info' | 'warning' }>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    // Hide alert
    hideAlert: (state) => {
      state.open = false;
      state.message = '';
      state.severity = 'success';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
