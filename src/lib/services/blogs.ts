// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const blogApi = createApi({
	reducerPath: "blogsApi",
	tagTypes: ["Blogs"],
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.API_URL}blogs/`,
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = (getState() as RootState).user.access_token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),

	endpoints: (builder) => ({
		// get all blogs
		getBlogs: builder.query<any, any>({
			query: (payload) => ({
				url: "",
				method: "GET",
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
				const res = await queryFulfilled;
				console.log(res);
				console.log((getState() as RootState).user.access_token);
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogsQuery } = blogApi;
