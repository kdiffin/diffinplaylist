import React from "react";
import { Link, useRouteError } from "react-router-dom";

// Only 2 suggestions here:
// 1. You might consider adding classes to all of your components instead of inline styling just to stay consistant,
// 2. Remove logging if not needed :)

function Error() {
  const error = useRouteError();
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
