import axios from "axios";
import { getHashParams } from "../utils";

const EXPIRATION_TIME = 3600 * 1000; // 1 hour

const setTokenTimestamp = () => {
  window.localStorage.setItem("spotify_token_timestamp", Date.now());
};
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem("spotify_access_token", token);
};
const setLocalRefreshToken = (token) => {
  window.localStorage.setItem("spotify_refresh_token", token);
};
const getTokenTimestamp = () => {
  window.localStorage.getItem("spotify_token_timestamp");
};
const getLocalAccessToken = () => {
  window.localStorage.getItem("spotify_access_token");
};
const getLocalRefreshToken = () => {
  window.localStorage.getItem("spotify_refresh_token");
};

// token refresh
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (err) {
    console.error(err);
  }
};

// get access token off of the query params (called when application starts)
export const getAccessToken = () => {
  const { err, access_token, refresh_token } = getHashParams();
  if (err) {
    console.error(err);
    refreshAccessToken();
  }
  // if token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn("Access token has expired. Currently refreshing.");
    refreshAccessToken();
  }
  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  if(!localRefreshToken || localRefreshToken === "undefined") {
      setLocalRefreshToken(refresh_token);
  }

  if (!localAccessToken || localAccessToken === "undefined") {
      setLocalAccessToken(access_token);
      return access_token;
  }
  return localAccessToken;
};

export const token = getAccessToken();