import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export const url =
  "https://api.studio.thegraph.com/query/118370/nft-project/version/latest";

export const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_SUBGRAPH_API_KEY}`,
};
