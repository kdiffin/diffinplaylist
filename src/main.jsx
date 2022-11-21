import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Error from "./routes/Error";
import Playlist, {
  loader as playlistLoader,
  action as playlistAction,
} from "./routes/playlist";
import { action as destroyAction } from "./routes/destroy";
import { action as deleteSongAction } from "./routes/deleteSong";

import Index from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
    action: rootAction,

    children: [
      {
        errorElement: <Error />,
        children: [
          {
            path: "playlists/:playlistId",
            element: <Playlist />,
            loader: playlistLoader,
            action: playlistAction,
            children: [
              {
                path: "/playlists/:playlistId/deleteSong",
                action: deleteSongAction,
              },
            ],
          },
          {
            path: "/playlists/:playlistId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
      { index: true, element: <Index /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
