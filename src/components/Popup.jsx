import React from "react";
import { useState, useEffect } from "react";
import "./Popup.css";
function Popup(props) {
  const [descExists, setDescExists] = useState();
  useEffect(function descExistz() {
    if (props.description === undefined) {
      setDescExists(false);
    } else {
      setDescExists(true);
    }
    console.log(descExists);
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
        <div className="popupStats">
          <p className="popupcover">
            Rating: {props.songRating} <br />
            Sub-genre: {props.songGenre} <br />
            <br />
            {descExists && (
              <span className="desc">Description: {props.description}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Popup;
