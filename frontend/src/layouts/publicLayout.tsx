import { Outlet } from "react-router-dom";
import { Footer } from "../pages/Footer";
import { Header, Header02, Header03 } from "../pages/Header";

export function PublicLayout() {

  // const headerArray = [<Header/>, <Header02/>];

  return (
    <div className="public-layout">
      <Header02/>

      <main className="content-public">
        <Outlet />
      </main>

      <Footer/>
    </div>
  );
}