// Need to use the React-specific entry point to import createApi
import { baseApi } from "./baseApi";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const blogApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => {
				return {
					url: "categories/",
					method: "GET",
				};
			},
			providesTags: ["Category"],
		}),

		getBlogs: builder.query({
			query: () => {
				return {
					url: "blogs/",
					method: "GET",
				};
			},
			providesTags: ["Blogs"],
		}),

		getBlogById: builder.query({
			query: (id: number) => ({
				url: `blogs/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, arg) =>
				result
					? [{ type: "Blogs", id: result.id }, "Blogs"]
					: ["Blogs"],
		}),

		getPostsByBlogId: builder.query({
			query: (id: number) => {
				return {
					url: `blogs/${id}/posts/`,
					method: "GET",
				};
			},
			providesTags: (result, error, arg) =>
				result
					? [{ type: "BlogPosts", id: arg }, "Blogs", "BlogPosts"]
					: ["BlogPosts", "Blogs"],
		}),

		createNewBlog: builder.mutation({
			query: (payload: any) => ({
				url: "blogs/",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Blogs"],
		}),
	}),
	overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetCategoriesQuery,
	useGetBlogsQuery,
	useGetBlogByIdQuery,
	useGetPostsByBlogIdQuery,
	useCreateNewBlogMutation,
} = blogApi;
