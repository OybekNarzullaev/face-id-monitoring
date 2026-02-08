import Loader from "@/shared/ui/Loader";
import React from "react";

export const EmployeePage = () => {
  const EmployeePageAsync = React.lazy(() => import("./EmployeePage"));
  return (
    <React.Suspense fallback={<Loader open={true} />}>
      <EmployeePageAsync />
    </React.Suspense>
  );
};
