import { createSlice } from "@reduxjs/toolkit";

export const userProfileSlice = createSlice({
	name: "userProfile",
	initialState: {
		name: "",
		image:
			"https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png",
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
