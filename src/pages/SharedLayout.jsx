import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function SharedLayout() {
  const [pgToggled, setPgToggled] = useState(false);
  function togglePgSwitch() {
    setPgToggled(!pgToggled);
    console.log(pgToggled);
  }

  return (
    <div>
      <Navbar togglePgSwitch={togglePgSwitch} pgToggled={pgToggled} />
      <Outlet />
    </div>
  );
}

export default SharedLayout;
