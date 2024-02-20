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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CourseRender from "./pages/CourseRender.jsx";
import Home from "./pages/Home.jsx";
import { CourseProvider } from "./contexts/CourseContext.jsx";
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
    element: <App />,
  },
  {
    path: "/featured/:id",
    element: <App />,
  },
  {
    path: "/course",
    element: (
      <ProtectedRoute>
        <App>
          <CourseUpload />
        </App>
      </ProtectedRoute>
    ),
  },
  {
    path: "/render-course",
    element: (
      <App>
        <CourseRender />
      </App>
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
