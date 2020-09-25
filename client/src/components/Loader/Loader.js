import React from "react";
import "./Loader.css";

const Loader = () => (
  <div className="loader__container">
    <div className="loader__bars">
      <div className="loader__bar_250ms" />
      <div className="loader__bar_715ms" />
      <div className="loader__bar_475ms" />
      <div className="loader__bar_25ms" />
      <div className="loader__bar_190ms" />
    </div>
  </div>
);

export default Loader;
