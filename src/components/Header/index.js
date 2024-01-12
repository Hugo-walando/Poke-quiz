import Logout from "../Logout";

const Header = () => {
  return (
    <header>
      <div className="banner-container">
        <div className="title-container">
          <a href="/" className="title">
            QuizCulture
          </a>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
