import { createSlice } from "@reduxjs/toolkit";

export const userProfileSlice = createSlice({
	name: "userProfile",
	initialState: {
		name: "",
		image: "/broken-image.jpg",
		id: "",
	},
	reducers: {
		addUserProfile: (state, action) => {
			state.name = action.payload.display_name;
			state.image = action.payload.images[0].url;
			state.id = action.payload.id;
		},
		logOutUserProfile: state => {
			state.name = "";
			state.image = "/broken-image.jpg";
			state.id = "";
		},
	},
});

export const { addUserProfile, logOutUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
