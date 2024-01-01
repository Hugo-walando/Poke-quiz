import React, { Fragment } from "react";

const ProgressBar = ({ idQuestion, maxQuestions }) => {
  const getWidth = (totalQuestion, questionId) => {
    return (100 / totalQuestion) * questionId;
  };

  const actualQuestion = idQuestion + 1;

  const progressPercent = getWidth(maxQuestions, actualQuestion);

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
