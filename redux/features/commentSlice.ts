import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = <any>[];

const commentSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {

	},
});

// Correctly export the actions
export const { } = commentSlice.actions;
export default commentSlice.reducer;
