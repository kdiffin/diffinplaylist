import App0 from "../components/App0";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function App() {
  const { playlistId } = useParams();
  console.log(playlistId);
  return (
    <>
      <App0 />
    </>
  );
}

export default App;
