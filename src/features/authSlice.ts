import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = "http://localhost:5006/users";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  username: string;
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

// --- Sign Up ---
export const signUpUser = createAsyncThunk<User, User, { rejectValue: string }>(
  "auth/signUpUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(API_URL, newUser);
      return response.data;
    } catch {
      return rejectWithValue("Sign-up failed");
    }
  }
);

// --- Sign In ---
export const signInUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/signInUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.get<User[]>(`${API_URL}?email=${credentials.email}`);
    const user = response.data[0];

    if (user && user.password === credentials.password) {
      return user;
    } else {
      return rejectWithValue("Invalid email or password");
    }
  } catch {
    return rejectWithValue("Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.currentUser = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Sign-up failed";
      })
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
