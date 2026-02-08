import { RouterProvider } from "react-router";
import { router } from "./router";

export const ReactRouterProvider = () => {
  return <RouterProvider router={router} />;
};
