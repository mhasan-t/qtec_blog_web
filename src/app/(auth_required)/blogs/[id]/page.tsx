"use client";

import NewPostModal from "@/components/NewPostModal";
import PostItem from "@/components/PostItem";
import { useModal } from "@/lib/hooks/useModal";
import { useRedux } from "@/lib/hooks/useRedux";
import { useLogInMutation } from "@/lib/services/auth";
import {
	useCreateNewBlogMutation,
	useGetBlogByIdQuery,
	useGetPostsByBlogIdQuery,
} from "@/lib/services/blogs";
import { useCreatePostOnBlogMutation } from "@/lib/services/posts";
import { setUserData } from "@/lib/slices/userSlice";
import { RootState } from "@/lib/store";
import { useState } from "react";

type PageProps = {
	params: {
		id: number;
	};
};

const Home = ({ params }: PageProps) => {
	const {
		isOpen: isPostModalOpen,
		handleOpen: handleOpenPostModal,
		handleClose: handleClosePostModal,
	} = useModal();
	const { useAppDispatch, useAppSelector } = useRedux();
	const user = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	const {
		data: blogData,
		isFetching: isFetchingBlog,
		isLoading: isLoadingBlog,
		isUninitialized: isUninitializedBlog,
	} = useGetBlogByIdQuery(params.id, {
		skip: user.access_token === null,
	});

	const {
		data: postData,
		isFetching: isFetchingPost,
		isLoading: isLoadingPost,
		isUninitialized: isUninitializedPost,
	} = useGetPostsByBlogIdQuery(params.id, {
		skip: user.access_token === null,
	});

	const [createPost, { data: createPostResponse }] =
		useCreatePostOnBlogMutation();
	const [createBlog] = useCreateNewBlogMutation();

	function handlePostSubmit(title: string, content: string) {
		const payload = {
			title: title,
			post_text: content,
			blog_id: blogData.id,
		};

		createPost(payload);
	}

	if (isLoadingBlog || isFetchingBlog || isUninitializedBlog) {
		return "Loading...";
	}

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="text-center">
					<h1 className="text-3xl font-extrabold text-gray-900">
						Welcome to {blogData.title}
					</h1>
					<span>Made by {blogData.creator.full_name}</span> <br />
					<p className="mt-4 text-lg text-gray-600">
						Check out the latest posts below:
					</p>
				</div>

				{blogData.creator.id === user.user_id && (
					<div className="max-w-md w-full">
						<button
							onClick={handleOpenPostModal}
							className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Create New Post
						</button>
						<NewPostModal
							isOpen={isPostModalOpen}
							onClose={handleClosePostModal}
							onSubmit={handlePostSubmit}
						/>
					</div>
				)}

				{isLoadingPost || isFetchingPost || isUninitializedPost ? (
					"Loading posts..."
				) : (
					<div className="mt-8 flex flex-col gap-4">
						{postData.map((post: any) => (
							<PostItem
								key={post.id}
								title={post.title}
								content={post.post_text}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
