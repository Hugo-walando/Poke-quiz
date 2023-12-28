import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoyer l'e-mail de réinitialisation
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // L'e-mail de réinitialisation a été envoyé avec succès
        setError(null);
        setSuccess(
          `Consulte ton adresse email ${email} pour changer le mot de passe`
        );
        setEmail("");

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error.code, error.message);

        // Gérer les erreurs spécifiques liées à l'e-mail incorrect
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/user-not-found"
        ) {
          setError("Adresse email incorrecte. Veuillez vérifier et réessayer.");
        } else {
          setError("Erreur de connexion. Veuillez réessayer.");
        }

        setEmail("");
      });
  };

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="formContent">
        {success && <div className="success">{success}</div>}

        {error && <div className="error">{error}</div>}

        <div className="headerTitle">Mot de passe oublié?</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputBox">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="off"
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <button disabled={disabled}>Récupérer</button>
        </form>
        <div className="linkContainer">
          <Link className="simpleLink" to="/login">
            Déjà inscrit? Connecte-toi!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
