import localforage from "localforage";
import React, { useState } from "react";
import { Form, Link, useLocation, useParams } from "react-router-dom";
import { getPlaylist } from "../functions";
import Sidebar from "./Sidebar";

export default function Navbar(props) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  function showSidebarFunc() {
    setShowSidebar(true);
  }

  function hideSidebarFunc() {
    setShowSidebar(false);
  }

  const actionurl = `/playlists/${useParams().playlistId}/playlistColor`;
  const isHomePage = useLocation().pathname === "/";

  return (
    <>
      <Sidebar
        hideSidebarFunc={hideSidebarFunc}
        showSidebar={showSidebar ? "sidebar-show" : "sidebar"}
        playlists={props.playlists}
      />
      <nav>
        <div className="gg-menu-container" onClick={showSidebarFunc}>
          <i className="gg-menu"></i>
        </div>
        <Link to="/" className="nav-header-link">
          <div className="nav-header">
            <span>
              <i className="gg-music-speaker"></i>
            </span>
            <h3 className="nav--title">
              {props.playlistName ? props.playlistName : "DIFFINS PLAYLIST"}
            </h3>
          </div>
        </Link>

        <div
          className="switchColor"
          onClick={() => setShowColorMenu((prevColorMenu) => !prevColorMenu)}
        >
          <div className="color-picker--container">
            <i className="gg-color-bucket"></i>
          </div>
        </div>
        {!isHomePage ? (
          showColorMenu ? (
            <Form
              className="navbar__colorPickerFormLocal"
              action={actionurl}
              method="post"
            >
              <span className="colorPickerFormSwitcher">
                {" "}
                <i className="gg-globe-alt"></i>
                <div className="toggler--slider">
                  <div className="toggler--slider--circle"></div>
                </div>
                <i className="gg-music-note"></i>
              </span>
              <span className="colorPickerFormLanguage">
                {" "}
                <button className="buttonEn" type="button">
                  EN
                </button>{" "}
                <span
                  style={{
                    fontWeight: 600,
                  }}
                >
                  |
                </span>{" "}
                <button type="button">AZ</button>
              </span>
              <button type="submit" name="playlistStyles" value="black">
                <div className="buttonCircle dark-theme"></div>Abyss Black
              </button>
              <button type="submit" name="playlistStyles" value="light">
                <div className="buttonCircle light-theme"></div>Flashbang Light
              </button>
              <button type="submit" name="playlistStyles" value="cream">
                <div className="buttonCircle cream-theme"></div>Cream
              </button>

              <button type="submit" name="playlistStyles" value="diffin">
                <div className="buttonCircle diffinplaylist"></div>Diffin's
                Choice
              </button>
              <button type="submit" name="playlistStyles" value="blue">
                <div className="buttonCircle blue-theme"></div>Baby Blue
              </button>
            </Form>
          ) : null
        ) : null}
        <div className="navbar__colorPickerFormGlobal"></div>
      </nav>
    </>
  );
}
