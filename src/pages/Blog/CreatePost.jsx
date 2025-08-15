import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateBlog } from "../../redux/actions/BlogAction";


const CreatePost = ({ onClose }) => {
  const dispatch = useDispatch();

  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const userFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  console.log('userFromStorage: ', userFromStorage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tag || !description || !userFromStorage?.id) return; // make sure ID exists

    try {
      const blogData = {
        tag,
        description,
        createdBy: userFromStorage.id, // pass user ID here
      };

      await dispatch(CreateBlog(blogData));
      setTag("");
      setDescription("");
      onClose(); // Close modal after successful creation
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <h3 className="text-lg font-semibold mb-4">Create Blog Post</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tag (e.g., React, Redux)"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Blog content..."
            className="w-full border p-2 rounded"
            rows="4"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;