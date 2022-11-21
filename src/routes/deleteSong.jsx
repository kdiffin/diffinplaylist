import localforage from "localforage";
import { redirect } from "react-router-dom";

export async function action({ params, request }) {
  const formData = await request.formData();

  const songId = formData.get("songId");
  console.log(songId);
  const url = params.playlistId;
  let playlists = await localforage.getItem("playlists");
  let playlist = playlists.find((playlist) => playlist.id === url);

  let filteredSongData = playlist.songData.filter((song) => song.id !== songId);

  let newPlaylist = { ...playlist, songData: filteredSongData };
  let newPlaylists = playlists.filter((playlizt) => playlizt.id !== url);
  let boolList = playlists.map((playlizt) => playlizt.id === url);
  let index = boolList.indexOf(true);
  newPlaylists.splice(index, 0, newPlaylist);
  console.log(newPlaylists);

  await localforage.setItem("playlists", newPlaylists);
  return redirect(`/playlists/${url}`);
}
