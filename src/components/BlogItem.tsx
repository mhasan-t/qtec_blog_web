// components/BlogItem.js

import { useRouter } from "next/navigation";

type Props = {
	id: number;
	title: string;
	description: string;
	creator: string;
};

const BlogItem = ({ id, title, description, creator }: Props) => {
	const router = useRouter();
	function navigateToBlog() {
		router.push(`/blogs/${id}`);
	}

	return (
		<button
			className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden"
			onClick={navigateToBlog}
		>
			<div className="px-4 py-2">
				<h2 className="text-lg font-semibold text-gray-800">{title}</h2>
				<p className="mt-2 text-gray-600">{description}</p>
				<div className="mt-3 flex items-center">
					<span className="text-sm font-medium text-gray-500">
						Creator:
					</span>
					<span className="ml-2 text-sm font-semibold text-gray-800">
						{creator}
					</span>
				</div>
			</div>
		</button>
	);
};

export default BlogItem;
