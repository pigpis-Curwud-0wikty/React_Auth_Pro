import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../Components/Header";
import MainContent from "../Components/MainContent";
import Footer from "../Components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Config";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

const About = () => {
  const [user, loading, error] = useAuthState(auth);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      Navigate("/");
    }

    if (user) {
      if (!user.emailVerified) {
        Navigate("/");
      }
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>About Page</title>
            <meta name="description" content="CSSSSSSSSS" />
          </Helmet>
          <Header />
          <MainContent pageName="ABOUT page" />
          <Footer />
        </>
      );
    }
  }
};

export default About;
