// path: client/src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const doLogout = () => {
    logout();
    nav("/");
  };
  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">WEEK 4 SSIGNMEN</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/create">Create</Link>
            <button className="link-btn" onClick={doLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
