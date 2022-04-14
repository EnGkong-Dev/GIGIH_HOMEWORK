import { configureStore } from "@reduxjs/toolkit";
import TokenReducer from "./token-slice";

export default configureStore({
	reducer: {
		token: TokenReducer,
	},
});
