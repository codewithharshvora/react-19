// ReactNode not needed here
// This layout is wrapped by <ErrorBoundary> at router level to catch render errors.
import { Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function MainLayout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <div className="space-x-4">
            <Link to="/users" className="hover:underline">
              Users
            </Link>
            <Link to="/posts" className="hover:underline">
              Posts
            </Link>
          </div>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </nav>
      </header>
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-100 text-center p-2">
        <small>&copy; 2026 My App</small>
      </footer>
    </div>
  );
}
