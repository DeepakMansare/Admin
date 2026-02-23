import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = () => API.get("/posts");

export const createPost = (data: {
  title: string;
  body: string;
  userId: number;
}) => API.post("/posts", data);

export const updatePosts = (
  id: number,
  data: { title: string; body: string },
) => API.put(`/posts/${id}`, data);

export const deletePost = (id: number) => API.delete(`/posts/${id}`);

export const getUsers = () => API.get("/users");

export const createUser = (data: {
  name: string;
  username: string;
  email: string;
}) => API.post("/users", data);
