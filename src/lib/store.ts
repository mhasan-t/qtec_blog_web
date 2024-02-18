import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/lib/slices/userSlice";
import appReducer from "@/lib/slices/appSlice";
import { authApi } from "@/lib/services/auth";
import { blogApi } from "./services/blogs";
import { jwtTokenRefresher } from "./middlewares";

export const makeStore = () => {
	return configureStore({
		reducer: {
			app: appReducer,

			user: userReducer,
			[authApi.reducerPath]: authApi.reducer,
			[blogApi.reducerPath]: blogApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat([
				authApi.middleware,
				blogApi.middleware,
				jwtTokenRefresher,
			]),
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
