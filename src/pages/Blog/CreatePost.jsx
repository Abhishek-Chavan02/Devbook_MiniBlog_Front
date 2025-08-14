import React, { useState } from "react";

const CreatePost = ({ onPost, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onPost({ type: "post", title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <h3 className="text-lg font-semibold mb-4">Create Post</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
