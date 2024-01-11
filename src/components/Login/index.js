import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        navigate("/welcome", { replace: true });
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error.code, error.message);
        setError(
          "Erreur de connexion. Vérifie ton adresse e-mail et ton mot de passe."
        );
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="formContent">
        {error !== "" && <div className="error">{error}</div>}

        <div className="headerTitle">Connexion</div>
        <form onSubmit={handleSubmit}>
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
          <div className="inputBox">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="off"
              required
            />
            <label htmlFor="password">Mot de passe</label>
          </div>

          {<button disabled={btn ? false : true}>Se connecter</button>}
        </form>
        <div className="linkContainer">
          <Link className="simpleLink" to="/signup">
            Nouveau sur QuizCulture ? Inscris-toi maintenant !
          </Link>
          <br />
          <Link className="simpleLink" to="/forgetpassword">
            Mot de passe oublié? Récupère-le ici
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
