import { configureStore } from "@reduxjs/toolkit";
import TokenReducer from "./token-slice";
import UserProfileReducer from "./userProfile-slice";

export default configureStore({
	reducer: {
		token: TokenReducer,
		userProfile: UserProfileReducer,
	},
});
