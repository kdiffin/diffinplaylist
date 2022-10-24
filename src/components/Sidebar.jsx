import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import "./css-files/Sidebar.css";

function Sidebar(props) {
  const [playlists, setPlaylists] = useState(
    JSON.parse(localStorage.getItem("playlists")) || []
  );

  const [showInputBox, setShowInputBox] = useState(false);

  const [playlistName, setPlaylistName] = useState({
    playlist: "",
  });

  function toggleInputBox() {
    setShowInputBox((oldinputbox) => !oldinputbox);
  }

  function deletePlaylist(event, playlistId) {
    setPlaylists((oldPlaylists) =>
      playlists.filter((playlist) => playlist.id !== playlistId)
    );
  }

  const playlistList = playlists.map((song, index) => {
    return (
      <div className="sidebar__playlist-item">
        <li key={nanoid()}>{playlists[index].playlist}</li>

        <button
          className="sidebar__playlist-item-delete"
          onClick={(event) => deletePlaylist(event, playlists[index].id)}
        >
          <i className="gg-trash"></i>
        </button>
      </div>
    );
  });

  useEffect(
    function () {
      localStorage.setItem("playlists", JSON.stringify(playlists));
    },
    [playlists]
  );

  function handleChange(event) {
    setPlaylistName((oldPlaylistName) => {
      return {
        ...oldPlaylistName,
        [event.target.name]: event.target.value,
        id: nanoid(),
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setPlaylists((prevPlaylists) => {
      return [...prevPlaylists, playlistName];
    });
  }

  return (
    <div className={props.showSidebar}>
      <span>
        <h1 onClick={props.hideSidebarFunc}>x</h1>
      </span>
      <h1>Your playlists:</h1>

      <ol>{playlistList}</ol>

      <div className="addplaylist__container">
        {showInputBox && (
          <form onSubmit={handleSubmit} className="sidebar__form">
            <input
              type="text"
              value={playlistName.playlist}
              onChange={handleChange}
              className="inputThing sidebar__input"
              name="playlist"
            />
            <button type="submit">submit</button>
          </form>
        )}

        <div className="sidebar__newPlaylist_header"></div>
        <h2 onClick={toggleInputBox}> + new playlist</h2>
      </div>
    </div>
  );
}

export default Sidebar;
