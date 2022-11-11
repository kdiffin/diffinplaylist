import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import "./css-files/Sidebar.css";

function Sidebar(props) {
  // yo u gonna need to use redux to get the playlists state to the pool
  //then ur gonna map over playlists in the app to create a bunch of new links
  //which r then gonna each have individual songdata

  const [playlists, setPlaylists] = useState(
    JSON.parse(localStorage.getItem("playlists")) || []
  );

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [fullyConfirmDelete, setFullyConfirmDelete] = useState(false);
  const [showInputBox, setShowInputBox] = useState(false);
  const [playlistIndex, setPlaylistIndex] = useState();

  const [playlistName, setPlaylistName] = useState({
    playlist: "",
  });

  function toggleInputBox() {
    setShowInputBox((oldinputbox) => !oldinputbox);
  }

  function deletePlaylist(event, playlistId) {
    event.stopPropagation();
    setPlaylists((oldPlaylists) =>
      playlists.filter((playlist) => playlist.id !== playlistId)
    );

    setFullyConfirmDelete(false);
    console.log(playlists);
  }

  function toggleFullyConfirmDelete() {
    if (showConfirmDelete === true) {
      setFullyConfirmDelete(true);
    } else {
      setFullyConfirmDelete(false);
    }
    console.log(fullyConfirmDelete);
  }

  function getPlaylistId(event, playlistId) {
    const boolList = playlists.map((playlist) => playlist.id === playlistId);
    const index = boolList.indexOf(true);
    setPlaylistIndex(index);
    console.log(playlistIndex);
    toggleFullyConfirmDelete();
    setShowConfirmDelete(true);
  }

  const PlaylistList = playlists.map((song, index) => {
    return (
      <div className="sidebar__playlist-item" key={nanoid()}>
        <Link to={`/${song.playlist}`} style={{ textDecoration: "none" }}>
          <li key={nanoid()}>{playlists[index].playlist}</li>
        </Link>
        <button
          className="sidebar__playlist-item-delete"
          onClick={(event) => getPlaylistId(event, playlists[index].id)}
          id={playlists[index].id}
        >
          <div className="gg-trash_container">
            <i className="gg-trash"></i>
          </div>
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
    <>
      <div className={props.showSidebar}>
        <span>
          <h1 onClick={props.hideSidebarFunc}>x</h1>
        </span>
        <h1>Your playlists:</h1>

        <ol>{PlaylistList}</ol>

        <div className="addplaylist__container">
          {showInputBox && (
            <form onSubmit={handleSubmit} className="sidebar__form">
              <input
                type="text"
                value={playlistName.playlist}
                onChange={handleChange}
                className="inputThing sidebar__input"
                autoComplete="off"
                name="playlist"
              />
              <button type="submit">submit</button>
            </form>
          )}

          <div className="sidebar__newPlaylist_header"></div>
          <h2 onClick={toggleInputBox}> + new playlist</h2>
        </div>
      </div>
      {fullyConfirmDelete ? (
        <div className="sidebar__deleteConfirmation">
          <p>Are you sure you want to delete this playlist?</p>
          <div className="sidebar__deleteConfirmation-buttons">
            <button
              className="deleteButton"
              id="firstbuttonz"
              onClick={(event) =>
                deletePlaylist(event, playlists[playlistIndex].id)
              }
            >
              <i className="gg-trash"></i>
            </button>
            <button
              className="deleteButton"
              onClick={() => setFullyConfirmDelete(!fullyConfirmDelete)}
            >
              <h2 style={{ textDecoration: "none" }}>x</h2>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}{" "}
    </>
  );
}

export default Sidebar;
