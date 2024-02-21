import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.API_URL}`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).user.access_token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Blogs", "Posts", "BlogPosts", "Category"],
	endpoints: () => ({}),
});
