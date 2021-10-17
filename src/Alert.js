import React, { useEffect } from "react";

const Alert = ({ type, msg, removeActive }) => {
  useEffect(() => {
    setTimeout(() => {
      removeActive();
      console.log("Removed");
      return clearTimeout(removeActive);
    }, 2000);
  }, [type]);
  return <h2 className={`alert alert-${type}`}>{msg}</h2>;
};

export default Alert;
