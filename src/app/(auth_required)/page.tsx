"use client";
import BlogItem from "@/components/BlogItem";
import { useModal } from "@/lib/hooks/useModal";
import { useRedux } from "@/lib/hooks/useRedux";
import {
	useCreateNewBlogMutation,
	useGetBlogsQuery,
} from "@/lib/services/blogs";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";

const Home = () => {
	const router = useRouter();

	const {
		isOpen: isPostModalOpen,
		handleOpen: handleOpenPostModal,
		handleClose: handleClosePostModal,
	} = useModal();
	const { useAppDispatch, useAppSelector } = useRedux();
	const user = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	const {
		data: blogs,
		isFetching,
		isLoading,
		isUninitialized,
	} = useGetBlogsQuery(undefined, {
		skip: user.access_token === null,
	});

	const navigateToCreateBlog = async () => {
		router.push("/blogs/create/");
	};

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="text-center">
					<h1 className="text-3xl font-extrabold text-gray-900">
						Checkout our blogs below
					</h1>
				</div>

				<div className="max-w-md w-full">
					<button
						onClick={navigateToCreateBlog}
						className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Create New Blog
					</button>
				</div>

				<div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{isLoading || isFetching || isUninitialized
						? "Loading..."
						: blogs.results.map((blog: any) => (
								<BlogItem
									id={blog.id}
									key={blog.id}
									title={blog.title}
									description={blog.description}
									creator={blog.creator.full_name}
								/>
						  ))}
				</div>
			</div>
		</div>
	);
};

export default Home;
