import React, { useState } from "react";
import {
  Form,
  redirect,
  useFetcher,
  useLoaderData,
  useParams,
} from "react-router-dom";
import Song from "../components/Song";
import SongForm from "../components/SongForm";
import { getPlaylist, updatePlaylist } from "../functions";
import { nanoid } from "nanoid";
import Popup from "../components/Popup";
import localforage from "localforage";

export async function loader({ params }) {
  return getPlaylist(params.playlistId);
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const inputtedData = Object.fromEntries(formData);

  const inputtedDataId = { id: nanoid() };

  // Be careful with Object.assign, as it mutates the original object,
  // which could lead to some

  // If you want to create a new object you should either use spread operator,
  // or define the base object as a new object:
  /*
    1. With Spread:
    
    2. Using Object.assign:
    const inputtedDataWithId = Object.assign({}, inputtedData, inputtedDataId);
    const inputtedDataWithId = { ...inputtedData, ...inputtedDataId };
  */
  const inputtedDataWithId = Object.assign({}, inputtedData, inputtedDataId);
  await updatePlaylist(params.playlistId, inputtedDataWithId);
}

function playlist() {
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [showForms1, setShowForms] = useState(false);
  const [songIndex, setSongIndex] = useState();

  const playlist = useLoaderData();
  console.log(playlist);

  function showPopUp(event, idz) {
    setPopUpToggle(true);

    const boolList = playlist.songData.map((song) => song.id === idz);
    const index = boolList.indexOf(true);
    setSongIndex(index);
  }

  const songs = playlist.songData.map((song, index) => {
    return (
      <Song
        key={playlist.songData[index].id}
        {...song}
        imgCover={playlist.songData[index].imgLink}
        songTitle={playlist.songData[index].songTitle}
        songLink={playlist.songData[index].songLink}
        songRating={playlist.songData[index].songRating}
        songGenre={playlist.songData[index].songGenre}
        showPopUp={showPopUp}
        id={playlist.songData[index].id}
        indexPage={false}
        coverText={
          playlist.playlistStyles === "diffin" ? (
            "coverDiffin"
          ) : playlist.playlistStyles === "black" ? (
            "coverBlack"
          ) : playlist.playlistStyles === "light" ? (
            "coverLight"
          ) : playlist.playlistStyles === "cream" ? (
            "coverCream"
          ) : playlist.playlistStyles === "blue" ? (
            "coverBlue"
          ) : (
            <></>
          )
        }
      />
    );
  });

  function showForms() {
    setShowForms(!showForms1);
  }

  return (
    // Curly brackets arenot needed for strings
    <div
      className={`App ${
        playlist.playlistStyles === "diffin" ? (
          "diffin"
        ) : playlist.playlistStyles === "black" ? (
          "black"
        ) : playlist.playlistStyles === "light" ? (
          "light"
        ) : playlist.playlistStyles === "cream" ? (
          "cream"
        ) : playlist.playlistStyles === "blue" ? (
          "blue"
        ) : (
          <></>
        )
      }`}
    >
      <div className="buttonContainer">
        <h1 className="addNew" onClick={showForms}>
          +
        </h1>
      </div>
      {/* 
        Whenever you could, use ternary to avoid some unexpected values to be shown
        Little article to read about it: https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx
      */}
      {showForms1 ? <SongForm playlist={playlist} /> : null}
      <section className="songList">{songs}</section>
      {popUpToggle ? (
        <Popup
          popUpToggle={() => popUpToggle(songData.id)}
          closePopUp={() => setPopUpToggle(false)}
          imgLink={playlist.songData[songIndex].imgLink}
          songTitle={playlist.songData[songIndex].songTitle}
          songLink={playlist.songData[songIndex].songLink}
          songRating={playlist.songData[songIndex].songRating}
          songGenre={playlist.songData[songIndex].songGenre}
          description={playlist.songData[songIndex].description}
          artist={playlist.songData[songIndex].artist}
          albumTitle={playlist.songData[songIndex].albumTitle}
          // indexPage={true}
          // If it's a boolean value and tru, you can shorten it by just adding the field:
          indexPage
        />
      ) : null}
    </div>
  );
}

export default playlist;
