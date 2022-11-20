import { Link, Outlet, useLoaderData, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPlaylists } from "../functions";
import { createPlaylist } from "../functions";

export async function loader() {
  const playlists = await getPlaylists();
  return { playlists };
}

export async function baction() {
  await createPlaylist();
}

function root() {
  const navigation = useNavigation();

  const { playlists } = useLoaderData();

  return (
    <>
      <Navbar playlists={playlists} />
      <div className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  );
}

export default root;
