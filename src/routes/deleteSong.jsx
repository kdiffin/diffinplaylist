import { redirect } from "react-router-dom";
import { deleteSong } from "../functions";

// Also very nice code! Nice way of using actions!
// Only minor comments here:
// 1. I would use const instead of let
// 2. If logging is not necessary, just remove it

export async function action({ params, request }) {
  await deleteSong(params.playlistId, request);

  return redirect(`/playlists/${params.playlistId}`);
}
