import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5005/users";

interface User {
  id?: number;
  username: string;
  password: string;
}

interface AuthState {
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  status: "idle",
  error: null,
};



export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (newUser: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, newUser);
      return response.data;
    } catch (err) {
      return rejectWithValue("Sign-up failed");
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (credentials: User, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?username=${credentials.username}`);
      const user = response.data[0];

      if (user && user.password === credentials.password) {
        return user;
      } else {
        return rejectWithValue("Invalid username or password");
      }
    } catch {
      return rejectWithValue("Login failed");
    }
  }
);

// 🟦 Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Sign In
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
