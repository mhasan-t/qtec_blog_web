// components/PostItem.js

type Props = {
	title: string;
	content: string;
};

const PostItem = ({ title, content }: Props) => {
	return (
		<div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="px-4 py-2">
				<h2 className="text-lg font-semibold text-gray-800">{title}</h2>
				<p className="mt-2 text-gray-600">{content}</p>
			</div>
		</div>
	);
};

export default PostItem;
