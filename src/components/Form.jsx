import React from "react";

function Form(props) {
  return (
    <form className="Forms" onSubmit={props.handleSubmit}>
      <input
        type="url"
        placeholder="Song cover (add image url from google)"
        autoComplete="off"
        onChange={props.handleChange}
        name="imgLink"
        value={props.imgLink}
        className="inputThing"
      />
      <input
        type="url"
        placeholder="Album link"
        autoComplete="off"
        onChange={props.handleChange}
        name="songLink"
        value={props.songLink}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Song title"
        autoComplete="off"
        onChange={props.handleChange}
        name="songTitle"
        value={props.songTitle}
        className="inputThing"
      />

      <input
        type="text"
        placeholder="Rating"
        autoComplete="off"
        onChange={props.handleChange}
        name="songRating"
        value={props.songRating}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Genre"
        autoComplete="off"
        onChange={props.handleChange}
        name="songGenre"
        value={props.songGenre}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Artist"
        autoComplete="off"
        onChange={props.handleChange}
        name="artist"
        value={props.artist}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Album title"
        autoComplete="off"
        onChange={props.handleChange}
        name="albumTitle"
        value={props.albumTitle}
        className="inputThing"
      />
      <textarea
        value={props.description}
        placeholder="Description"
        autoComplete="off"
        onChange={props.handleChange}
        name="description"
        className="inputThing"
      />
      <br />

      <button className="form__submit">Submit</button>
    </form>
  );
}

export default Form;
