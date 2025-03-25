import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./loading.css";

const Loading = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="loading"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Loading;
