import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Déconnexion ...");
    signOut(auth)
      .then(() => {
        console.log("Vous êtes déconnecté");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.log("Oups, Nous avons une erreur");
      });
  };

  return (
    <div className="logoutContainer">
      <div className="decoBtn" onClick={handleClick}>
        Déconnexion
      </div>
    </div>
  );
};

export default Logout;
