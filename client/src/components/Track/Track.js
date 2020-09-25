import React, { Component } from "react";
import PropTypes from "prop-types";
import FeatureChart from "../FeatureChart/FeatureChart";
import {
  formatDuration,
  getYear,
  parsePitchClass,
  catchErrors,
} from "../../utils";
import { getTrackInfo } from "../../spotify";
import Loader from "../Loader/Loader";
import "./Track.css";

class Track extends Component {
    static propTypes = {
      trackId: PropTypes.string,
    };
  
    state = {
      track: null,
      audioAnalysis: null,
      audioFeatures: null,
    };
  
    componentDidMount() {
      catchErrors(this.getData());
    }
  
    async getData() {
      const { trackId } = this.props;
      const { track, audioAnalysis, audioFeatures } = await getTrackInfo(trackId);
      this.setState({ track, audioAnalysis, audioFeatures });
    }
  
    render() {
      const { track, audioAnalysis, audioFeatures } = this.state;
  
      return (
        <React.Fragment>
          {track && audioFeatures ? (
            <div className="track__main">
              <div className="track__container">
                <div className="track__info">
                  <div className="track__artwork">
                    <img src={track.album.images[0].url} alt="Album Artwork" />
                  </div>
                  <h1 className="track__title">{track.name}</h1>
                  <h2 className="track__artistName">
                    {track.artists &&
                      track.artists.map(({ name }, i) => (
                        <span key={i}>
                          {name}
                          {track.artists.length > 0 &&
                          i === track.artists.length - 1
                            ? ""
                            : ","}
                          &nbsp;
                        </span>
                      ))}
                  </h2>
                  <h3 className="track__album">
                    <a
                      href={track.album.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {track.album.name}
                    </a>{" "}
                    &middot; {getYear(track.album.release_date)}
                  </h3>
                  <a
                    className="track__playButton"
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Play on Spotify
                  </a>
                </div>
              </div>
              {audioFeatures && audioAnalysis && (
                <div className="track__audioFeatures">
                  <div className="track__features">
                    <div className="track__feature">
                      <div className="track__featureText">
                        {formatDuration(audioFeatures.duration_ms)}
                      </div>
                      <p className="track__featureLabel">Duration</p>
                    </div>
                    {/* feature */}
                    <div className="track__feature">
                      <div className="track__featureText">
                        {parsePitchClass(audioFeatures.key)}
                      </div>
                      <p className="track__featureLabel">Key</p>
                    </div>
                    {/* feature */}
                    <div className="track__feature">
                      <div className="track__featureText">
                        {audioFeatures.mode === 1 ? "Major" : "Minor"}
                      </div>
                      <p className="track__featureLabel">Modality</p>
                    </div>
                    {/* feature */}
                    <div className="track__feature">
                      <div className="track__featureText">
                        {audioFeatures.time_signature}
                      </div>
                      <p className="track__featureLabel">Time Signature</p>
                    </div>
                    {/* feature */}
                    <div className="track__feature">
                      <div className="track__featureText">
                        {Math.round(audioFeatures.tempo)}
                      </div>
                      <p className="track__featureLabel">Tempo (BPM)</p>
                    </div>
                    {/* feature */}
                    <div className="track__feature">
                      <div className="track__featureText">
                        {track.popularity}%
                      </div>
                      <p className="track__featureLabel">Popularity</p>
                    </div>
                    {/* feature */}
                    <div className="track__feature">
                      <div className="track__featureText">
                        {audioAnalysis.bars.length}
                      </div>
                      <p className="track__featureLabel">Bars</p>
                    </div>
                    {/* feature */}
                    <div className="track__feature">
                      <div className="track__featureText">
                        {audioAnalysis.beats.length}
                      </div>
                      <p className="track__featureLabel">Beats</p>
                    </div>
                    {/* feature */}
                    <div className="track__feature">
                      <div className="track__featureText">
                        {audioAnalysis.sections.length}
                      </div>
                      <p className="track__featureLabel">Sections</p>
                    </div>
                    {/* feature */}
                    <div className="track__feature">
                      <div className="track__featureText">
                        {audioAnalysis.segments.length}
                      </div>
                      <p className="track__featureLabel">Segments</p>
                    </div>
                    {/* feature */}
                  </div>
                  {/* features */}
  
                  <FeatureChart features={audioFeatures} type="" />
                </div> // audiofeatures
              )}
            </div>
          ) : (
            <Loader />
          )}
        </React.Fragment>
      );
    }
  }
  
  export default Track;