import App0 from "../components/App0";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPlaylists } from "../functions";

export async function loader() {
  const playlists = await getPlaylists();
  console.log(playlists);
  return { playlists };
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
