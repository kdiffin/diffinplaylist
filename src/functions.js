import localforage from "localforage";
import { nanoid } from "nanoid";

// Very nice!
// I only have 3 comments:
// 1. I would use const everywhere instead of let, to keep your codebase less error prone
// 2. Since you have nanoid, I would use that to generate the id here instead of doing it manually :)
// 3. Let your code breath a bit, add a couple of empty lines between your lines/blocks.
// An example for each comments: function createPlaylist

export async function getPlaylists() {
  let playlists = await localforage.getItem("playlists");
  if (!playlists) playlists = [];

  return playlists;
}

export async function createPlaylist(playlistsName) {
  const playlist = { id: nanoid(), songData: [], name: playlistsName };

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
