import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/images/logo.png";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("userName", data.userName);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };

  const onSubmit = async (data) => {
    console.log(data);
    let registerFormData = appendToFormData(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Register",
        registerFormData
      );
      toast.success("registeration done");
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message, { position: "top-right" });
    }
  };

  return (
    <div className="Auth-container vh-100">
      <ToastContainer />

      <div className="overlay vh-100 container-fluid">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-7">
            <div className="login bg-white rounded-3 px-5 py-4">
              <div className="logo-cont text-center mb-3">
                <img src={logo} alt="food-logo" className="w-50" />
              </div>
              <h5> Register </h5>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
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
                  </div>
                  <div className="col-md-6">
                    <div className="flex-column my-2">
                      <div className="input-group mb-1">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your user name"
                          {...register("userName", {
                            required: "userName is required",
                          })}
                        />
                      </div>
                      {errors.userName && (
                        <p className="m-0 alert alert-danger p-1">
                          {errors.userName.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="flex-column my-2">
                      <div className="input-group mb-1">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your country"
                          {...register("country", {
                            required: "country is required",
                          })}
                        />
                      </div>
                      {errors.country && (
                        <p className="m-0 alert alert-danger p-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="flex-column my-2">
                      <div className="input-group mb-1">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your phoneNumber"
                          {...register("phoneNumber", {
                            required: "phoneNumber is required",
                          })}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="m-0 alert alert-danger p-1">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="flex-column my-2">
                      <div className="input-group mb-1">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-key" aria-hidden="true"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter your password"
                          {...register("password", {
                            required: "password is required",
                          })}
                        />
                      </div>
                      {errors.password && (
                        <p className="m-0 alert alert-danger p-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="flex-column my-2">
                      <div className="input-group mb-1">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-key" aria-hidden="true"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter your confirm password"
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="flex-column my-2">
                      <div className="input-group mb-1">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-key" aria-hidden="true"></i>
                        </span>
                        <input
                          type="file"
                          className="form-control"
                          {...register("profileImage")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-100 btn btn-success">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
