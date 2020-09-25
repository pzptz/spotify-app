import React from "react";
import { Link } from "@reach/router";
import { formatDuration } from "../../utils";
import PropTypes from "prop-types";
import "./TrackItem.css";

const TrackItem = ({ track }) => (
    <li>
      <Link className="trackItem__trackContainer" to={`/track/${track.id}`}>
        <div>
          <div className="trackItem__artwork">
            {track.album.images.length && (
              <img src={track.album.images[2].url} alt="Album Artwork" />
            )}
          </div>
        </div>
        <div className="trackItem__meta">
          <span className="trackItem__left">
            {track.name && <span className="trackItem__name">{track.name}</span>}
            {track.artists && track.album && (
              <div className="trackItem__album">
                {track.artists &&
                  track.artists.map(({ name }, i) => (
                    <span key={i}>
                      {name}
                      {track.artists.length > 0 && i === track.artists.length - 1
                        ? ""
                        : ","}
                      &nbsp;
                    </span>
                  ))}
                &nbsp;&middot;&nbsp;&nbsp;
                {track.album.name}
              </div>
            )}
          </span>
          <span className="trackItem__right">
            {track.duration_ms && (
              <span className="trackItem__duration">
                {formatDuration(track.duration_ms)}
              </span>
            )}
          </span>
        </div>
      </Link>
    </li>
  );

TrackItem.propTypes = {
  track: PropTypes.object.isRequired,
};

export default TrackItem;