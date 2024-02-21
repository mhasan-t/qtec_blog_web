// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken, setUserData } from "../slices/userSlice";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.API_URL}accounts/`,
	}),
	tagTypes: ["Auth"],
	endpoints: (builder) => ({
		// login
		logIn: builder.mutation<TokenResponse, LoginRequest>({
			query: (payload) => ({
				url: "auth/token/",
				method: "POST",
				body: payload,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;

					localStorage.setItem("refresh", res.data.refresh);
					let base64Url = res.data.access.split(".")[1];
					let base64 = base64Url.replace("-", "+").replace("_", "/");
					let payload = JSON.parse(atob(base64));

					dispatch(
						setUserData({
							user_id: payload.user_id,
							access_token: res.data.access,
						})
					);
				} catch {}
			},
		}),

		// register
		register: builder.mutation<any, RegisterRequest>({
			query: (payload) => ({
				url: "users/",
				method: "POST",
				body: payload,
			}),
		}),

		// refresh token
		refreshToken: builder.mutation<
			Pick<TokenResponse, "access">,
			RefreshTokenRequest
		>({
			query: (payload) => ({
				url: "auth/token/refresh/",
				method: "POST",
				body: payload,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;

					// get username from jwt token payload
					let base64Url = res.data.access.split(".")[1];
					let base64 = base64Url.replace("-", "+").replace("_", "/");
					let payload = JSON.parse(atob(base64));

					dispatch(
						setUserData({
							user_id: payload.user_id,
							access_token: res.data.access,
						})
					);
				} catch {}
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useLogInMutation,
	useRegisterMutation,
	useRefreshTokenMutation,
} = authApi;
