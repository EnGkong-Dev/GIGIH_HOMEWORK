import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
	name: "token",
	initialState: {
		value: "",
	},
	devTools: true,
	reducers: {
		login: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { login } = tokenSlice.actions;

export default tokenSlice.reducer;
