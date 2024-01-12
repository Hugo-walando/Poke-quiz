const Loader = ({ loadingMsg, styling }) => {
  return (
    <>
      <div className="loader"></div>
      <div style={styling}>{loadingMsg}</div>
    </>
  );
};

export default Loader;
