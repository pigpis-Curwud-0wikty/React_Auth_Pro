import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/Config";

const BtnSection = ({ user, stringId, removeBtn }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));
  if (value) {
    return (
      <section className="center mtt">
        <div>
          <button
            onClick={() => {
              removeBtn();
            }}
            className="delete"
          >
            Delete task
          </button>
        </div>
      </section>
    );
  }
};

export default BtnSection;
