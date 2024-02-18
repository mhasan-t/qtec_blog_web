// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken, setUserData } from "../slices/userSlice";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.API_URL}accounts/auth/`,
	}),
	tagTypes: ["Auth"],
	endpoints: (builder) => ({
		// login
		logIn: builder.mutation<TokenResponse, LoginRequest>({
			query: (payload) => ({
				url: "token/",
				method: "POST",
				body: payload,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				//   const refreshToken = localStorage.getItem("refresh");
				// 	if (refreshToken) {
				// 		const access = await getAccessTokenByRefreshToken(
				// 			refreshToken
				// 		);
				// 		console.log(access);
				// 	}
				// }

				const res = await queryFulfilled;
				dispatch(
					setUserData({
						username: args.username,
						access_token: res.data.access,
					})
				);
				localStorage.setItem("refresh", res.data.refresh);
			},
		}),

		// refresh token
		refreshToken: builder.mutation<
			Pick<TokenResponse, "access">,
			RefreshTokenRequest
		>({
			query: (payload) => ({
				url: "token/refresh/",
				method: "POST",
				body: payload,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				console.log("refreshing token");
				try {
					const res = await queryFulfilled;
					dispatch(setAccessToken(res.data.access));
					console.log(res);
				} catch {}
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLogInMutation, useRefreshTokenMutation } = authApi;
