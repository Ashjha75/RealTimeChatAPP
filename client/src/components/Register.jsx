import React, { useState } from "react";
import axios from "axios";
const Register = () => {
  const [formInput, setFormInput] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    const formName = e.target.name;
    const formValue = e.target.value;

    setFormInput((preValue) => {
      if (formName === "userName") {
        return {
          userName: formValue,
          email: preValue.email,
          password: preValue.password,
        };
      } else if (formName === "password") {
        return {
          userName: preValue.userName,
          email: preValue.email,
          password: formValue,
        };
      } else if (formName === "email") {
        return {
          userName: preValue.userName,
          email: formValue,
          password: preValue.password,
        };
      }
    });
  };
  async function submitHandler(e) {
    try {
      e.preventDefault();
      await axios.post("/register", {
        userName: formInput.userName,
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
  return (
    <div className="bg-blue-100 h-screen flex items-center">
      <div className="w-96 mx-auto rounded-xl shadow-lg bg-white ">
        <div className="p-5">
          <div className="font-semibold text-3xl my-5 text-center">Sign up</div>
          <div className="text-center text-gray-500 text-xl my-5">
            Create a free account with your email.
          </div>
          <form className="" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="userName"
              name="userName"
              autoComplete="off"
              className="block w-full rounded-md p-3 mb-2 border outline-none focus:ring focus:ring-violet-200"
              onChange={inputHandler}
              value={formInput.userName}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              autoComplete="off"
              className="block w-full rounded-md p-3  mb-2 border outline-none focus:ring focus:ring-violet-200"
              onChange={inputHandler}
              value={formInput.email}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              className="block w-full rounded-md p-3 mb-2 border outline-none focus:ring focus:ring-violet-200"
              onChange={inputHandler}
              value={formInput.password}
            />
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
  );
};

export default Register;
