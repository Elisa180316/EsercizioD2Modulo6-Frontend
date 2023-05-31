import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  isLoading: false,
  posts: [],
};

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",

  async (postData, { rejectWithValue }) => {
    try {
      console.log("Adding post...");
      const response = await fetch("http://localhost:5050/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error adding post:", error);
      return rejectWithValue(error);
    }
  }
);

const addNewpostsSlice = createSlice({
    name: "newPost",
    initialState, 
    extraReducers: (builder) => {
      builder
        .addCase(addNewPost.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          console.log("addNewPost.fulfilled - payload:", action.payload);
          state.isLoading = false;
          state.response = action.payload;
        })
        .addCase(addNewPost.rejected, (state) => {
          state.isLoading = false;
          state.error = "Failed to save the post";
        });
    },
  });

 
export const newPostResponse = (state) => state.postsState.response;
export const newPostsLoading = (state) => state.postsState.isLoading;
export const newPostsArray = (state) => state.postsState.posts;

export default addNewpostsSlice.reducer;
