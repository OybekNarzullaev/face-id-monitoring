import Loader from "@/shared/ui/Loader";
import React from "react";

export const EmployeeAttendancePage = () => {
  const EmployeeAttendancePageAsync = React.lazy(
    () => import("./EmployeeAttendancePage"),
  );
  return (
    <React.Suspense fallback={<Loader open={true} />}>
      <EmployeeAttendancePageAsync />
    </React.Suspense>
  );
};
