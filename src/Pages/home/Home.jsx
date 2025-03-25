import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/Config";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Loading from "../../Components/Loading";
import Erroe404 from "../erroe404";
import "./home.css";
import HomeModal from "./modal";
import AllTasksSection from "./AllTasksSection";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };

  // ===============================
  //    FUNCTIONS of Modal
  // ===============================

  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [array, setArray] = useState([]);
  const [subTask, setSubTask] = useState("");
  const [tilte, setTitle] = useState("");

  const closeModal = () => {
    setShowModal(false);
    setTitle("");
    setArray([]);
  };

  const titleInput = (eo) => {
    setTitle(eo.target.value);
  };

  const detailsInput = (eo) => {
    setSubTask(eo.target.value);
  };

  const addBTN = (eo) => {
    eo.preventDefault();

    if (!array.includes(subTask)) {
      array.push(subTask);
    }
    console.log(array);
    setSubTask("");
  };

  const submitBTN = async (eo) => {
    eo.preventDefault();
    setShowLoading(true);
    const taskId = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: tilte,
      detatils: array,
      id: taskId,
      completed: false,
    });
    setShowLoading(false);
    setTitle("");
    setArray([]);

    setShowModal(false);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  if (error) {
    return <Erroe404 />;
  }
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

        <main>
          <h1 style={{ fontSize: "28px" }}>
            <span>Welcome to React Level 2 🔥🔥🔥</span>
          </h1>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue...
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

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

          <main className="home">
            
            {/* SHOW all tasks */}
            <AllTasksSection user={user} />
            {/* Add new task BTN */}
            <section className="mt">
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="add-task-btn"
              >
                Add new task <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {showModal && (
              <HomeModal
                closeModal={closeModal}
                titleInput={titleInput}
                detailsInput={detailsInput}
                addBTN={addBTN}
                submitBTN={submitBTN}
                taskTitle={tilte}
                subTask={subTask}
                array={array}
                showLoading={showLoading}
              />
            )}
            <p
              style={{
                right: showMessage ? "20px" : "-100vw",
              }}
              className="show-message"
            >
              Task added successfully{" "}
              <i className="fa-regular fa-circle-check"></i>
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
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
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
