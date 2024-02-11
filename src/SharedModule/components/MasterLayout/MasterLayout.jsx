import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import NavBar from "../Navbar/NavBar";
import Header from "../Header/Header";

export default function MasterLayout() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <NavBar />
            <Header/>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
