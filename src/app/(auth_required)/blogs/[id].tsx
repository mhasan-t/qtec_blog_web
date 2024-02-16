"use client";

const posts = [
	{
		id: 1,
		title: "First Post",
		description: "This is the description of the first post.",
		creator: "John Doe",
	},
	{
		id: 2,
		title: "Second Post",
		description: "This is the description of the second post.",
		creator: "Jane Smith",
	},
	{
		id: 3,
		title: "Third Post",
		description: "This is the description of the third post.",
		creator: "Alex Johnson",
	},
];

import NewPostModal from "@/components/NewPostModal";
import PostItem from "@/components/PostItem";
import { useState } from "react";

const Home = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handlePostSubmit = (title: string, content: string) => {
		// Implement logic to submit the new post
		console.log("New Post:", { title, content });
	};

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="text-center">
					<h1 className="text-3xl font-extrabold text-gray-900">
						Welcome to My Blog
					</h1>
					<p className="mt-4 text-lg text-gray-600">
						Check out the latest posts below:
					</p>
				</div>

				<div className="max-w-md w-full">
					<h1 className="text-3xl font-extrabold text-gray-900">
						Create New Post
					</h1>
					<button
						onClick={handleOpenModal}
						className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Open Modal
					</button>
					<NewPostModal
						isOpen={isModalOpen}
						onClose={handleCloseModal}
						onSubmit={handlePostSubmit}
					/>
				</div>

				<div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<PostItem
							key={post.id}
							title={post.title}
							description={post.description}
							creator={post.creator}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
