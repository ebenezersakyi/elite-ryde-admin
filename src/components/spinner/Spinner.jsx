import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
