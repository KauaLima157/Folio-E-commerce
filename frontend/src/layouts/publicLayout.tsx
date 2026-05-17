import { Outlet } from "react-router-dom";
import { Footer } from "../pages/Footer";
import { Header, Header02, Header03 } from "../pages/Header";
import { useEffect, useState } from "react";

export function PublicLayout() {
  const [index, setIndex] = useState(0);
  const headerArray = [<Header03/>, <Header/>, <Header02/>];

  useEffect(() => {

     const interval = setInterval(() => {

      setIndex((prev) =>
        prev + 1 >= headerArray.length
          ? 0
          : prev + 1
      );

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="public-layout">

      {headerArray[index]}

      <main className="content-public">
        <Outlet />
      </main>

      <Footer/>
    </div>
  );
}