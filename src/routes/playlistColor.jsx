import { redirect } from "react-router-dom";
import { changeSongColor } from "../functions";

export async function action({ params, request }) {
  const url = params.playlistId;
  await changeSongColor(url, request);

  return redirect(`/playlists/${url}`);
}
