import React, { useState } from "react";
import { Form } from "react-router-dom";
import SongForm from "../components/SongForm";

function playlist() {
  const [showForms1, setShowForms] = useState(false);
  function showForms() {
    setShowForms(!showForms1);
  }
  return (
    <div className={"App"}>
      <div className="buttonContainer">
        <h1 className="addNew" onClick={showForms}>
          +
        </h1>
      </div>
      {showForms1 && <SongForm />}
      <section className="songList"></section>
    </div>
  );
}

export default playlist;
