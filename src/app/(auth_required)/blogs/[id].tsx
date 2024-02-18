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
import { useModal } from "@/lib/hooks/useModal";
import { useRedux } from "@/lib/hooks/useRedux";
import { useLogInMutation } from "@/lib/services/auth";
import { setUserData } from "@/lib/slices/userSlice";
import { RootState } from "@/lib/store";
import { useState } from "react";

const Home = () => {
	const {
		isOpen: isPostModalOpen,
		handleOpen: handleOpenPostModal,
		handleClose: handleClosePostModal,
	} = useModal();
	const { useAppDispatch, useAppSelector } = useRedux();
	const user = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	const [logIn, { data, error, isLoading }] = useLogInMutation();
	const handlePostSubmit = (title: string, content: string) => {
		// Implement logic to submit the new post

		logIn({
			username: "tahnoon",
			password: "1234",
		});
	};

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="text-center">
					<h1 className="text-3xl font-extrabold text-gray-900">
						Welcome to My Blog
					</h1>
					<span>user is {user.username}</span> <br />
					<span>data is {user.access_token}</span>
					<p className="mt-4 text-lg text-gray-600">
						Check out the latest posts below:
					</p>
				</div>

				<div className="max-w-md w-full">
					<h1 className="text-3xl font-extrabold text-gray-900">
						Create New Post
					</h1>
					<button
						onClick={handleOpenPostModal}
						className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Open Modal
					</button>
					<NewPostModal
						isOpen={isPostModalOpen}
						onClose={handleClosePostModal}
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
