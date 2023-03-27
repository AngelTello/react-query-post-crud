import {
  getPosts,
  getPostsById,
  createPost,
  updatePost,
  deletePost,
} from "../api/postsApi";

export const usePost = () => {
  return { getPosts, getPostsById, createPost, updatePost, deletePost };
};
