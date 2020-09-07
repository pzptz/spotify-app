import React, { Component } from "react";
import "./User.css";
import { getUserInfo } from "../../spotify";

class User extends Component {
  state = {
    user: null,
    followedArtists: null,
    playlists: null,
    topTracks: null,
  };

  async getData() {
    const { user, followedArtists, playlists, topTracks } = await getUserInfo();
  }

  render() {
    return <div>User</div>;
  }
}

export default User;
