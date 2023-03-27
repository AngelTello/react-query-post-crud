import axios from "axios";

const productsApi = axios.create({
  baseURL: "http://localhost:3001/posts",
});

export const getPosts = async () => {
  const res = await productsApi.get("/?_expand=author");

  return res.data;
};

export const getPostsById = async (id: number) => {
  const res = await productsApi.get(`/${id}?_expand=author`);

  return res.data;
};

export const createPost = async (post: any) => productsApi.post("/", post);
export const updatePost = async (post: any) => productsApi.put(`/${post.id}`, post);
export const deletePost = async (id: number) => productsApi.delete(`/${id}`);
