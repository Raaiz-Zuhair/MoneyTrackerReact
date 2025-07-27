import React from "react";

export const Button = ({ children, bg, onClick, type = "button" }) => {
  return (
    <button className={`${bg} text-white px-6 py-2 rounded-sm flex justify-center items-center font-medium gap-1` }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
