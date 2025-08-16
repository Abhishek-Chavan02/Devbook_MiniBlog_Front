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

  useEffect(() => {
    dispatch(GetBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const mappedPosts = blogs.map((b) => ({
        type: b.tag || b.description ? "post" : "message", 
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

const handleSendMessage = async () => {
  if (!message.trim()) return;
  try {
    const payload = { message, createdBy: userInfo.id };
    await dispatch(CreateBlog(payload));
    await dispatch(GetBlogs()); 
    setMessage("");
  } catch (err) {
    console.error("Failed to send message", err);
  }
};

const handleAddPost = async (post) => {
  try {
    const payload = {
      tag: post.tag,
      description: post.description,
      createdBy: userInfo.id,
    };
    await dispatch(CreateBlog(payload));
    await dispatch(GetBlogs()); 
    setShowCreatePost(false);
  } catch (err) {
    console.error("Failed to create post", err);
  }
};

  const handleDelete = async (postId) => {
    if (!postId) return;
    try {
      await dispatch(DeleteBlog(postId));
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };

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

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [posts]);

  const filteredPosts = posts.filter(
    (post) =>
      post.type === "message" ||
      post.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
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
          const isAdmin =
            userInfo?.roleId === 1001 || userInfo?.role === "admin"; 
          const isCreator =
            post.createdBy && userInfo?.id === post.createdBy._id;
          const canEditOrDelete = isAdmin || isCreator;

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
const PostCard = ({ post, canEditOrDelete, onDelete, onUpdate }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDescription, setEditDescription] = useState(post.description || post.content);
  
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const blogState = useSelector((state) => state.blogList.blogs);
  const currentBlog = blogState.find((b) => b._id === post.id) || post;
  const creator = post.createdBy || currentBlog.createdBy;
  
  const [isLiked, setIsLiked] = useState(
    userInfo && currentBlog.likes ? currentBlog.likes.includes(userInfo.id) : false
  );
  const [likeCount, setLikeCount] = useState(currentBlog.likeCount || 0);

  useEffect(() => {
    if (currentBlog && userInfo) {
      setIsLiked(currentBlog.likes ? currentBlog.likes.includes(userInfo.id) : false);
      setLikeCount(currentBlog.likeCount || 0);
    }
  }, [currentBlog, userInfo]);

const toggleLike = async () => {
  if (userInfo && post.id) {
    try {
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);
      setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1);
      
      await dispatch(ToggleLike(post.id, userInfo.id));
      
      await dispatch(GetBlogs());
    } catch (error) {
      setIsLiked(!newLikeStatus);
      setLikeCount(newLikeStatus ? likeCount : likeCount + 1);
      console.error("Error toggling like:", error);
    }
  }
};
  const saveEdit = async () => {
    if (!post.id) return;
    const updatedData =
      post.type === "post"
        ? { tag: editTitle, description: editDescription }
        : { message: editDescription };
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
      <div className="absolute top-2 right-4 flex items-center">
        {creator ? (
          <>
            <span className="text-sm text-gray-700 font-medium">
              {creator.firstname} {creator.lastname}
            </span>
            {(creator.roleId === "1001" || creator.role === "admin") && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                Admin
              </span>
            )}
          </>
        ) : (
          <span className="text-sm text-gray-400">Unknown User</span>
        )}
      </div>

      {post.type === "post" ? (
        isEditing ? (
          <>
            <input
              type="text"
              className="border rounded p-2 mt-1 w-full mb-2"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Post title"
            />
            <textarea
              className="border rounded p-2 w-full"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Post description"
              rows={4}
            />
          </>
        ) : (
          <>
            <h3 className="font-semibold text-lg text-gray-800">{post.title}</h3>
            <p className="text-gray-600 mt-2 whitespace-pre-line">{post.description}</p>
          </>
        )
      ) : isEditing ? (
        <textarea
          className="border rounded p-2 w-full"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Your message"
          rows={3}
        />
      ) : (
        <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
      )}

      <div className="flex gap-4 mt-3 items-center pt-2 border-t border-gray-100">
        <div
          className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors"
          onClick={toggleLike}
        >
          <HeartIcon
            className={`h-5 w-5 cursor-pointer ${isLiked ? "text-red-500 fill-current" : "text-gray-400"}`}
          />
          <span className="text-sm">{likeCount}</span>
        </div>

        {(canEditOrDelete || (userInfo?.roleId === "1001" || userInfo?.role === "admin")) && (
          <div className="flex items-center gap-2 ml-auto">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <PencilAltIcon className="h-5 w-5 cursor-pointer" />
              </button>
            )}
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <TrashIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
