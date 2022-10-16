import React from "react";

function Form(props) {
  return (
    <form className="Forms" onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder="Song cover"
        onChange={props.handleChange}
        name="imgLink"
        value={props.imgLink}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Song link"
        onChange={props.handleChange}
        name="songLink"
        value={props.songLink}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Song title"
        onChange={props.handleChange}
        name="songTitle"
        value={props.songTitle}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Rating"
        onChange={props.handleChange}
        name="songRating"
        value={props.songRating}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Genre"
        onChange={props.handleChange}
        name="songGenre"
        value={props.songGenre}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Artist"
        onChange={props.handleChange}
        name="artist"
        value={props.artist}
        className="inputThing"
      />
      <input
        type="text"
        placeholder="Album title"
        onChange={props.handleChange}
        name="albumTitle"
        value={props.albumTitle}
        className="inputThing"
      />
      <textarea
        value={props.description}
        placeholder="Description"
        onChange={props.handleChange}
        name="description"
        className="inputThing"
      />
      <br />

      <button>Submit</button>
    </form>
  );
}

export default Form;
