import { useQuery } from "@tanstack/react-query";

// hook for fetching posts (stub)
export const useFetchPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      // implementation goes here
      return [] as any[];
    },
  });
};
