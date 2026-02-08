import React from "react";
import Loader from "@/shared/ui/Loader";

export const CreateAttendancePage = () => {
  const CreateAttendancePageAsync = React.lazy(
    () => import("./CreateAttendancePage"),
  );
  return (
    <React.Suspense fallback={<Loader open={true} />}>
      <CreateAttendancePageAsync />
    </React.Suspense>
  );
};
