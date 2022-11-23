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
  console.log(inputtedData);
  const inputtedDataId = { id: nanoid() };
  // Be careful with Object.assign, as it mutates the original object,
  // which could lead to some

  // If you want to create a new object you should either use spread operator,
  // or define the base object as a new object:
  /*
    1. With Spread:
      const inputtedDataWithId = { ...inputtedData, ...inputtedDataId };

    2. Using Object.assign:
      const inputtedDataWithId = Object.assign({}, inputtedData, inputtedDataId);
  */
  const inputtedDataWithId = Object.assign(inputtedData, inputtedDataId);
  await updatePlaylist(params.playlistId, inputtedDataWithId);
}

function playlist() {
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [showForms1, setShowForms] = useState(false);
  const [songIndex, setSongIndex] = useState();

  const playlist = useLoaderData();

  function showPopUp(event, idz) {
    setPopUpToggle(true);

    const boolList = playlist.songData.map((song) => song.id === idz);
    const index = boolList.indexOf(true);
    setSongIndex(index);
  }

  // This could be (probably) extracted into the functions.js
  // Try to use const whenever you can
  async function deleteSong(event, songId, url) {
    let playlists = await localforage.getItem("playlists");
    let playlist = playlists.find((playlist) => playlist.id === url);

    // You should probably guard against "playlist" being undefined,
    // as find will return (undefined | T)
    let filteredSongData = playlist.songData.filter(
      (song) => song.id !== songId
    );

    let newPlaylist = { ...playlist, songData: filteredSongData };
    let newPlaylists = playlists.filter((playlizt) => playlizt.id !== url);
    // You can use concat instead of push:
    /*
      1.
        const filteredPlaylist = playlists.filter((playlizt) => playlizt.id !== url);
        newPlaylists.concat({ ...playlist, songData: filteredSongData })

      2.
        const newPlaylist = [
          ...playlists.filter((playlizt) => playlizt.id !== url),
          { ...playlist, songData: filteredSongData },
        ]
    */
    newPlaylists.push(newPlaylist);

    await localforage.setItem("playlists", newPlaylists);
    return redirect(`/playlists/${playlist.url}`);
  }

  const songs = playlist.songData.map((song, index) => {
    return (
      <Song
        // This is very bad practice, you are silencing the warning/error below.
        // In the end it is the same as not defining a key.
        // key={nanoid()}
        // You should be using a uniyue key instead:
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
        deleteSong={deleteSong}
      />
    );
  });

  function showForms() {
    setShowForms(!showForms1);
  }

  return (
    // Curly brackets arenot needed for strings
    <div className="App">
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
