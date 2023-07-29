import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SuccessMessage from "../../Utils/SuccessMessage";
import Loader from "../../Utils/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
const Register = () => {
  const [successMessage, setSuccessMessage] = useState("");
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
      setSuccessMessage(res.data.message);
      reset();
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoader(false);
    }
  };
  const handleCloseSuccessMessage = () => {
    setSuccessMessage("");
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
                autoComplete="off"
                {...register("userName")}
                className={`block w-full rounded-md p-3 mt-3 border outline-none focus:ring-2 ${
                  errors.userName
                    ? "focus:ring-red-400"
                    : "focus:ring-violet-200"
                }`}
              />
              <div className="text-red-500 text-sm ">
                {errors.userName?.message}
              </div>
              <input
                type="text"
                placeholder="email"
                autoComplete="off"
                {...register("email")}
                className={`block w-full rounded-md p-3 mt-3 border outline-none focus:ring-2 ${
                  errors.userName
                    ? "focus:ring-red-400"
                    : "focus:ring-violet-200"
                }`}
              />
              <div className="text-red-500 text-sm ">
                {errors.email?.message}
              </div>
              <input
                type="password"
                placeholder="password"
                {...register("password")}
                className={`block w-full rounded-md p-3 mt-3 border outline-none focus:ring-2 ${
                  errors.userName
                    ? "focus:ring-red-400"
                    : "focus:ring-violet-200"
                }`}
              />
              <div className="text-red-500 text-sm ">
                {errors.password?.message}
              </div>
              <button className="text-white block w-full rounded-full p-2 mt-5 bg-blue-600 font-semibold text-lg ">
                Register
              </button>
            </form>
          </div>
          <div className="bg-slate-200 py-5 mt-2 text-lg pl-4">
            Have an account?{" "}
            <a href="#" className="text-blue-600 font-semibold">
              Log in
            </a>
          </div>
        </div>
      </div>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={handleCloseSuccessMessage}
        />
      )}
      {loader && <Loader />}
    </>
  );
};

export default Register;
