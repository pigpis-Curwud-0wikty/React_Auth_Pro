import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { auth } from "../firebase/Config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Signup = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />
          <main>
            <p>We send you an email to verify your Account</p>
            <button className="delete">Send again</button>
          </main>
          <Footer />
        </div>
      );
    }
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Header />

        <main>
          <form>
            <p style={{ fontSize: "23px", marginBottom: "22px" }}>
              Create a new account <span>🧡</span>{" "}
            </p>
            <input
              onChange={(eo) => {
                setUsername(eo.target.value);
              }}
              required
              placeholder=" userName : "
              type="username"
            />
            <input
              onChange={(eo) => {
                setEmail(eo.target.value);
              }}
              required
              placeholder=" E-mail : "
              type="email"
            />
            <input
              onChange={(eo) => {
                setPassword(eo.target.value);
              }}
              required
              placeholder=" Password : "
              type="password"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();

                createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                      displayName: username,
                    })
                      .then(() => {
                        Navigate("/");
                      })
                      .catch((error) => {
                        console.log(error.code);
                      });
                  })
                  .catch((error) => {
                    const errorCode = error.code;

                    sethasError(true);

                    switch (errorCode) {
                      case "auth/invalid-email":
                        setfirebaseError("Wrong Email");
                        break;

                      case "auth/user-not-found":
                        setfirebaseError("Wrong Email");
                        break;

                      case "auth/wrong-password":
                        setfirebaseError("Wrong Password");
                        break;

                      case "auth/too-many-requests":
                        setfirebaseError(
                          "Too many requests, please try aganin later"
                        );
                        break;

                      default:
                        setfirebaseError("Please check your email & password");
                        break;
                    }
                    // ..
                  });
              }}
            >
              Sign up
            </button>
            <p className="account">
              Already hava an account <Link to="/signin"> Sign-in</Link>
            </p>
            {hasError && <h5 className="danger">{firebaseError}</h5>}
          </form>
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;
