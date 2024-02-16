// components/PostItem.js

type Props = {
  title : string,
  description: string,
  creator: string
}

const PostItem = ({ title, description, creator } : Props) => {
  return (
    <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-3 flex items-center">
          <span className="text-sm font-medium text-gray-500">Creator:</span>
          <span className="ml-2 text-sm font-semibold text-gray-800">{creator}</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
