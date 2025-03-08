import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Config";
import Moment from "react-moment";
import { deleteUser } from "firebase/auth";

const Profile = () => {
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
  if (error) {
    return (
      <div>
        <h2>Error: {error}</h2>
      </div>
    );
  }
  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile</title>

          <style type="text/css">{` 
        main{
          flex-direction: column;
          align-items: flex-start;
  
    width: fit-content;
    margin: auto;
        }
        
        `}</style>
        </Helmet>

        <Header />

        <main>
          <h6>Email: {user.email}</h6>
          <h6>UserName: {user.displayName}</h6>

          <h6>
            Last Sign-in :{" "}
            <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
          </h6>

          <h6>
            Account Created :{" "}
            <Moment fromNow date={user.metadata.creationTime} />
          </h6>
          <button
            onClick={() => {
              const Navigate = useNavigate;
              deleteUser(user)
                .then(() => {
                  console.log("user delete");
                  Navigate("/");
                })
                .catch((error) => {
                  console.log(error.message);
                  // ...
                });
            }}
            className="delete"
          >
            Delete account
          </button>
        </main>
        <Footer />
      </>
    );
  }
};

export default Profile;
