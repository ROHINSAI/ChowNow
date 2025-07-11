import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialStateAuth = {
  userInfo: null,
};

// Async thunk for auto-login (if needed in the future)
export const autoLogin = createAsyncThunk(
  "auth/fetchUser",
  async () => {
    const res = await fetch(
      "http://localhost:3000/api/users/autoLogin",
      {
        method: "GET",
        credentials: "include", // send cookies
      }
    );
    const data = await res.json();
    if (
      data.message == "No Token" ||
      data.message == "User Not Found"
    ) {
      return null;
    }
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: initialStateAuth,

  reducers: {
    setCredentials(state, action) {
      state.userInfo = action.payload;
    },

    logout(state) {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(autoLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(autoLogin.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
