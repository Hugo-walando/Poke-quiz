import React, { Fragment } from "react";

const ProgressBar = ({ idQuestion, maxQuestions }) => {
  const actualQuestion = idQuestion + 1;

  return (
    <Fragment>
      <div className="percentage">
        <div className="questionNumber">
          {`Question: ${actualQuestion}/${maxQuestions}`}
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(ProgressBar);
