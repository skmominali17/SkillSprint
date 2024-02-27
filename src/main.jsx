import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx";
import CourseUpload from "./pages/CourseUpload.jsx";
import TeacherRoute from "./components/TeacherRoute.jsx";
import CourseRender from "./pages/CourseRender.jsx";
import Home from "./pages/Home.jsx";
import { CourseProvider } from "./contexts/CourseContext.jsx";
import MyCourses from "./pages/MyCourses.jsx";
import ExploreCourses from "./pages/ExploreCourses.jsx";
import BrowseByCategory from "./pages/BrowseByCategory.jsx";
import Search from "./pages/Search.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Home />
      </App>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/category/:category",
    element: (
      <ProtectedRoute>
        <App>
          <BrowseByCategory />
        </App>
      </ProtectedRoute>
    ),
  },
  {
    path: "/create/course",
    element: (
      <ProtectedRoute>
        <TeacherRoute>
          <App>
            <CourseUpload />
          </App>
        </TeacherRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-courses",
    element: (
      <ProtectedRoute>
        <App>
          <MyCourses />
        </App>
      </ProtectedRoute>
    ),
  },
  {
    path: "/watch/course/:id",
    element: (
      <ProtectedRoute>
        <App>
          <CourseRender />
        </App>
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit/course/:id",
    element: (
      <ProtectedRoute>
        <TeacherRoute>
          <App>
            <CourseUpload />
          </App>
        </TeacherRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/explore-courses",
    element: (
      <ProtectedRoute>
        <App>
          <ExploreCourses />
        </App>
      </ProtectedRoute>
    ),
  },
  {
    path: "/search/:search",
    element: (
      <ProtectedRoute>
        <App>
          <Search />
        </App>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <App>
          <Profile />
        </App>
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CourseProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </CourseProvider>
    </AuthProvider>
  </React.StrictMode>
);
