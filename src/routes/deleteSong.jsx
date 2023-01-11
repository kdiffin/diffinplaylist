import localforage from "localforage";
import { redirect } from "react-router-dom";

// Also very nice code! Nice way of using actions!
// Only minor comments here:
// 1. I would use const instead of let
// 2. If logging is not necessary, just remove it

export async function action({ params, request }) {
  const formData = await request.formData();

  const songId = formData.get("songId");
  const url = params.playlistId;
  let playlists = await localforage.getItem("playlists");
  let playlist = playlists.find((playlist) => playlist.id === url);

  let filteredSongData = playlist.songData.filter((song) => song.id !== songId);

  let newPlaylist = { ...playlist, songData: filteredSongData };
  let newPlaylists = playlists.filter((playlizt) => playlizt.id !== url);
  let boolList = playlists.map((playlizt) => playlizt.id === url);
  let index = boolList.indexOf(true);
  newPlaylists.splice(index, 0, newPlaylist);

  await localforage.setItem("playlists", newPlaylists);
  return redirect(`/playlists/${url}`);
}
