import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/images/logo.png";

export default function ChangePass({ handleClose }) {
    let [error,setError]=useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let token = localStorage.getItem("token");
    if(data.newPassword==data.confirmNewPassword){
        try {
            let response = await axios.put(
              "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
              data,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            console.log(response);
            handleClose();
          } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { position: "top-right" });
          }
    }
    else{
        setError('el pass m4 bysawy el confirm')
    }
    
  };
  return (
    <>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12">
          <div className="login bg-white rounded-3 px-5">
            <div className="logo-cont text-center mb-3">
              <img src={logo} alt="food-logo" className="w-50" />
            </div>
            <h5> Change Password</h5>
            <p className="text-muted">Enter your details below</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-column my-2">
                <div className="input-group mb-1">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="old Password"
                    {...register("oldPassword", {
                      required: "oldPassword is required",
                    })}
                  />
                </div>
                {errors.oldPassword && (
                  <p className="m-0 alert alert-danger p-1">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>
              <div className="flex-column my-2">
                <div className="input-group mb-1">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="new Password"
                    {...register("newPassword", {
                      required: "newPassword is required",
                    })}
                  />
                </div>
                {errors.newPassword && (
                  <p className="m-0 alert alert-danger p-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="flex-column my-2">
                <div className="input-group mb-1">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="confirm new Password"
                    {...register("confirmNewPassword", {
                      required: "confirmNewPassword is required",
                    })}
                  />
                </div>
                {errors.confirmNewPassword && (
                  <p className="m-0 alert alert-danger p-1">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>

              <button className="w-100 btn btn-success">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
