import React, { Component } from "react";
import loader from "./loader.gif";

const Loading = () => {
  return (
    <div className="text-center">
      <img src={loader} alt="loading_image" />
    </div>
  );
};

export default Loading;
