import { Navigate, Outlet } from "react-router-dom";

export function PrivateLayout() {
  const isAuth = false; 

  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div>
      {/* header do usuário etc */}

      <header>
        <h2>Área do Usuário</h2>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}