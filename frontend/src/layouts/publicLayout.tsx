import { Outlet } from "react-router-dom";
import { Footer } from "../pages/Footer";

export function PublicLayout() {
  return (
    <div className="public-layout">

      {/* {headerArray[index]} */}

      <main className="content-public">
        <Outlet />
      </main>

      <Footer/>
    </div>
  );
}