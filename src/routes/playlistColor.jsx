import localforage from "localforage";
import { redirect } from "react-router-dom";

export async function action({ params, request }) {
  console.log("hey");
  const url = params.playlistId;
  return redirect(`/playlists/${url}`);
}
