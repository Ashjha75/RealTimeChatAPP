import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane, FaArrowLeft } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../assets/styles/animations.css";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import axios from "axios";
const ForgotPass = () => {
  const navigate = useNavigate();
  const [compo, setcompo] = useState(1);
  const [isPasswordVisible, setIsPasswordVisible] = useState([false, false]);

  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please fill valid email")
      .required("Email is required"),
  });
  const codeSchema = yup.object().shape({
    code: yup
      .string()
      .min(6, "Code is not valid")
      .max(6, "Code is not valid")
      .required("Code is required"),
  });
  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(4, "Password must be atleast of 4 characters")
      .max(16)
      .required("Password is required"),
    confirmPass: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      compo == 1 ? emailSchema : compo == 2 ? codeSchema : passwordSchema
    ),
  });

  const onSubmit = async () => {
    setcompo(2);
    reset();
  };
  const onSubmit2 = async () => {
    setcompo(3);
    reset();
  };
  const onSubmit3 = async () => {
    reset();
  };
  async function submitHandler(e) {
    try {
      e.preventDefault();
      await axios.post("/login", {
        password: formInput.password,
        email: formInput.email,
      });
      setFormInput({
        userName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  const backHandler = () => {
    navigate(-1);
    setcompo(1);
  };
  const handlePasswordVisibility = (index) => {
    setIsPasswordVisible((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  return (
    <div className="bg-blue-100 h-screen flex items-center">
      {compo === 1 ? (
        <div className="w-96 mx-auto rounded-xl shadow-lg bg-white ">
          <div className="p-5">
            <div className="font-semibold text-2xl my-5 text-center">
              Forgot Password
            </div>
            <div className="text-center text-gray-500  my-5">
              Enter your registered email to recover your password
            </div>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="email"
                {...register("email")}
                className="block w-full rounded-md p-3  mb-2 border outline-none focus:ring focus:ring-violet-200"
              />
              <div className="text-red-500 text-xs ">
                {errors.email?.message}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="text-white flex group   justify-center items-center w-full rounded-full p-2 mt-5 bg-gray-500 font-semibold text-lg "
                  onClick={backHandler}
                >
                  <FaArrowLeft className="mr-4 group-hover:animate-pulse " />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex group text-white justify-center items-center w-full rounded-full p-2 mt-5 bg-blue-600 font-semibold text-lg "
                >
                  Send Code{" "}
                  <FaTelegramPlane className="ml-2 group-hover:animate-bounce 5 rotate-6 " />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : compo === 2 ? (
        <div className="w-96 mx-auto rounded-xl shadow-lg bg-white ">
          <div className="p-5">
            <div className="font-semibold text-2xl my-5 text-center">
              Forgot Password
            </div>
            <div className="text-center text-gray-500  my-5">
              Code has been sent to your registered email . Please Verify
            </div>
            <form className="" onSubmit={handleSubmit(onSubmit2)}>
              <input
                type="number"
                placeholder="Code"
                {...register("code")}
                className="block w-full rounded-md p-3  mb-2 border outline-none focus:ring focus:ring-violet-200"
              />
              <div className="text-red-500 text-xs ">
                {errors.code?.message}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="text-white flex group   justify-center items-center w-full rounded-full p-2 mt-5 bg-gray-500 font-semibold text-lg "
                  onClick={() => {
                    setcompo(1);
                    reset();
                  }}
                >
                  <FaArrowLeft className="mr-4 group-hover:animate-pulse " />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex group text-white justify-center items-center w-full rounded-full p-2 mt-5 bg-blue-600 font-semibold text-lg "
                >
                  Verify{" "}
                  <FaTelegramPlane className="ml-2 group-hover:animate-bounce 5 rotate-6 " />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-96 mx-auto rounded-xl shadow-lg bg-white ">
          <div className="p-5">
            <div className="font-semibold text-2xl my-5 text-center">
              Forgot Password
            </div>
            <div className="text-center text-gray-500  my-5">
              Please create a new password for your account
            </div>
            <form className="" onSubmit={handleSubmit(onSubmit3)}>
              <div
                className={`group flex focus:ring-2 border outline-none  w-full rounded-md  mt-3 ${
                  errors.userName
                    ? "focus-within:ring-2 ring-red-400"
                    : "focus-within:ring-2 ring-violet-200"
                }`}
              >
                <input
                  type={isPasswordVisible[0] ? "text" : "password"}
                  placeholder="password"
                  autoComplete="on"
                  {...register("password")}
                  className={`w-[92%] h-[90%] p-3 rounded-l-md  border-none outline-none `}
                />
                {isPasswordVisible[0] ? (
                  <BsFillEyeSlashFill
                    className="text-blue-500 text-xl cursor-pointer h-auto"
                    onClick={() => handlePasswordVisibility(0)}
                  />
                ) : (
                  <BsFillEyeFill
                    className="text-blue-500 text-xl cursor-pointer h-auto"
                    onClick={() => handlePasswordVisibility(0)}
                  />
                )}
              </div>
              <div className="text-red-500 text-xs ">
                {errors.password?.message}
              </div>
              <div
                className={`group flex focus:ring-2 border outline-none  w-full rounded-md  mt-3 ${
                  errors.userName
                    ? "focus-within:ring-2 ring-red-400"
                    : "focus-within:ring-2 ring-violet-200"
                }`}
              >
                <input
                  type={isPasswordVisible[1] ? "text" : "password"}
                  placeholder="Confirm password"
                  autoComplete="on"
                  {...register("confirmPass")}
                  className={`w-[92%] h-[90%] p-3 rounded-l-md  border-none outline-none `}
                />
                {isPasswordVisible[1] ? (
                  <BsFillEyeSlashFill
                    className="text-blue-500 text-xl cursor-pointer h-auto"
                    onClick={() => handlePasswordVisibility(1)}
                  />
                ) : (
                  <BsFillEyeFill
                    className="text-blue-500 text-xl cursor-pointer h-auto"
                    onClick={() => handlePasswordVisibility(1)}
                  />
                )}
              </div>
              <div className="text-red-500 text-xs ">
                {errors.confirmPass?.message}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="text-white flex group   justify-center items-center w-full rounded-full p-2 mt-5 bg-green-500 font-semibold text-lg tracking-wider "
                  onClick={() => {
                    setcompo(2);
                    reset();
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex group text-white justify-center items-center w-full rounded-full p-2 mt-5 bg-blue-600 font-semibold text-lg tracking-wider "
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPass;
