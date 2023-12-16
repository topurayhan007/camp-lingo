import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Homepage/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "../pages/AdminDashboard/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import InstructorHome from "../pages/InstructorDashboard/InstructorHome/InstructorHome";
import StudentHome from "../pages/StudentDashboard/StudentHome/StudentHome";
import StudentSelectedClasses from "../pages/StudentDashboard/StudentSelectedClasses/StudentSelectedClasses";
import StudentEnrolledClasses from "../pages/StudentDashboard/StudentEnrolledClasses/StudentEnrolledClasses";
import AddAClass from "../pages/InstructorDashboard/AddAClass/AddAClass";
import InstructorClasses from "../pages/InstructorDashboard/InstructorClasses/InstructorClasses";
import ManageClasses from "../pages/AdminDashboard/ManageClasses/ManageClasses";
import ManageUsers from "../pages/AdminDashboard/ManageUsers/ManageUsers";
import Payment from "../pages/StudentDashboard/Payment/Payment";
import PaymentHistory from "../pages/StudentDashboard/PaymentHistory/PaymentHistory";
import StudentRoute from "./StudentRoute";
import AllClasses from "../pages/Shared/AllClasses/AllClasses";
import AllInstructor from "../pages/Shared/AllInstructor/AllInstructor";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "instructors",
        element: <AllInstructor></AllInstructor>,
      },
      {
        path: "classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          // all student routes
          {
            path: "studenthome",
            element: (
              <StudentRoute>
                <StudentHome></StudentHome>
              </StudentRoute>
            ),
          },
          {
            path: "selected-classes",
            element: (
              <StudentRoute>
                <StudentSelectedClasses></StudentSelectedClasses>
              </StudentRoute>
            ),
          },
          {
            path: "enrolled-classes",
            element: (
              <StudentRoute>
                <StudentEnrolledClasses></StudentEnrolledClasses>
              </StudentRoute>
            ),
          },
          {
            path: "payment",
            element: (
              <StudentRoute>
                <Payment></Payment>
              </StudentRoute>
            ),
          },
          {
            path: "payment-history",
            element: (
              <StudentRoute>
                <PaymentHistory></PaymentHistory>
              </StudentRoute>
            ),
          },
          // all instructor routes
          {
            path: "instructorhome",
            element: (
              <InstructorRoute>
                <InstructorHome></InstructorHome>
              </InstructorRoute>
            ),
          },
          {
            path: "addclass",
            element: (
              <InstructorRoute>
                <AddAClass></AddAClass>
              </InstructorRoute>
            ),
          },
          {
            path: "instructor-classes",
            element: (
              <InstructorRoute>
                <InstructorClasses></InstructorClasses>
              </InstructorRoute>
            ),
          },
          // all admin routes
          {
            path: "adminhome",
            element: (
              <AdminRoute>
                <AdminHome></AdminHome>
              </AdminRoute>
            ),
          },
          {
            path: "manage-classes",
            element: (
              <AdminRoute>
                <ManageClasses></ManageClasses>
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers></ManageUsers>
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);
