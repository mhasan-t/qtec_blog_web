"use client";
import { useState } from "react";
import { BlogPost } from "@/lib/interfaces";

const NewBlog = () => {
	const [blogPost, setBlogPost] = useState<BlogPost>({
		title: "",
		description: "",
		category: "",
		bannerImage: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setBlogPost((prevPost) => ({
			...prevPost,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Implement logic to submit the new blog post
	};

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-extrabold text-gray-900">
					Create New Blog Post
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
							<input
								type="text"
								name="category"
								id="category"
								required
								value={blogPost.category}
								onChange={handleChange}
								className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
						<div>
							<label
								htmlFor="bannerImage"
								className="block text-sm font-medium text-gray-700"
							>
								Banner Image URL
							</label>
							<input
								type="text"
								name="bannerImage"
								id="bannerImage"
								required
								value={blogPost.bannerImage}
								onChange={handleChange}
								className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Create Post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewBlog;
