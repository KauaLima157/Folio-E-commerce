import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="public-layout">

      <main className="content-public">
        <Outlet />
      </main>

      <footer className="footer">
        <small>Todos os direitos reservados</small>
      </footer>
    </div>
  );
}