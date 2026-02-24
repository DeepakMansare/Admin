import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { getPosts, createPost, updatePosts, deletePost } from "@api/api";
import type { Post } from "./Posts.types";

type PostForm = {
  title: string;
  body: string;
};

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const postsPerPage = 6;

  const { register, handleSubmit, reset } = useForm<PostForm>();

  const [editData, setEditData] = useState({
    id: 0,
    title: "",
    body: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getPosts();
        setPosts(response.data);
      } catch {
        toast.error("Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const onSubmit = async (data: PostForm) => {
    try {
      setIsLoading(true);
      const res = await createPost({ ...data, userId: 1 });
      setPosts((prev) => [res.data, ...prev]);
      toast.success("Post created successfully");
      reset();
      setShowForm(false);
      setCurrentPage(1);
    } catch {
      toast.error("Error creating post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setEditData({
        id: postToEdit.id,
        title: postToEdit.title,
        body: postToEdit.body,
      });
      setEditForm(true);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updatePosts(editData.id, {
        title: editData.title,
        body: editData.body,
      });

      setPosts((prev) =>
        prev.map((post) =>
          post.id === editData.id ? { ...post, ...editData } : post,
        ),
      );

      toast.success("Post updated successfully");
      setEditForm(false);
    } catch {
      toast.error("Post update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      toast.success("Post deleted successfully");
      setCurrentPage(1);
    } catch {
      toast.error("Post not deleted");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Posts</h1>

        <button
          onClick={() => setShowForm(true)}
          disabled={isLoading}
          className="bg-primary p-3 rounded-md text-white text-sm"
        >
          Create Post
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md p-2 border rounded-md"
        />
      </div>

      {showForm && (
        <div className="mb-6 border rounded-lg max-w-lg p-4 bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <input
              type="text"
              placeholder="Enter title"
              className="w-full border rounded-md p-2"
              {...register("title", { required: true })}
            />

            <textarea
              className="border rounded-md w-full p-2"
              placeholder="Enter post description"
              {...register("body", { required: true })}
            />

            <button
              type="submit"
              className="bg-primary p-2 rounded-md text-white"
            >
              {isLoading ? "Saving..." : "Save Post"}
            </button>
          </form>
        </div>
      )}

      {editForm && (
        <div className="mb-6 max-w-lg border p-4 rounded-lg">
          <form onSubmit={handleUpdate} className="flex flex-col space-y-3">
            <input
              type="text"
              value={editData.title}
              className="p-2 rounded-md border w-full"
              placeholder="Enter title"
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <textarea
              value={editData.body}
              className="p-2 rounded-md border w-full"
              placeholder="Enter post description"
              onChange={(e) =>
                setEditData({ ...editData, body: e.target.value })
              }
            />

            <button className="p-2 bg-primary text-white rounded-md">
              Update
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-md mb-2 font-medium">{post.title}</h1>
            <p className="text-sm">{post.body}</p>

            <div className="mt-2 space-x-3">
              <button
                onClick={() => handleEdit(post.id)}
                className="px-3 py-2 bg-primary text-white rounded-md"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-2 bg-error text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
