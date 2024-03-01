import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/images/logo.png";

export default function ResetPass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Reset",
        data
      );
      setTimeout(
        () => toast.success("reset success", { position: "top-right" }),
        100
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-right" });
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
              <h5> Reset Password</h5>
              <p className="text-muted">
                Please Enter Your Otp or Check Your Inbox
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
                <div className="flex-column my-2">
                  <div className="input-group mb-1">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="OTP"
                      {...register("seed", {
                        required: "OTP is required",
                      })}
                    />
                  </div>
                  {errors.seed && (
                    <p className="m-0 alert alert-danger p-1">
                      {errors.seed.message}
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
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="m-0 alert alert-danger p-1">
                      {errors.password.message}
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
                      {...register("confirmPassword", {
                        required: "confirmPassword is required",
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="m-0 alert alert-danger p-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button className="w-100 btn btn-success">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
