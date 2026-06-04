import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../pages/Footer";
import { ChatWidget } from "../components/ChatWidget";

export function PublicLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname.includes("/auth");

  return (
    <div className="public-layout">

      {/* {headerArray[index]} */}

      <main className="content-public">
        <Outlet />
      </main>

      <Footer/>
      
      {!isAuthPage && <ChatWidget />}
    </div>
  );
}