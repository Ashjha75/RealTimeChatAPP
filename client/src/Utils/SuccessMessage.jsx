import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const SuccessMessage = (props) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center h-screen bg-[rgba(0,0,0,0.6)] overflow-hidden"
      onClick={props.onClose}
    >
      <div className="child w-96 h-40 bg-white border-2 border-blue-600 rounded-md">
        <div className="text-green-500 mb-5 text-lg flex justify-center items-center gap-3 my-5 font-semibold">
          <FaCircleCheck className="text-3xl" />
          {props.message}
        </div>
        <div className="flex fixed -bottom-10 inset-0 justify-center items-center mt-5">
          <button
            className="bg-blue-600 w-52 py-3 text-white border-4 border-blue-200 rounded-md"
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
