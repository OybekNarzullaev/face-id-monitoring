import { Outlet, useLocation, useNavigate } from "react-router";

import Loader from "@/shared/ui/Loader";
import React, { useEffect } from "react";
import { useAuthStore } from "@/shared/store/authStore";

const Root = () => {
  const { auth } = useAuthStore();

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  console.log(auth);

  useEffect(() => {
    if (auth) {
      if (pathname.includes("dashboard")) {
        navigate(pathname);
      } else {
        navigate("/dashboard/attendances");
      }
    } else {
      navigate("/auth/login");
    }
  }, [auth]);
  return (
    <React.Suspense fallback={<Loader open={true} />}>
      <Outlet />
    </React.Suspense>
  );
};

export default Root;
