import { createSlice } from "@reduxjs/toolkit";

export const userProfileSlice = createSlice({
	name: "userProfile",
	initialState: {
		name: "",
		image: "/broken-image.jpg",
		id: "",
	},
	devTools: true,
	reducers: {
		addUserProfile: (state, action) => {
			state.name = action.payload.display_name;
			state.image = action.payload.images[0].url;
			state.id = action.payload.id;
		},
	},
});

export const { addUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
