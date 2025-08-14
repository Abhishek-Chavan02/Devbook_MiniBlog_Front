import React, { useState, useRef, useEffect } from "react";
import CreatePost from "./CreatePost";
import ChatInput from "./ChatInput";
import { TrashIcon, HeartIcon, ChatAltIcon, PencilAltIcon } from "@heroicons/react/solid";

const Chat = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setPosts([...posts, { type: "message", content: message, likeCount: 0, commentCount: 0 }]);
    setMessage("");
  };

  const handleAddPost = (post) => {
    setPosts([{ ...post, type: "post", likeCount: 0, commentCount: 0 }, ...posts]);
    setShowCreatePost(false);
  };

  const handleDelete = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  const handleEdit = (index, newContent) => {
    const updatedPosts = [...posts];
    updatedPosts[index].content = newContent;
    setPosts(updatedPosts);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [posts]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages / Posts */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {posts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            onDelete={() => handleDelete(index)}
            onEdit={(newContent) => handleEdit(index, newContent)}
          />
        ))}
      </div>

      {/* Chat Input */}
      <ChatInput
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
        onOpenCreatePost={() => setShowCreatePost(true)}
      />

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost onPost={handleAddPost} onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
};

export default Chat;

// ----------------------
// Separate PostCard Component
// ----------------------
const PostCard = ({ post, onDelete, onEdit }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [commentCount] = useState(post.commentCount || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || post.description);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1));
  };

  const saveEdit = () => {
    onEdit(editContent);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      {post.type === "post" && (
        <>
          <h3 className="font-semibold text-lg">{post.title}</h3>
          {isEditing ? (
            <textarea
              className="border rounded p-2 mt-1 w-full"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          ) : (
            <p className="text-gray-600 mt-1">{post.description}</p>
          )}
        </>
      )}
      {post.type === "message" && (
        isEditing ? (
          <textarea
            className="border rounded p-2 w-full"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <p className="text-gray-800">{post.content}</p>
        )
      )}

      {/* Like / Comment / Edit / Delete icons */}
      <div className="flex gap-4 mt-3 items-center">
        <div className="flex items-center gap-1 cursor-pointer" onClick={toggleLike}>
          <HeartIcon className={`h-5 w-5 ${liked ? "text-red-500" : "text-gray-400"}`} />
          <span className="text-sm">{likeCount}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <ChatAltIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm">{commentCount}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsEditing(!isEditing)}>
          <PencilAltIcon className="h-5 w-5 text-blue-500" />
        </div>
        {isEditing && (
          <button
            onClick={saveEdit}
            className="px-2 py-1 bg-green-500 text-white text-sm rounded"
          >
            Save
          </button>
        )}
        <TrashIcon
          className="h-5 w-5 text-gray-500 cursor-pointer"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
