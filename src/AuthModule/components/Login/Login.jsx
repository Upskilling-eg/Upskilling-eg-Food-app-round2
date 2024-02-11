import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ saveLoginData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let response = await axios.post(
      "https://upskilling-egypt.com:443/api/v1/Users/Login",
      data
    );
    localStorage.setItem("token", response.data.token);
    saveLoginData();
    navigate("/dashboard");
  };

  return (
    <div className="Auth-container vh-100">
      <div className="overlay vh-100 container-fluid">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5">
            <div className="login bg-white rounded-3 px-5 py-4">
              <div className="logo-cont text-center mb-3">
                <img src={logo} alt="food-logo" className="w-50" />
              </div>
              <h3>Log In</h3>
              <p className="text-muted">
                Welcome Back! Please enter your details
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
                    <p className="m-0 text-danger p-1">
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
                      type="password"
                      className="form-control"
                      placeholder="Enter your Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="m-0 text-danger p-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-end my-2">
                  <a className="text-success">Forget password</a>
                </div>
                <button className="w-100 btn btn-success">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
