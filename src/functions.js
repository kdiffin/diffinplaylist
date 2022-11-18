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
  let playlist = { id };
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
