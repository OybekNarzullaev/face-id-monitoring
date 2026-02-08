import Loader from "@/shared/ui/Loader";
import React from "react";

export const LoginPage = () => {
  const LoginPageAsync = React.lazy(() => import("./LoginPage"));
  return (
    <React.Suspense fallback={<Loader open={true} />}>
      <LoginPageAsync />
    </React.Suspense>
  );
};
