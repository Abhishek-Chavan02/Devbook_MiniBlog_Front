import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import ChatInput from "./ChatInput";
import { DeleteBlog, GetBlogs, UpdateBlog } from "../../redux/actions/BlogAction";
import { TrashIcon, HeartIcon, ChatAltIcon, PencilAltIcon } from "@heroicons/react/solid";

const Chat = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogList);
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  // Fetch blogs on mount
  useEffect(() => {
    dispatch(GetBlogs());
  }, [dispatch]);

  // Map blogs to post structure
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const blogPosts = blogs.map((b) => ({
        type: "post",
        title: b.title || b.tag,
        description: b.description,
        likeCount: b.likeCount || 0,
        commentCount: b.messageCount || 0,
        id: b._id,
        createdBy: b.createdBy,
      }));
      setPosts(blogPosts);
    }
  }, [blogs]);

  // Handle adding new message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    setPosts([...posts, { type: "message", content: message, likeCount: 0, commentCount: 0 }]);
    setMessage("");
  };

  // Add new blog to UI
  const handleAddPost = (post) => {
    setPosts([{ ...post, type: "post", likeCount: 0, commentCount: 0 }, ...posts]);
    setShowCreatePost(false);
  };

  // Delete post
  const handleDelete = async (postId) => {
    if (!postId) return;
    try {
      await dispatch(DeleteBlog(postId));
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };

  // Edit post
  const handleEdit = async (postId, updatedContent) => {
    if (!postId) return;
    try {
      await dispatch(UpdateBlog(postId, updatedContent));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, ...updatedContent } : p
        )
      );
    } catch (err) {
      console.error("Failed to update blog", err);
    }
  };

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [posts]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {posts.map((post) => {
          const canEditOrDelete =
            userInfo &&
            (userInfo.roleId === "1001" ||
              (post.createdBy && userInfo.id === post.createdBy._id));

          return (
            <PostCard
              key={post.id}
              post={post}
              canEditOrDelete={canEditOrDelete}
              onDelete={() => handleDelete(post.id)}
              onUpdate={(newContent) => handleEdit(post.id, newContent)}
            />
          );
        })}
      </div>

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
        onOpenCreatePost={() => setShowCreatePost(true)}
      />

      {showCreatePost && (
        <CreatePost onPost={handleAddPost} onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
};

export default Chat;

// ----------------------
// PostCard Component
// ----------------------
const PostCard = ({ post, canEditOrDelete, onDelete, onUpdate }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [commentCount] = useState(post.commentCount || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDescription, setEditDescription] = useState(post.description);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1));
  };

  const saveEdit = async () => {
    if (!post.id) return;
    const updatedData = {
      tag: editTitle,
      description: editDescription,
    };
    try {
      await dispatch(UpdateBlog(post.id, updatedData));
      if (onUpdate) {
        onUpdate({
          title: editTitle,
          description: editDescription,
        });
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update blog", err);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow p-4 flex flex-col">
      {post.createdBy && (
        <span className="absolute top-2 right-4 text-sm text-gray-500 font-medium">
          {post.createdBy.firstname} {post.createdBy.lastname}
        </span>
      )}

      {post.type === "post" && (
        <>
          {isEditing ? (
            <>
              <input
                type="text"
                className="border rounded p-2 mt-1 w-full"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="border rounded p-2 mt-1 w-full"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </>
          ) : (
            <>
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-gray-600 mt-1">{post.description}</p>
            </>
          )}
        </>
      )}

      {post.type === "message" && <p className="text-gray-800">{post.content}</p>}

      <div className="flex gap-4 mt-3 items-center">
        <div className="flex items-center gap-1 cursor-pointer" onClick={toggleLike}>
          <HeartIcon className={`h-5 w-5 ${liked ? "text-red-500" : "text-gray-400"}`} />
          <span className="text-sm">{likeCount}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <ChatAltIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm">{commentCount}</span>
        </div>

        {canEditOrDelete && (
          <>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
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
          </>
        )}
      </div>
    </div>
  );
};
