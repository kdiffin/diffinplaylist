import localforage from "localforage";
import { nanoid } from "nanoid";

// Very nice!
// I only have 3 comments:
// 1. I would use const everywhere instead of let, to keep your codebase less error prone
// 2. Since you have nanoid, I would use that to generate the id here instead of doing it manually :)
// d. wont do this since itmakes the url look ugly but i can see where ur coming from
// 3. Let your code breath a bit, add a couple of empty lines between your lines/blocks.
// An example for each comments: function createPlaylist
// thx

export async function getPlaylists() {
  let playlists = await localforage.getItem("playlists");
  if (!playlists) playlists = [];

  return playlists;
}

export async function createPlaylist(playlistsName) {
  const id = Math.random().toString(36).substring(2, 9);
  const playlist = {
    id: id,
    songData: [],
    name: playlistsName,
    playlistStyles: "diffin",
  };

  const playlists = await getPlaylists();
  playlists.unshift(playlist);

  await localforage.setItem("playlists", playlists);

  return playlist;
}

export async function getPlaylist(id) {
  let playlists = await localforage.getItem("playlists");
  let playlist = playlists.find((playlist) => playlist.id === id);

  return playlist ?? null;
}

export async function deletePlaylist(id) {
  let playlists = await localforage.getItem("playlists");

  let index = playlists.findIndex((playlist) => playlist.id === id);

  if (index > -1) {
    playlists.splice(index, 1);
    await localforage.setItem("playlists", playlists);
    return true;
  }

  return false;
}

export async function updatePlaylist(id, updates) {
  let playlists = await localforage.getItem("playlists");
  let playlist = playlists.find((playlist) => playlist.id === id);

  if (!playlist) throw new Error("No contact found for", id);

  playlist.songData.push(updates);
  await localforage.setItem("playlists", playlists);

  return playlist;
}

export async function deleteSong(id, request) {
  const formData = await request.formData();
  const songId = formData.get("songId");

  const playlists = await getPlaylists();
  const playlist = await getPlaylist(id);

  const filteredSongData = playlist.songData.filter(
    (song) => song.id !== songId
  );

  const newPlaylist = { ...playlist, songData: filteredSongData };
  const newPlaylists = playlists.filter((playlizt) => playlizt.id !== id);

  const boolList = playlists.map((playlizt) => playlizt.id === id);
  const index = boolList.indexOf(true);

  newPlaylists.splice(index, 0, newPlaylist);

  await localforage.setItem("playlists", newPlaylists);
}

export async function changeSongColor(id, request) {
  //what u need to do is restructure ur playlists
  // so that its an object with 2 values: playlistArray which is just what it is rn
  // and then playlistStyles which is objPlaylistStyles  to assign to the array
  //after u figure that out uh its kinda easy u justadd conditional classnames depending on
  // the value which was passed from the loader function (getplaylists)
  //the kinda tricky part is going to be the scrollbar but i'll figure it out (i did now)
  //i'll probably set the overflow on body and #root to hidden and give the root.jsx div its own overflow
  //also when ur styling dont forget to set fonts diff too
  // (ths was the before code)
  // let playlistWithStyles = playlists.push(objPlaylistStyles);
  // await localforage.setItem("playlists", playlistWithStyles);
  // console.log(playlists);

  //first tho we're making it send a playliststyles to each playlist
  const formData = await request.formData();
  const playlistStyles = formData.get("playlistStyles");

  const objPlaylistStyles = { playlistStyles: playlistStyles };
  const playlists = await getPlaylists();
  const playlist = await getPlaylist(id);

  const playlistWithStyles = Object.assign({}, playlist, objPlaylistStyles);
  const filteredPlaylist = playlists.filter((playlist) => playlist.id !== id);
  const boolList = playlists.map((playlizt) => playlizt.id === id);
  const index = boolList.indexOf(true);

  filteredPlaylist.splice(index, 0, playlistWithStyles);
  await localforage.setItem("playlists", filteredPlaylist);

  // let newPlaylist = { ...playlist, songData: filteredSongData };
  // let newPlaylists = playlists.filter((playlizt) => playlizt.id !== url);

  // let boolList = playlists.map((playlizt) => playlizt.id === url);
  // let index = boolList.indexOf(true);

  // newPlaylists.splice(index, 0, newPlaylist);
}
