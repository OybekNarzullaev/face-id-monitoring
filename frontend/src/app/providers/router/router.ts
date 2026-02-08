import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Auth from "../layout/Auth";
import Dashboard from "../layout/Dashboard";
import { LoginPage } from "@/pages/LoginPage";
import { EmployeeAttendancePage } from "@/pages/EmployeeAttendancePage";
import { EmployeePage } from "@/pages/EmployeePage";
import { CreateAttendancePage } from "@/pages/CreateAttendancePage";
import NotFoundPage from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "",
    Component: Root,
    children: [
      {
        path: "auth",
        Component: Auth,
        children: [
          {
            path: "login",
            Component: LoginPage,
          },
        ],
      },
      {
        path: "dashboard",
        Component: Dashboard,
        children: [
          {
            path: "attendances",
            Component: EmployeeAttendancePage,
          },
          {
            path: "attendances/create",
            Component: CreateAttendancePage,
          },
          {
            path: "employees",
            Component: EmployeePage,
          },
          {
            path: "*",
            Component: NotFoundPage,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
