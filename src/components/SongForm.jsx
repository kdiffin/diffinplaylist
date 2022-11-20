import React from "react";
import { Form, useFetcher } from "react-router-dom";

function SongForm(props) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form className="Forms" method="post">
      <input
        type="url"
        placeholder="Song cover (add image url from google)"
        autoComplete="off"
        name="imgLink"
        className="inputThing"
      />
      <input
        type="url"
        placeholder="Album link"
        autoComplete="off"
        name="songLink"
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Song title"
        autoComplete="off"
        name="songTitle"
        className="inputThing"
      />

      <input
        type="text"
        placeholder="Rating"
        autoComplete="off"
        name="songRating"
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Genre"
        autoComplete="off"
        name="songGenre"
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Artist"
        autoComplete="off"
        name="artist"
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Album title"
        autoComplete="off"
        name="albumTitle"
        className="inputThing"
      />
      <textarea
        placeholder="Description"
        autoComplete="off"
        name="description"
        className="inputThing"
      />
      <br />

      <button className="form__submit">Submit</button>
    </fetcher.Form>
  );
}

export default SongForm;
