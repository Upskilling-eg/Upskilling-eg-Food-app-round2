import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forgotpass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Reset/Request",
        data
      );
      // setTimeout(
      //   () => toast.success("login success", { position: "top-right" }),
      //   100
      // );

      navigate("/reset-pass");
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-right" });
      // console.log(error.response.data.message);
    }
  };
  return (
    <div className="Auth-container vh-100">
      <ToastContainer />

      <div className="overlay vh-100 container-fluid">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5">
            <div className="login bg-white rounded-3 px-5 py-4">
              <div className="logo-cont text-center mb-3">
                <img src={logo} alt="food-logo" className="w-50" />
              </div>
              <h5 className="fw-bolder">Forgot Your Password?</h5>
              <p className="text-muted">
                No worries! Please enter your email and we will send a password
                reset link
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-column my-2">
                  <div className="input-group mb-1">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your E-mail"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid Email",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="m-0 alert alert-danger p-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button className="w-100 btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
