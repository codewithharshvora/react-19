import { QueryClient } from "@tanstack/react-query";

// Central query client configuration that can be imported anywhere.
// Useful if you want to share common defaultOptions or cache behaviour.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default queryClient;
