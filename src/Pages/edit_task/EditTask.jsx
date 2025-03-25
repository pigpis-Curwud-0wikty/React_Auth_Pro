import "./edit-task.css";

import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import EditTitle from "./editTitle";
import Loading from "Components/Loading";
import SubTasksSection from "./subTasksSection";
import BtnSection from "./btnSection";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/Config";
import { useParams } from "react-router-dom";
import { arrayRemove, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);

  let { stringId } = useParams();
  const navigate = useNavigate();

  // ======================
  // 1- Title Section
  // ======================
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, stringId), {
      title: eo.target.value,
    });
  };

  // ======================
  // 2- Sub-Tasks Section
  // ======================

  const completeCheckBox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: false,
      });
    }
  };
  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, stringId), {
      detatils: arrayRemove(item),
    });
  };

  // ======================
  // 2- Btns Section
  // ======================
  const [showData, setshowData] = useState(false);

  const removeBtn = async (eo) => {
    setshowData(true);
    await deleteDoc(doc(db, user.uid, stringId));
    navigate("/", { replace: true });
  };
  if (error) {
    return <h1>Error : {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />
        {showData ? (
          <main>
            <ReactLoading type="spin" color="white" width={77} height={77} />
          </main>
        ) : (
          <div className="edit-task">
            {/* Title */}
            <EditTitle
              user={user}
              stringId={stringId}
              titleInput={titleInput}
            />

            {/* Sub-tasks section */}
            <SubTasksSection
              user={user}
              stringId={stringId}
              completeCheckBox={completeCheckBox}
              trashIcon={trashIcon}
            />

            {/* Add-more BTN && Delete BTN */}

            <BtnSection user={user} stringId={stringId} removeBtn={removeBtn} />
          </div>
        )}

        <Footer />
      </div>
    );
  }
};

export default EditTask;
