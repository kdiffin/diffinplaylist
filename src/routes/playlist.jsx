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

  async function deleteSong(event, songId, url) {
    let playlists = await localforage.getItem("playlists");
    let playlist = playlists.find((playlist) => playlist.id === url);

    let filteredSongData = playlist.songData.filter(
      (song) => song.id !== songId
    );

    let newPlaylist = { ...playlist, songData: filteredSongData };
    let newPlaylists = playlists.filter((playlizt) => playlizt.id !== url);
    newPlaylists.push(newPlaylist);

    await localforage.setItem("playlists", newPlaylists);
    return redirect(`/playlists/${playlist.url}`);
  }

  const songs = playlist.songData.map((song, index) => {
    return (
      <Song
        key={nanoid()}
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
    <div className={"App"}>
      <div className="buttonContainer">
        <h1 className="addNew" onClick={showForms}>
          +
        </h1>
      </div>
      {showForms1 && <SongForm playlist={playlist} />}
      <section className="songList">{songs}</section>
      {popUpToggle && (
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
          indexPage={true}
        />
      )}
    </div>
  );
}

export default playlist;
