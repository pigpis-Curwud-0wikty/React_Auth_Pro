import React, { useContext } from "react";
import "./footer.css";
import ThemeContexttt from "../Context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContexttt);
  return (
    <div className="myfooter">
      <footer className={`ali ${theme}`}>
        Designed and developed by Ziad
        <span>🧡</span>
      </footer>
    </div>
  );
};

export default Footer;
