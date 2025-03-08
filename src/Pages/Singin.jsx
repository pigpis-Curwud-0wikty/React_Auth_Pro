import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/Config";
import { useState } from "react";
import "./signin.css";

const Signin = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [showform, setShowform] = useState("");
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [resetPass, setResetPass] = useState("");
  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        <form className={`forgot-password ${showform}`}>
          <div
            onClick={() => {
              setShowform("");
            }}
            className="close"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          <input
            onChange={(eo) => {
              setResetPass(eo.target.value);
            }}
            required
            placeholder=" E-mail : "
            type="email"
          />
          <button
            onClick={(eo) => {
              eo.preventDefault();
              sendPasswordResetEmail(auth, resetPass)
                .then(() => {
                  console.log("send email");
                  setShowSendEmail(true);
                })
                .catch((error) => {
                  const errorCode = error.code;
                  console.log(errorCode);
                });
            }}
          >
            Reset email
          </button>
          {showSendEmail && (
            <p className="check-email">
              Please check your email to reset your password.
            </p>
          )}
        </form>
        <form>
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
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log(user);
                  Navigate("/");
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;

                  setHasError(true);

                  switch (errorCode) {
                    case "auth/invalid-email":
                      setFirebaseError("Wrong Email");
                      break;

                    case "auth/user-not-found":
                      setFirebaseError("Wrong Email");
                      break;

                    case "auth/wrong-password":
                      setFirebaseError("Wrong Password");
                      break;

                    case "auth/too-many-requests":
                      setFirebaseError(
                        "Too many requests, please try aganin later"
                      );
                      break;

                    default:
                      setFirebaseError("Please check your email & password");
                      break;
                  }
                });
            }}
          >
            Sign in
          </button>
          <p className="account">
            Don't hava an account <Link to="/signup"> Sign-up</Link>
          </p>

          <p
            onClick={() => {
              setShowform("show-forgot-password");
            }}
            className="forgot-pass"
          >
            Forgot Password ?
          </p>
          {hasError && <h5 className="danger">{firebaseError}</h5>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
