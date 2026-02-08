import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type React from "react";

const queryClient = new QueryClient();

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
