import React from "react";
import ReactDOM from "react-dom/client";
import Root, { loader as rootLoader } from "./routes/root";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./routes/Error";
import Playlist from "./routes/playlist";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            path: "playlists/:playlistId",
            element: <Playlist />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
