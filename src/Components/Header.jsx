import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./header.css";
import "../theme.css";
import ThemeContexttt from "../Context/ThemeContext";
import { auth } from "../firebase/Config";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const { theme, changeTheme } = useContext(ThemeContexttt);
  return (
    <div className="myheader">
      <header className="hide-when-mobile ali">
        <h1>
          <Link to="/">c4a.dev</Link>
        </h1>
        {/* <button
          onClick={() => {
            changeTheme(theme == "Light" ? "Dark" : "Light");
          }}
          className="theme-btn"
        >
          {theme}
        </button> */}

        <i
          onClick={() => {
            changeTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            changeTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">
          <li className="main-list lang">
            <p>language</p>

            <ul className="lang-box">
              <li dir="rtl">
                <p> العربية</p>
                {false && <i className="fa-solid fa-check"></i>}
              </li>

              <li>
                <p>English</p>

                {true && <i className="fa-solid fa-check"></i>}
              </li>
              <li>
                <p>French</p>

                {false && <i className="fa-solid fa-check"></i>}
              </li>
            </ul>
          </li>

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                Sign-in
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                Sign-up
              </NavLink>
            </li>
          )}

          {user && (
            <li
              className=""
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("sign out successful");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              <NavLink className="main-link" to="/signup">
                Sign-out
              </NavLink>
            </li>
          )}
          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
                About
              </NavLink>
            </li>
          )}
          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
                Profile
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
