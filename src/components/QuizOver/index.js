import React, { Fragment, useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setAsked] = useState([]);

  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  const questionAnswer = asked.map((question) => {
    return (
      <tr key={question.id}>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td></td>
        <button className="btnInfo">Infos</button>
      </tr>
    );
  });

  return (
    <Fragment>
      <div className="stepsBtnContainer">
        <div className="successMsg  ">Bravo, vous avez réussi !</div>
        <button className="btnResult success">Niveau suivant</button>
      </div>
      <div className="percentage">
        <div>Réussite: 10%</div>
        <div>Note 10/10</div>
      </div>

      <div>Les réponses au questions posées</div>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
