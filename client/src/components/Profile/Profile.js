import React from "react";
import { Router } from "@reach/router";
import User from "../User/User";
import Track from "../Track/Track"

export default function Profile() {
  return (
    <div>
      <Router primary={false}>
        <User path="/" />
        <Track path="track/:trackId" />
      </Router>
    </div>
  );
}
