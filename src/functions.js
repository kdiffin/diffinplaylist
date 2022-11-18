import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getPlaylists() {
  let playlists = await localforage.getItem("playlists");
  console.log(playlists);
  if (!playlists) playlists = [];

  return playlists;
}
