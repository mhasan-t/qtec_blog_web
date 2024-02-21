import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/lib/slices/userSlice";
import appReducer from "@/lib/slices/appSlice";
import { authApi } from "@/lib/services/auth";
import { blogApi } from "./services/blogs";
import { apiErrorHandler, jwtTokenRefresher } from "./middlewares";
import { postApi } from "./services/posts";
import { baseApi } from "./services/baseApi";

export const makeStore = () => {
	return configureStore({
		reducer: {
			app: appReducer,

			user: userReducer,
			[authApi.reducerPath]: authApi.reducer,
			[baseApi.reducerPath]: baseApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat([
				authApi.middleware,
				baseApi.middleware,
				jwtTokenRefresher,
				apiErrorHandler,
			]),
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
