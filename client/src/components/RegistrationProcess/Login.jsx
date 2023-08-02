import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import SuccessMessage from "../../Utils/SuccessMessage";
import ErrorMessage from "../../Utils/ErrorMessage";
import { useForm } from "react-hook-form";
import Loader from "../../Utils/Loader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

import axios from "axios";
const Login = () => {
  const location = useLocation();

  const [message, setMessage] = useState({
    successMessage: location.state?.successMessage,
    errorMessage: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const Schema = yup.object().shape({
    email: yup
      .string()
      .email("Please fill valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be atleast of 4 characters")
      .max(16)
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      await axios.post("/login", {
        password: data.password,
        email: data.email,
      });
      setMessage({ successMessage: res.data.message, errorMessage: "" });
      reset();
    } catch (err) {
      setMessage({
        successMessage: "",
        errorMessage: err.response.data.message,
      });
    } finally {
      setLoader(false);
    }
  };
  const handleCloseMessage = () => {
    setMessage({
      successMessage: "",
      errorMessage: "",
    });
  };

  return (
    <div className="bg-blue-100 h-screen flex items-center">
      <div className="w-96 mx-auto rounded-xl shadow-lg bg-white ">
        <div className="p-5">
          <div className="font-semibold text-2xl my-5 text-center">Sign in</div>

          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="email"
              {...register("email")}
              className={`block w-full rounded-md p-3 mt-3 border outline-none focus:ring-2 ${
                errors.userName ? "focus:ring-red-400" : "focus:ring-violet-200"
              }`}
            />
            <div className="text-red-500 text-xs ">{errors.email?.message}</div>
            <div
              className={`group flex focus:ring-2 border outline-none  w-full rounded-md  mt-3 ${
                errors.userName
                  ? "focus-within:ring-2 ring-red-400"
                  : "focus-within:ring-2 ring-violet-200"
              }`}
            >
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="password"
                {...register("password")}
                className={`w-[92%] h-[90%] p-3 rounded-l-md  border-none outline-none `}
              />
              {isPasswordVisible ? (
                <BsFillEyeSlashFill
                  className="text-blue-500 text-xl cursor-pointer h-auto"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <BsFillEyeFill
                  className="text-blue-500 text-xl cursor-pointer h-auto"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </div>
            <div className="text-red-500 text-xs ">
              {errors.password?.message}
            </div>
            <div className="mt-1">
              <Link
                to="/forgot-pass"
                className="text-blue-600 hover:underline ml-2 tracking-wider "
              >
                Forgot Password?
              </Link>
            </div>
            <button className="text-white tracking-wider  block w-full rounded-full p-2 mt-5 bg-blue-600 font-semibold text-lg ">
              Sign in
            </button>
          </form>
          {loader && <Loader />}
          {message.successMessage ? (
            <SuccessMessage
              className=""
              message={message.successMessage}
              onClose={handleCloseMessage}
            />
          ) : null}
          {message.errorMessage && (
            <ErrorMessage
              message={message.errorMessage}
              onClose={handleCloseMessage}
            />
          )}
        </div>
        <div className="bg-slate-200 py-5 mt-2 text-lg pl-4">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
