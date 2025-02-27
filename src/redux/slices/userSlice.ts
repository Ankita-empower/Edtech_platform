import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  email: string;
  firstName: string;
  lastName: string;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: UserState = {
  userId: null,
  email: "",
  firstName: "",
  lastName: "",
  loading: false,
  error: null,
};

// Redux Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },

    clearUserData: (state) => {
      state.userId = null;
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.loading = false;
      state.error = null;
    },
  },
});

// Export Actions & Reducer
export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
