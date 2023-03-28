import { getPostsById } from "../api/postsApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchPost = (id: number) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostsById(id),
  });

  return { isLoading, isError, data, refetch };
};
