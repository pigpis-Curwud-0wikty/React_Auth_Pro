import React, { useContext } from "react";
import "./footer.css";
import ThemeContexttt from "../Context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContexttt);
  return (
    <div className="myfooter">
      <footer className={`ali ${theme}`}>
        Designed and developed by Ziad
        <span>
          <i className="fa-solid fa-heart"></i>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
