import { Link, Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPlaylists } from "../functions";
import { createPlaylist } from "../functions";

export async function loader() {
  const playlists = await getPlaylists();
  return { playlists };
}
export async function action() {
  await createPlaylist();
}

function root() {
  const { playlists } = useLoaderData();

  return (
    <>
      <Navbar playlists={playlists} />
      <Outlet />
    </>
  );
}

export default root;
