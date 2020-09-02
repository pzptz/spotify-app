import React from "react";
import "./loginScreen.css"

const LOGIN_URI =
  process.env.NODE_ENV !== "production" ? "http://localhost:8888/login" : "";

const LoginScreen = () => {
  return (
    <div className="loginscreen__div">
      <h1>Spotify Profile</h1>
      <a className="loginscreen__button" href={LOGIN_URI}>Log In</a>
    </div>
  );
};

export default LoginScreen;
