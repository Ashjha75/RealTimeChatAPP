import React, { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SuccessMessage from "../../Utils/SuccessMessage";
import ErrorMessage from "../../Utils/ErrorMessage";
import Loader from "../../Utils/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    successMessage: "",
    errorMessage: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const Schema = yup.object().shape({
    userName: yup
      .string()
      .min(2, "UserName must be of atleast 2 characters")
      .required("UserName is required"),
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
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Schema),
  });
  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const res = await axios.post("/register", {
        userName: data.userName,
        password: data.password,
        email: data.email,
      });
      setMessage({
        successMessage: res.data.message,
        errorMessage: "",
      });
      reset();
      navigate("/login", {
        state: { successMessage: "User created successfully, Please login." },
      });
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
    <>
      <div className="bg-blue-100 h-screen flex items-center">
        <div className="w-96 mx-auto rounded-xl shadow-lg bg-white ">
          <div className="p-5">
            <div className="font-semibold text-3xl my-5 text-center">
              Sign up
            </div>
            <div className="text-center text-gray-500 text-xl my-5">
              Create a free account with your email.
            </div>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="userName"
                {...register("userName")}
                className={`block w-full rounded-md p-3 mt-3 border outline-none focus:ring-2 ${
                  errors.userName
                    ? "focus:ring-red-400"
                    : "focus:ring-violet-200"
                }`}
              />
              <div className="text-red-500 text-xs">
                {errors.userName?.message}
              </div>
              <input
                type="text"
                placeholder="email"
                {...register("email")}
                className={`block w-full rounded-md p-3 mt-3 border outline-none focus:ring-2 ${
                  errors.userName
                    ? "focus:ring-red-400"
                    : "focus:ring-violet-200"
                }`}
              />
              <div className="text-red-500 text-xs ">
                {errors.email?.message}
              </div>
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
              <button className="text-white block w-full rounded-full p-2 mt-5 bg-blue-600 font-semibold text-lg ">
                Register
              </button>
            </form>
          </div>
          <div className="bg-slate-200 py-5 mt-2 text-lg pl-4">
            Have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Log in
            </Link>
          </div>
        </div>
      </div>
      {message.successMessage && (
        <SuccessMessage
          message={message.successMessage}
          onClose={handleCloseMessage}
        />
      )}
      {message.errorMessage && (
        <ErrorMessage
          message={message.errorMessage}
          onClose={handleCloseMessage}
        />
      )}
      {loader && <Loader />}
    </>
  );
};

export default Register;
