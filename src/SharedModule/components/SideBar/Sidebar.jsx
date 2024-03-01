import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import toggler from "../../../assets/images/3.png";
import ChangePass from "../../../AuthModule/components/change-password/ChangePass";
import Modal from "react-bootstrap/Modal";

export default function SideBar({ loginData }) {
  console.log(loginData);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="sidebar-container vh-100">
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ChangePass handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            onClick={toggleCollapse}
            icon={<img src={toggler} />}
          ></MenuItem>
          <MenuItem
            icon={<i className="fa fa-home" aria-hidden="true"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          {loginData?.userGroup == "SuperAdmin" ? (
            <MenuItem
              icon={<i className="fa fa-users" aria-hidden="true"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
          ) : (
            ""
          )}

          <MenuItem
            icon={<i className="fa fa-hamburger" aria-hidden="true"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          {loginData?.userGroup == "SystemUser" ? (
            <MenuItem
              icon={<i className="fa fa-hamburger" aria-hidden="true"></i>}
              component={<Link to="/dashboard/favourites" />}
            >
              Favourites
            </MenuItem>
          ) : (
            ""
          )}

          {loginData?.userGroup == "SuperAdmin" ? (
            <MenuItem
              icon={<i className="fa fa-list-alt" aria-hidden="true"></i>}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
          ) : (
            ""
          )}

          <MenuItem
            onClick={handleShow}
            icon={<i className="fa fa-key" aria-hidden="true"></i>}
          >
            Change Password
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-sign-out" aria-hidden="true"></i>}
            onClick={logout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* <button onClick={logout} className="btn btn-danger">
        logout
      </button> */}
    </div>
  );
}
