import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export default function ProtectedRoute() {
  // this selector assumes you have an auth slice with a token field
  const token = useAppSelector((state) => state.auth?.token);
  const loggedIn = Boolean(token);
  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
