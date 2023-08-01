import React from "react";
import { FaCircleExclamation } from "react-icons/fa6";
const ErrorMessage = (props) => {
  return (
    <div
      className=" fixed inset-0 flex justify-center items-center h-screen bg-[rgba(0,0,0,0.6)] overflow-hidden"
      onClick={props.onClose}
    >
      <div
        id="card"
        className="child w-96 h-40  bg-white border-2 border-red-600 rounded-md"
      >
        <div className="text-red-500 mb-5 text-lg flex justify-center items-center gap-3 my-5 font-semibold">
          <FaCircleExclamation className="text-3xl" />
          {props.message}
        </div>
        <div className="flex fixed -bottom-10 inset-0  justify-center items-center mt-5">
          <button
            className="bg-red-500 w-52 py-3  text-white border-4 border-blue-200 rounded-md"
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
