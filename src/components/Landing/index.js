import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="welcomePageBox">
      <div className="welcomePage">
        <Link className="btn-welcome" to="/signup">
          Inscription
        </Link>
        <Link className="btn-welcome" to="/login  ">
          Connexion
        </Link>
      </div>
    </main>
  );
};

export default Landing;
