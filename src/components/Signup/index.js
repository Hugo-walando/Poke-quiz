import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return setDoc(user(authUser.user.uid), {
          pseudo,
          email,
        });
      })
      .then(() => {
        setLoginData({ ...data });
        navigate("/welcome");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setError("L'adresse email est déjà utilisée");
        }
        setLoginData({ ...data });
      });
  };

  const { pseudo, email, password, confirmPassword } = loginData;

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>S'inscrire</button>
    ) : (
      <button>S'inscrire</button>
    );

  const errorMsg = error !== "" && <span>{error}</span>;

  const navigate = useNavigate();
  return (
    <div className="formBoxSignup">
      <div className="formContent">
        {errorMsg}

        <div className="headerTitle">Inscription</div>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              onChange={handleChange}
              value={pseudo}
              type="text"
              id="pseudo"
              autoComplete="off"
              required
            />
            <label htmlFor="pseudo">Pseudo</label>
          </div>
          <div className="inputBox">
            <input
              value={email}
              onChange={handleChange}
              type="email"
              id="email"
              autoComplete="off"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputBox">
            <input
              value={password}
              onChange={handleChange}
              type="password"
              id="password"
              autoComplete="off"
              required
            />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="inputBox">
            <input
              value={confirmPassword}
              onChange={handleChange}
              type="password"
              id="confirmPassword"
              autoComplete="off"
              required
            />
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          </div>
          {btn}
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

export default Signup;
