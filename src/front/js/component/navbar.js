import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            Authentication system with Python Flask and React.js
          </span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <Link to="/signup">
              <button className="btn btn-primary me-1 ">Signup</button>
            </Link>
          ) : (
            ""
          )}

          {!store.token ? (
            <Link to="/login">
              <button className="btn btn-primary">Log in</button>
            </Link>
          ) : (
            <button
              onClick={() => actions.logout()}
              className="btn btn-primary"
            >
              Log out
            </button>
          )}
{!store.token ? (
	""):(
          <Link to="/private">
            <button className="btn btn-primary ms-1 ">This is Private</button>
          </Link>)
}

        </div>
      </div>
    </nav>
  );
};
