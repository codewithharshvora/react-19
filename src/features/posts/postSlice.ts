import { createSlice } from "@reduxjs/toolkit";

interface PostState {
  list: any[];
}

const initialState: PostState = {
  list: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
