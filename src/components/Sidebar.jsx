import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
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

  return (
    <>
      <div className={props.showSidebar}>
        <span>
          <h1
            onClick={props.hideSidebarFunc}
            style={{
              width: "30%",
              marginBottom: "0px",
              marginLeft: "20px",
              cursor: "pointer",
            }}
          >
            x
          </h1>
        </span>
        <h1>Your playlists:</h1>

        <ol>
          <li>
            <Link to={`/playlists/1`}>Your Name</Link>
          </li>
          <li>
            <Link to={`/playlists/2`}>Your Friend</Link>
          </li>
        </ol>

        <div className="addplaylist__container">
          {showInputBox && (
            <Form method="post" className="sidebar__form">
              <input
                type="text"
                value={playlistName.playlist}
                className="inputThing sidebar__input"
                autoComplete="off"
                name="playlist"
              />
              <button type="submit">submit</button>
            </Form>
          )}

          <div className="sidebar__newPlaylist_header"></div>
          <h2 onClick={toggleInputBox}> + new playlist</h2>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
