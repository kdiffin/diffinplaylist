import React from "react";
import { useState, useEffect } from "react";
import "./css-files/Popup.css";
function Popup(props) {
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
            {props.artist && (
              <>
                <span className="desc artist">Artist: {props.artist}</span>
                <br />
                <br />
              </>
            )}
            {props.albumTitle && (
              <>
                <span className="desc">Album name: {props.albumTitle}</span>
                <br />
                <br />
              </>
            )}
            {props.description && (
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
