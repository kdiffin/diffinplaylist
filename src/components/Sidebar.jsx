import React, { useEffect } from "react";
import { useState } from "react";
import {
  Form,
  Link,
  NavLink,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { nanoid } from "nanoid";
import "./css-files/Sidebar.css";

function Sidebar(props) {
  // yo u gonna need to use redux to get the playlists state to the pool
  //then ur gonna map over playlists in the app to create a bunch of new links
  //which r then gonna each have individual songdata

  const playlists = props.playlists;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [fullyConfirmDelete, setFullyConfirmDelete] = useState(false);
  const [showInputBox, setShowInputBox] = useState(false);
  const [playlistIndex, setPlaylistIndex] = useState();

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

  function getPlaylistId() {
    toggleFullyConfirmDelete();
    setShowConfirmDelete(true);
  }

  useEffect(
    function () {
      localStorage.setItem("playlists", JSON.stringify(playlists));
    },
    [playlists]
  );

  const actionurl = `playlists/${useParams().playlistId}/destroy`;
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
        {playlists.length ? (
          <ol>
            {playlists.map((playlist) => (
              <div className="sidebar__playlist-item" key={nanoid()}>
                <li>
                  <NavLink
                    to={`/playlists/${playlist.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active "
                        : isPending
                        ? "pending "
                        : "sidebar__playlist-NavLink"
                    }
                  >
                    <Link to={`/playlists/${playlist.id}`}>
                      {playlist.name ? <>{playlist.name}</> : <i>No Name</i>}
                    </Link>
                  </NavLink>
                </li>
                <button
                  className="sidebar__playlist-item-delete"
                  onClick={getPlaylistId}
                >
                  <div className="gg-trash_container">
                    <i className="gg-trash"></i>
                  </div>
                </button>
              </div>
            ))}
          </ol>
        ) : (
          <h2>
            <i>no playlists</i>
          </h2>
        )}
        <div className="addplaylist__container">
          {showInputBox && (
            <Form method="post" className="sidebar__form">
              <input
                type="text"
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
      {fullyConfirmDelete ? (
        <div className="sidebar__deleteConfirmation">
          <p>Are you sure you want to delete this playlist?</p>
          <i
            style={{
              fontSize: "18px",
              marginBottom: "20px",
              marginTop: "-10px",
            }}
          >
            (You have to click on the playlist before deleting it)
          </i>
          <div className="sidebar__deleteConfirmation-buttons">
            <Form method="post" action={actionurl}>
              <button className="deleteButton firstbuttonz" type="submit">
                <i className="gg-trash"></i>
              </button>
            </Form>
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
      )}
    </>
  );
}

export default Sidebar;
