import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import ChatInput from "./ChatInput";
import {
  DeleteBlog,
  GetBlogs,
  ToggleLike,
  UpdateBlog,
  CreateBlog,
} from "../../redux/actions/BlogAction";
import {
  TrashIcon,
  HeartIcon,
  ChatAltIcon,
  PencilAltIcon,
} from "@heroicons/react/solid";

const Chat = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogList);
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  // Fetch blogs/messages from backend
  useEffect(() => {
    dispatch(GetBlogs());
  }, [dispatch]);

  // Map blogs from backend to posts/messages
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const mappedPosts = blogs.map((b) => ({
        type: b.tag || b.description ? "post" : "message", // Detect type
        title: b.tag || "",
        tag: b.tag,
        description: b.description || "",
        content: b.message || "",
        likeCount: b.likeCount || 0,
        commentCount: b.messageCount || 0,
        id: b._id,
        createdBy: b.createdBy,
        likes: b.likes || [],
        isLiked: b.isLiked || false,
      }));
      setPosts(mappedPosts);
    }
  }, [blogs]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      const payload = { message, createdBy: userInfo.id };
      const res = await dispatch(CreateBlog(payload));
      const newPost = {
        type: "message",
        content: res.blog.message,
        likeCount: res.blog.likeCount || 0,
        commentCount: 0,
        id: res.blog._id,
        createdBy: res.blog.createdBy,
        likes: res.blog.likes || [],
      };
      setPosts([...posts, newPost]);
      setMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  // Add a blog post
  const handleAddPost = async (post) => {
    try {
      const payload = { tag: post.tag, description: post.description, createdBy: userInfo.id };
      const res = await dispatch(CreateBlog(payload));
      const newPost = {
        type: "post",
        title: res.blog.tag,
        description: res.blog.description,
        likeCount: res.blog.likeCount || 0,
        commentCount: 0,
        id: res.blog._id,
        createdBy: res.blog.createdBy,
        likes: res.blog.likes || [],
      };
      setPosts([newPost, ...posts]);
      setShowCreatePost(false);
    } catch (err) {
      console.error("Failed to create post", err);
    }
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
        prev.map((p) => (p.id === postId ? { ...p, ...updatedContent } : p))
      );
    } catch (err) {
      console.error("Failed to update blog", err);
    }
  };

  // Auto scroll to bottom for new messages
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [posts]);

  // Filter posts by tag (messages always show)
  const filteredPosts = posts.filter(
    (post) =>
      post.type === "message" ||
      post.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="p-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-1 text-sm w-60 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {filteredPosts.map((post) => {
          const canEditOrDelete =
            userInfo &&
            post.createdBy &&
            userInfo.id === post.createdBy._id; // Only creator can edit/delete

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
        <CreatePost
          onPost={handleAddPost}
          onClose={() => setShowCreatePost(false)}
        />
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
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDescription, setEditDescription] = useState(post.description);

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const blogState = useSelector((state) => state.blogList.blogs);
  const currentBlog = blogState.find((b) => b._id === post.id) || post;

  const isLikedByCurrentUser =
    userInfo && currentBlog.likes
      ? currentBlog.likes.includes(userInfo.id)
      : false;

  const liked = isLikedByCurrentUser || currentBlog.isLiked || false;
  const likeCount = currentBlog.likeCount || 0;

  const toggleLike = () => {
    if (userInfo && post.id) {
      dispatch(ToggleLike(post.id, userInfo.id)).catch((error) => {
        console.error("Error toggling like:", error);
      });
    }
  };

  const saveEdit = async () => {
    if (!post.id) return;
    const updatedData =
      post.type === "post"
        ? { tag: editTitle, description: editDescription }
        : { message: editDescription }; // For messages
    try {
      await dispatch(UpdateBlog(post.id, updatedData));
      if (onUpdate) {
        onUpdate(
          post.type === "post"
            ? { title: editTitle, description: editDescription }
            : { content: editDescription }
        );
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

      {post.type === "message" && (
        <>
          {isEditing ? (
            <textarea
              className="border rounded p-2 mt-1 w-full"
              value={editDescription || post.content}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          ) : (
            <p className="text-gray-800">{post.content}</p>
          )}
        </>
      )}

      <div className="flex gap-4 mt-3 items-center">
        {/* Like Button */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={toggleLike}
        >
          <HeartIcon
            className={`h-5 w-5 ${liked ? "text-red-500" : "text-gray-400"}`}
          />
          <span className="text-sm">{likeCount}</span>
        </div>

        {/* Comment Count */}
        <div className="flex items-center gap-1 cursor-pointer">
          <ChatAltIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm">{post.commentCount || 0}</span>
        </div>

        {/* Edit/Delete */}
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
