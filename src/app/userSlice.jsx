import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
};

export const registerUserAsync = createAsyncThunk(
  "user/registerUserAsync",
  async ({ firstName, lastName, email, password }) => {
    try {
      const response = await axios.post(
        `https://employee-management-system-backend-fwko.onrender.com/create-user`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUserAsync",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        `https://employee-management-system-backend-fwko.onrender.com/sign-in`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const logoutUser = () => (dispatch) => {
  dispatch(userLoggedOut());
};

const userLoggedOut = () => ({
  type: 'user/logoutUser',
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut(state, action) {
      state.currentUser = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        console.error("Registration failed:", action.error.message);
        alert("Registration failed. Please try again.");
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        console.error("Login failed:", action.error.message);
        alert("Login failed. Please try again.");
      });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
