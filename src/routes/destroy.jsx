import { redirect } from "react-router-dom";
import { deletePlaylist } from "../functions";

export async function action({ params }) {
  await deletePlaylist(params.playlistId);
  return redirect("/");
}
