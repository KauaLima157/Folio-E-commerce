import { Navigate, Outlet } from "react-router-dom";

import { Footer } from "../pages/Footer";

import { useAuth } from "../hook/authHook";

export function PrivateLayout() {

  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    );
  }

  return (
    <div className="private-layout">

      <main className="content-private">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}