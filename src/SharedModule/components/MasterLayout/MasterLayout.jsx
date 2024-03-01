import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/Sidebar";
import NavBar from "../Navbar/NavBar";
import Header from "../Header/Header";

export default function MasterLayout({ loginData }) {
  return (
    <>
      <div className="d-flex">
        <SideBar loginData={loginData} />
        <div className="w-100">
          <NavBar loginData={loginData} />
          <Outlet />
        </div>
      </div>
    </>
  );
}
