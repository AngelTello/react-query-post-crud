import { updatePost } from "../api/postsApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePost = () => {
  const mutation = useMutation({
    mutationFn: updatePost,
  });

  return mutation;
};
