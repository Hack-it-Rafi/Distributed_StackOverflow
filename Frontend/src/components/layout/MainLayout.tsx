import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";
// import Footer from "../ui/Footer";

const MainLayout: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
