import { useEffect, useState } from "react";
import Song2 from "./components/Song2";
import Navbar from "./components/Navbar";
import Popup from "./components/Popup";
import { nanoid } from "nanoid";
import Song from "./components/Song";
import Form from "./components/Form";
import data from "./data";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
