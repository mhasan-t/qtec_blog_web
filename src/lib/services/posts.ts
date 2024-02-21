// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Blog } from "../interfaces";
import { baseApi } from "./baseApi";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const postApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createPostOnBlog: builder.mutation({
			query: (payload) => ({
				url: "posts/",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "BlogPosts", id: arg.blog_id },
			],
		}),
	}),
	overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreatePostOnBlogMutation } = postApi;
