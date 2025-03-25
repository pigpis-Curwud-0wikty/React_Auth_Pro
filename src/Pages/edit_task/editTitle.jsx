import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/Config";
import ReactLoading from "react-loading";

const EditTitle = ({ user, stringId, titleInput }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

  if (error) {
    return (
      <main>
        <h1>Error : {error.message}</h1>
      </main>
    );
  }

  if (loading) {
    return (
      <main>
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </main>
    );
  }

  if (value) {
    console.log(value.data());
  }

  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
            onChange={(eo) => {
              titleInput(eo);
            }}
            defaultValue={value.data().title}
            className="title-input center"
            type="text"
          />
          <i className="fa-regular fa-pen-to-square"></i>
        </h1>
      </section>
    );
  }
};

export default EditTitle;
