import React from "react";
import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="error">
      <h1>Uh, Oh! </h1>
      <h2>an unexpected error has occured</h2>
      <i style={{ fontSize: "40px", marginBottom: "30px" }}>
        {error.statusText || error.message}
      </i>
      <Link to="/" style={{ color: "rgb(161, 84, 21)" }}>
        Back home
      </Link>
    </div>
  );
}

export default Error;
