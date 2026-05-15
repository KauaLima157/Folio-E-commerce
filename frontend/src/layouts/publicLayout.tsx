import { Outlet } from "react-router-dom";
import { Footer } from "../pages/Footer";
import { Header } from "../pages/Header";

export function PublicLayout() {
  return (
    <div className="public-layout">
      <Header/>

      <main className="content-public">
        <Outlet />
      </main>

      <Footer/>
    </div>
  );
}