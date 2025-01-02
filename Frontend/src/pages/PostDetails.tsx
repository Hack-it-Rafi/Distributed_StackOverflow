import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPostFileQuery,
  useGetSinglePostQuery,
} from "../redux/features/user/userAccess.api";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const parseFileUrl = (fileUrl) => {
    try {
      const parts = fileUrl?.split("/").filter(Boolean);
      if (!parts || parts.length < 2) {
        throw new Error("Invalid file URL format.");
      }
      const bucketName = parts[0];
      const fileName = parts[1];
      return { bucketName, fileName };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const { data } = useGetSinglePostQuery(id);
  const { content, _id, createdAt, headLine, userEmail, userId } =
    data?.data || {};
  const fileUrl = data?.data?.fileUrl;

  const parsedUrl = fileUrl ? parseFileUrl(fileUrl) : null;
  const { fileName } = parsedUrl || {};

  const { data: fileData } = useGetPostFileQuery(fileName);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div>
        <button onClick={handleBack}>
          <IoArrowBackCircleOutline size={50} />
        </button>
      </div>
      <div className="max-w-5xl mx-auto p-6">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">{headLine}</h1>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>Asked on {new Date(createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>by {userEmail}</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Question</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
        </div>

        {fileData && (
          <div className="bg-gray-100 border rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Code Snippet
            </h3>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-auto">
              {fileData.content}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
