import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
	username: string | null;
	access_token: string | null;
}

const initialState: UserState = {
	username: null,
	access_token: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<UserState>) => {
			state.username = action.payload.username;
			state.access_token = action.payload.access_token;
		},
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.access_token = action.payload;
		},
		clearUserdata: (state) => {
			state = initialState;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUserData, clearUserdata, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
