"use client";
import { useState } from "react";
import { Blog } from "@/lib/interfaces";
import {
	useCreateNewBlogMutation,
	useGetCategoriesQuery,
} from "@/lib/services/blogs";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { useRedux } from "@/lib/hooks/useRedux";

const NewBlog = () => {
	const router = useRouter();
	const { useAppDispatch, useAppSelector } = useRedux();
	const user = useAppSelector((state: RootState) => state.user);

	const [createBlog, {}] = useCreateNewBlogMutation();
	const { data: categories, isLoading: isLoadingCategory } =
		useGetCategoriesQuery({
			skip: user.access_token === null,
		});

	const [blogPost, setBlogPost] = useState({
		title: "",
		description: "",
		category: "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setBlogPost((prevPost) => ({
			...prevPost,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		let payload = new FormData(form);

		const res = await createBlog(payload);

		if (!("error" in res)) {
			router.push("/");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-extrabold text-gray-900">
					Create New Blog
				</h1>
				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium text-gray-700"
							>
								Title
							</label>
							<input
								type="text"
								name="title"
								id="title"
								required
								value={blogPost.title}
								onChange={handleChange}
								className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700"
							>
								Description
							</label>
							<textarea
								name="description"
								id="description"
								required
								value={blogPost.description}
								onChange={handleChange}
								className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
						<div>
							<label
								htmlFor="category"
								className="block text-sm font-medium text-gray-700"
							>
								Category
							</label>
							{isLoadingCategory ? (
								"loading categories..."
							) : (
								<select
									name="category_id"
									id="category"
									required
									value={blogPost.category}
									onChange={handleChange}
									className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									{categories.results.map((category: any) => (
										<option
											key={category.id}
											value={category.id}
										>
											{category.title}
										</option>
									))}
								</select>
							)}
						</div>
						<div>
							<label
								htmlFor="bannerImage"
								className="block text-sm font-medium text-gray-700"
							>
								Banner Image
							</label>
							<input
								type="file"
								name="banner"
								id="bannerImage"
								required
								className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Create Blog
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewBlog;
