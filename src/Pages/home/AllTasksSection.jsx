import { collection, orderBy, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/Config";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const AllTasksSection = ({ user }) => {
  const allTasks = query(collection(db, user.uid), orderBy("id"));
  const completedTasks = query(
    collection(db, user.uid),
    where("completed", "==", true)
  );
  const notCompleted = query(
    collection(db, user.uid),
    where("completed", "==", false)
  );
  const [initialData, setinitialData] = useState(
    query(collection(db, user.uid), orderBy("id", "asc"))
  );
  const [value, loading, error] = useCollection(initialData);

  const [isFullOpacity, setisFullOpacity] = useState(false);

  const [selectValue, setselectValue] = useState("aaa");

  if (error) {
    return <h1>ERORR</h1>;
  }

  if (loading) {
    return (
      <section className="mttt">
        <ReactLoading type="spin" color="white" width={77} height={77} />;
      </section>
    );
  }

  if (value) {
    console.log(value.docs);
    {
      /* Options (filtered data) */
    }
    return (
      <>
        <section
          style={{ justifyContent: "center" }}
          className="parent-of-btns flex mtt"
        >
          {selectValue === "aaa" && (
            <>
              <button
                style={{ opacity: isFullOpacity ? "1" : "0.3" }}
                onClick={(params) => {
                  setisFullOpacity(true);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("id", "desc"))
                  );
                }}
              >
                Newest first
              </button>
              <button
                style={{ opacity: isFullOpacity ? "0.3" : "1" }}
                onClick={(params) => {
                  setisFullOpacity(false);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("id", "asc"))
                  );
                }}
              >
                Oldest first
              </button>
            </>
          )}
          <select
            id="browsers"
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === "aaa") {
                setselectValue("aaa");
                setinitialData(allTasks);
              } else if (eo.target.value === "bbb") {
                setselectValue("bbb");
                setinitialData(query(completedTasks));
              } else if (eo.target.value === "ccc") {
                setselectValue("ccc");
                setinitialData(query(notCompleted));
              }
            }}
          >
            <option value="aaa">All Tasks</option>
            <option value="bbb">Completed</option>
            <option value="ccc">Not Completed</option>
          </select>
        </section>

        <section className="flex all-tasks mt">
          {value.docs.length === 0 && (
            <h1>Congratulations! You have completed your tasks ♥</h1>
          )}

          {value.docs.map((item) => {
            return (
              <article dir="auto" className="one-task">
                <Link to={`/edit-task/${item.data().id}`}>
                  <h2> {item.data().title} </h2>
                  <ul>
                    {item.data().detatils.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}> {item} </li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  <p className="time">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </>
    );
  }
};

export default AllTasksSection;
