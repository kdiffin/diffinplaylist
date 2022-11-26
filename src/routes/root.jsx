import {
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPlaylist, getPlaylists } from "../functions";
import { createPlaylist } from "../functions";

// Let your code breath :)

export async function loader({ params }) {
  const playlists = await getPlaylists();
  const playlist = await getPlaylist(params.playlistId);
  return { playlists, playlist };
}

export async function action({ request }) {
  const formData = await request.formData();

  const updates = Object.fromEntries(formData);

  const playlistName = updates.playlist;

  const playlist = await createPlaylist(playlistName);

  return redirect(`/playlists/${playlist.id}`);
}

function root() {
  const navigation = useNavigation();

  const { playlists } = useLoaderData();
  const { playlist } = useLoaderData();
  console.log(playlist);

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
