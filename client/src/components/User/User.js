import React, { Component } from "react";
import { catchErrors } from "../../utils";
import { getUserInfo, logout } from "../../spotify";
import IconUser from "../../icons/user";
import TrackItem from "../TrackItem/TrackItem";
import Loader from "../Loader/Loader";
import "./User.css";

class User extends Component {

  state = {
    user: null,
    followedArtists: null,
    playlists: null,
    topTracks: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { user, followedArtists, playlists, topTracks } = await getUserInfo();
    this.setState({ user, followedArtists, playlists, topTracks });
    console.log(followedArtists);
  }

  render() {
    const { user, followedArtists, playlists, topTracks } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;
    return (
      <React.Fragment>
        {user ? (
          <div className="user__main">
            <div className="user__header">
              <div className="user__avatar">
                {user.images.length > 0 ? (
                  <img src={user.images[0].url} alt="avatar" />
                ) : (
                  <div className="user__noavatar">
                    <IconUser />
                  </div>
                )}
              </div>
              <a
                className="user__username"
                href={user.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1 className="user__name">{user.display_name}</h1>
              </a>
              <div className="user__stats">
                <div className="user__stat">
                  <div className="user__number">{user.followers.total}</div>
                  <p className="user__numLablel">Followers</p>
                </div>
                {followedArtists ? (
                  <div className="user__stat">
                    <div className="user__number">
                      {followedArtists.artists.items.length}
                    </div>
                    <p className="user__numLablel">Following</p>
                  </div>
                ) : (
                  <div className="user__stat">
                     <div>{console.log(followedArtists)}</div>
                    <div className="user__number">0</div>
                    <p className="user__numLablel">Following</p>
                  </div>
                )}
                {totalPlaylists && (
                  <div className="user__stat">
                    <div className="user__number">{totalPlaylists}</div>
                    <p className="user__numLablel">Playlists</p>
                  </div>
                )}
              </div>
              <a className="user__logoutbutton" onClick={logout}>
                Logout
              </a>
            </div>
            <div className="user__tracklist">
              <div className="user__tracklistHeading">
                <h3>Top Tracks of All Time</h3>
                {/* <Link className="user__moreButton" to="/tracks">
                  See More
                </Link> */}
              </div>
              <ul>
                {topTracks ? (
                  topTracks.items.map((track, i) => (
                    <TrackItem track={track} key={i} />
                  ))
                ) : (
                  <Loader />
                )}
              </ul>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default User;
