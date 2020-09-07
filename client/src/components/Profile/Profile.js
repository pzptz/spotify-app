import React from "react";
import { Router } from "@reach/router";
import User from "../User/User";

export default function Profile() {
  return (
    <div>
      <Router primary={false}>
        <User path="/" />
      </Router>
    </div>
  );
}
