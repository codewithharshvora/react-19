import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MinimalLayout from "./layouts/MinimalLayout";
import ProtectedRoute from "./protected/ProtectedRoute";
import Login from "../features/auth/components/Login";
import UsersPage from "../features/users/components/UsersPage";
import PostsPage from "../features/posts/components/PostsPage";
import ErrorBoundary from "../shared/ErrorBoundary";

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <MinimalLayout />
      </ErrorBoundary>
    ),
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      // additional public routes go here
    ],
  },
  {
    element: (
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/users", element: <UsersPage /> },
          { path: "/posts", element: <PostsPage /> },
          // protected feature routes
        ],
      },
    ],
  },
  // fallback: redirect unknown to login
  { path: "*", element: <Login /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
