// This layout is wrapped by <ErrorBoundary> at router level to catch render errors.
import { Outlet } from "react-router-dom";

export default function MinimalLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
