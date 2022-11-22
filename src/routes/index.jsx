import { useEffect } from "react";
import { useState } from "react";
import diffinsPlaylistData from "../diffinsPlaylistData";
import Popup from "../components/Popup";
import Song from "../components/Song";
import { nanoid } from "nanoid";
export default function Index() {
  const [songData, setSongData] = useState(diffinsPlaylistData);
  console.log(songData);
  const [popUpToggle, setPopUpToggle] = useState(false);

  function showPopUp(event, idz) {
    setPopUpToggle(true);

    const boolList = songData.map((song) => song.id === idz);
    const index = boolList.indexOf(true);
    setSongIndex(index);
  }

  function closePopUp() {
    setPopUpToggle(false);
  }
  const [songIndex, setSongIndex] = useState();

  const songs = songData.map((song, index) => {
    return (
      <Song
        // As mentioned it in the previous commit regarding "playlist.js"
        // Using nanoid for the key is not ideal
        // key={nanoid()}
        key={songData[index].id}
        {...song}
        imgCover={songData[index].imgLink}
        songTitle={songData[index].songTitle}
        songLink={songData[index].songLink}
        songRating={songData[index].songRating}
        songGenre={songData[index].songGenre}
        showPopUp={showPopUp}
        id={songData[index].id}
        // This can be shortened
        indexPage
      />
    );
  });

  return (
    <div className="Index">
      {/* Use ternaries to avoid bugs :) */}
      {popUpToggle ? (
        <Popup
          popUpToggle={() => popUpToggle(songData.id)}
          closePopUp={closePopUp}
          imgLink={songData[songIndex].imgLink}
          songTitle={songData[songIndex].songTitle}
          songLink={songData[songIndex].songLink}
          songRating={songData[songIndex].songRating}
          songGenre={songData[songIndex].songGenre}
          description={songData[songIndex].description}
          artist={songData[songIndex].artist}
          albumTitle={songData[songIndex].albumTitle}
          // This can be shortened
          indexPage
        />
      ) : null}

      <section className="songList">{songs}</section>
    </div>
  );
}
