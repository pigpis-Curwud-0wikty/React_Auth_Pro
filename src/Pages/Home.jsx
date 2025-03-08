import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../Components/Header";
import MainContent from "../Components/MainContent";
import Footer from "../Components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Loading from "../Components/Loading";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="HOMEEEEEEEEEEEE" />
        </Helmet>
        <Header />

        {user && <main>Welcome: {user.displayName} 🧡</main>}

        {!user && (
          <main>
            <p className="pls">
              Please{" "}
              <Link style={{ fontSize: "30px" }} to="/signin">
                sign in
              </Link>{" "}
              to continue... 🧡
            </p>
          </main>
        )}

        <Footer />
      </>
    );
  }
  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName} <span>🧡</span>
            </p>
          </main>

          <Footer />
        </>
      );
    }

    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
            <style type="text/css">{` 
        main{
          flex-direction: column;
          align-items: flex-start;
          width: fit-content;
          margin: auto;
        }`}</style>
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName} <span>🧡</span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendEmailVerification(auth.currentUser).then(() => {
                  console.log("Email verification sent!");
                  // ...
                });
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
