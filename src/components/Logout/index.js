import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontAwesome";
import { Tooltip } from "react-tooltip";

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
      <FontAwesomeIcon
        icon="power-off"
        className="decoBtn"
        onClick={handleClick}
      />
      <Tooltip anchorSelect=".decoBtn" place="left" effect="solid">
        Déconnexion
      </Tooltip>
    </div>
  );
};

export default Logout;
