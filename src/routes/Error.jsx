import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="error">
      <h1>404 page not found</h1>
      <p>wat u trynna do :p</p>
      <Link to="/" className="">
        Back home
      </Link>
    </div>
  );
}

export default Error;
