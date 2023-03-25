import {
  getPosts,
  getPostsById,
  createPost,
  editPost,
  deletePost,
} from "../api/postsApi";

export const usePost = () => {
  return { getPosts, getPostsById, createPost, editPost, deletePost };
};
