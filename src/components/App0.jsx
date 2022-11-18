import { useEffect, useState } from "react";
import Song2 from "./Song2";
import Navbar from "./Navbar";
import Popup from "./Popup";
import { nanoid } from "nanoid";
import Song from "./Song";
import SongForm from "./SongForm";
import data from "../data";

function App0(props) {
  const [formData, setFormData] = useState({
    imgLink: "",
    albumTitle: "",
    songLink: "",
    songRating: "",
    songGenre: "",
    description: "",
    artist: "",
    songTitle: "",
  });

  const [songData, setSongData] = useState(
    JSON.parse(localStorage.getItem("songData")) || []
  );

  const [showForms1, setShowForms] = useState(false);
  function showForms() {
    setShowForms(!showForms1);
    console.log(data);
  }

  function togglePgSwitch() {
    setPgToggled(!pgToggled);
    console.log(pgToggled);
  }

  const [pgToggled, setPgToggled] = useState(false);

  const [popUpToggle, setPopUpToggle] = useState(false);

  const songs = songData.map((song, index) => {
    return (
      <Song
        key={nanoid()}
        {...song}
        imgCover={songData[index].imgLink}
        songTitle={songData[index].songTitle}
        songLink={songData[index].songLink}
        songRating={songData[index].songRating}
        songGenre={songData[index].songGenre}
        deleteNote={deleteSong}
        showPopUp={showPopUp}
        id={songData[index].id}
      />
    );
  });

  useEffect(() => {
    localStorage.setItem("songData", JSON.stringify(songData));
  }, [songData]);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
        id: nanoid(),
      };
    });
    console.log(formData);
  }
  console.log(songData);

  function deleteSong(event, songId) {
    event.stopPropagation();
    console.log(songId);
    setSongData((oldSongData) =>
      oldSongData.filter((song) => song.id !== songId)
    );
  }
  const [id1, setId] = useState();

  function showPopUp(event, idz) {
    setPopUpToggle(true);

    const boolList = songData.map((song) => song.id === idz);
    const index = boolList.indexOf(true);
    setId(index);
  }

  function closePopUp() {
    setPopUpToggle(false);
  }

  function handleSubmit(event) {
    if (formData.imgLink.length > 1 && formData.songLink.length > 1) {
      event.preventDefault();
      setSongData((prevSongData) => {
        return [...prevSongData, formData];
      });

      localStorage;
    } else {
      event.preventDefault();

      alert("plz enter correct parameters");
    }
  }

  return (
    <div className={pgToggled ? "Bodyy" : "App"}>
      <Navbar togglePgSwitch={togglePgSwitch} pgToggled={pgToggled} />
      <div className="buttonContainer">
        <h1 className="addNew" onClick={showForms}>
          +
        </h1>
      </div>
      {showForms1 && (
        <SongForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          songRating={formData.songRating}
          songGenre={formData.songGenre}
          imgLink={formData.imgLink}
          songTitle={formData.songTitle}
          songLink={formData.songLink}
          description={formData.description}
          artist={formData.artist}
          albumTitle={formData.albumTitle}
        />
      )}
      {popUpToggle && (
        <Popup
          popUpToggle={() => popUpToggle(songData.id)}
          closePopUp={closePopUp}
          imgLink={songData[id1].imgLink}
          songTitle={songData[id1].songTitle}
          songLink={songData[id1].songLink}
          songRating={songData[id1].songRating}
          songGenre={songData[id1].songGenre}
          description={songData[id1].description}
          artist={songData[id1].artist}
          albumTitle={songData[id1].albumTitle}
        />
      )}

      <section className="songList">{!pgToggled && songs}</section>
    </div>
  );
}

export default App0;
