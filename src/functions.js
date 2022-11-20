import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getPlaylists() {
  let playlists = await localforage.getItem("playlists");
  console.log(playlists);
  if (!playlists) playlists = [];

  return playlists;
}

export async function createPlaylist() {
  let id = Math.random().toString(36).substring(2, 9);
  let playlist = { id, songData: [] };
  let playlists = await getPlaylists();
  playlists.unshift(playlist);
  await localforage.setItem("playlists", playlists);
  console.log(playlists);
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
