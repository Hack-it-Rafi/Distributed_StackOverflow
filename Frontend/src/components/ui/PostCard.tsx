import { useNavigate } from "react-router-dom";

const PostCard = ({ item }) => {
  const navigate = useNavigate();

  const handlePostRedirect = (id) => {
    navigate(`/post/${id}`);
  };

  const { content, _id, createdAt, headLine, userEmail, userId } = item;
  
  return (
    <div
      onClick={() => handlePostRedirect(_id)}
      className="cursor-pointer transition transform hover:scale-105"
    >
      <div className="card  bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="card-body p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">{new Date(createdAt).toLocaleDateString()}</span>
            <span className="text-xs text-gray-400">by {userEmail}</span>
          </div>
          <h2 className="card-title text-2xl font-bold mt-3 text-gray-800">
            {headLine}
          </h2>
          <p className="text-gray-600 mt-2">
            {content.length > 100 ? `${content.slice(0, 100)}...` : content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
