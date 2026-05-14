import { Outlet } from "react-router-dom";
import { Footer } from "../pages/Footer";

export function PublicLayout() {
  return (
    <div className="public-layout">

      <main className="content-public">
        <Outlet />
      </main>

      <Footer/>
    </div>
  );
}