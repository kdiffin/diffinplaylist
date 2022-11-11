import React from "react";
import { useState, useEffect } from "react";
import "./css-files/Popup.css";
function Popup(props) {
  const [descExists, setDescExists] = useState();

  const [albumTitleExists, setAlbumTitleExists] = useState();
  const [artistExists, setArtistExists] = useState();

  useEffect(function () {
    if (props.description === undefined || props.description.length === 0) {
      setDescExists(false);
    } else {
      setDescExists(true);
    }
    if (props.albumTitle === undefined || props.albumTitle.length === 0) {
      setAlbumTitleExists(false);
    } else {
      setAlbumTitleExists(true);
    }
    if (props.artist === undefined || props.artist.length === 0) {
      setArtistExists(false);
    } else {
      setArtistExists(true);
    }
  }, []);

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={props.closePopUp}>
          X
        </button>
        <img className="popupImg" src={props.imgLink} />
        <h3 className="popupTitle">
          <a href={props.songLink} className="popupTitle">
            {props.songTitle}
          </a>
        </h3>
        <div className="popupStats ">
          <p className="popupcover">
            <span>Rating: {props.songRating}</span> <br />
            <span>Sub-genre: {props.songGenre}</span> <br />
            <br />
            {artistExists && (
              <>
                <span className="desc artist">Artist: {props.artist}</span>
                <br />
                <br />
              </>
            )}
            {albumTitleExists && (
              <>
                <span className="desc">Album name: {props.albumTitle}</span>
                <br />
                <br />
              </>
            )}
            {descExists && (
              <>
                <span className="desc">
                  Description: {<br />} {props.description}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Popup;
