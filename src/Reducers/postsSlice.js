import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  isLoading: false,
 
 
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",

  async ({page, pageSize}, { rejectWithValue }) => {
    try {
      console.log("Fetching posts...");
      const response = await fetch(`http://localhost:5050/posts?page=${page}&pageSize=${pageSize}`);
      return await response.json()
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        console.log("getPosts.fulfilled - payload:", action.payload);
        state.isLoading = false;
        state.posts = action.payload;
      })

      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Impossibile ricevere il post";
      });
  },
});

export const postResponse = (state) => state.postsState.response;
export const postsLoading = (state) => state.postsState.isLoading;
export const postsArray = (state) => state.postsState.posts;

export default postsSlice.reducer;