import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Quiz from "../Quiz";
import Loader from "../Loader";

const Welcome = () => {
  const navigate = useNavigate();

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user ? setUserSession(user) : navigate("/");
    });

    if (userSession) {
      const colRef = user(userSession.uid);

      getDoc(colRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const docData = snapshot.data();
            setUserData((prevUserData) => ({ ...prevUserData, ...docData }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return listener;
  }, [userSession, navigate]);

  return userSession === null ? (
    <Loader loadingMsg={"Chargement ..."} styling={{ textAlign: "center" }} />
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
