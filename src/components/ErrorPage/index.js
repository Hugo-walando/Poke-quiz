import oops from "../../images/404-error-3060993_640.png";

const centerH2 = {
  textAlign: "center",
  marginTop: "50px",
};

const centerImg = {
  display: "block",
  margin: "40px auto",
  height: "150px",
};

const ErrorPage = () => {
  return (
    <div>
      <h2 style={centerH2}>Cette Page n'existe pas !</h2>
      <img style={centerImg} src={oops} alt="Error img" />
    </div>
  );
};

export default ErrorPage;
