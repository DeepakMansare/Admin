import { useEffect, useState } from "react";

import type { Post } from "@pages/Posts/Posts.types";
import { getPosts } from "@api/api";

export const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const totalPosts = posts.length;
  const uniqueUsers = new Set(posts.map((p) => p.userId)).size;
  const longPosts = posts.filter((p) => p.body.length > 150).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl">Posts Overview</h1>
      </div>

      <div className="grid grid-cols-3 gap-6 font-medium">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-xl">Total Posts</h1>
          <p className="text-lg text-blue-500">{totalPosts}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-xl">Unique Users</h1>
          <p className="text-lg">{uniqueUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-xl">Long Posts</h1>
          <p className="text-lg text-green-500">{longPosts}</p>
        </div>
      </div>
    </div>
  );
};
