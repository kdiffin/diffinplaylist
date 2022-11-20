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

export async function loader({ params }) {
  return getPlaylist(params.playlistId);
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates);
  await updatePlaylist(params.playlistId, updates);
  return redirect(`/playlists/${params.playlistId}`);
}

function playlist() {
  const playlist = useLoaderData();
  const fetcher = useFetcher();
  function showPopUp(event, idz) {
    setPopUpToggle(true);

    const boolList = songData.map((song) => song.id === idz);
    const index = boolList.indexOf(true);
    setSongIndex(index);
  }

  console.log(playlist);

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
      />
    );
  });

  const [showForms1, setShowForms] = useState(false);
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
    </div>
  );
}

export default playlist;
