import React, { Fragment, useEffect, useState } from "react";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontAwesome";
import Confetti from "react-dom-confetti";
import { auth, user } from "../Firebase/firebaseConfig";
import { updateDoc } from "firebase/firestore";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    userAnswers,
    loadLevelQuestions,
  } = props;

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showConfetti, setShowConffeti] = useState(false);

  const averageGrade = maxQuestions / 2;

  const config = {
    angle: 90,
    spread: 500,
    startVelocity: 40,
    elementCount: 100,
    dragFriction: 0.1,
    duration: 12000,
    stagger: 3,
    width: "15px",
    height: "15px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const recordFinishDate = async () => {
    const userId = auth.currentUser.uid;

    if (userId) {
      const userRef = user(userId); // Utilisez la fonction user avec l'ID de l'utilisateur

      // Capturez la date actuelle
      const currentDate = new Date();

      try {
        // Mettez à jour la base de données Firestore avec la date actuelle
        await updateDoc(userRef, { quizFinishedAt: currentDate });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    setAsked(ref.current);
    if (ref.current[9].id === 29 && score >= averageGrade) {
      setShowConffeti(true);
      recordFinishDate();
    }
  }, [ref, asked, maxQuestions, score, averageGrade]);

  const showModal = (id) => {
    const selected = asked.find((question) => question.id === id);
    setSelectedQuestion(selected);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const decision =
    score >= averageGrade ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <>
              <div className="successMsg">
                Bravo, passez au niveau suivant !
              </div>
              <button
                className="btnResult"
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau suivant{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="18"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#539B5C"
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <div className="confetti">
                <Confetti active={showConfetti} config={config} />
              </div>
              <FontAwesomeIcon icon="trophy" className="trophy" />
              <div className="successMsg">Bravo, vous êtes un expert !</div>
              <button
                className="btnResult"
                onClick={() => loadLevelQuestions(0)}
              >
                Recommencer le quiz{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="19"
                  width="19"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#539B5C"
                    d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
                  />
                </svg>
              </button>
            </>
          )}
          <div className="percentage">
            <div>Réussite: {percent}%</div>
            <div>
              Note: {score}/{maxQuestions}
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <div className="failureMsg">Vous avez échoué !</div>
          <button
            className="btnResult"
            onClick={() => loadLevelQuestions(quizLevel)}
          >
            Recommencer le niveau{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="19"
              width="19"
              viewBox="0 0 512 512"
            >
              <path
                fill="#539B5C"
                d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
              />
            </svg>
          </button>
          <div className="percentage">
            <div>Réussite: {percent}%</div>
            <div>
              Note: {score}/{maxQuestions}
            </div>
          </div>
        </div>
      </>
    );

  const questionAnswer = asked.map((question, index) => {
    const userResponse = userAnswers[index];
    if (score >= averageGrade) {
      return (
        <tr key={question.id}>
          <td data-title="Résultat">
            {userResponse === question.answer ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#27ff24"
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#ef1f1f"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            )}
          </td>
          <td data-title="Question">{question.question}</td>
          <td data-title="Bonne Réponse">{question.answer} </td>
          <td data-title="Votre Réponse">{userResponse}</td>
          <td data-title="Info">
            <button className="btnInfo" onClick={() => showModal(question.id)}>
              Infos
            </button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={question.id}>
          <td data-title="Résultat">
            {userResponse === question.answer ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#27ff24"
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#ef1f1f"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            )}
          </td>
          <td data-title="Question">{question.question}</td>
          <td data-title="Votre Réponse">{userResponse}</td>
        </tr>
      );
    }
  });

  const showAnswers = () => {
    if (score >= averageGrade) {
      return (
        <tr>
          <th className="stickyTop">Résultat</th>
          <th className="stickyTop">Question</th>
          <th className="stickyTop">Bonne Réponse</th>
          <th className="stickyTop">Votre Réponse</th>
          <th className="stickyTop">Info</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th className="stickyTop">Resultat</th>
          <th className="stickyTop">Question</th>
          <th className="stickyTop">Votre Réponse</th>
        </tr>
      );
    }
  };

  return (
    <Fragment>
      {decision}
      <table>
        <thead>{showAnswers()}</thead>
        <tbody>{questionAnswer}</tbody>
      </table>
      <Modal showModal={openModal} closeModal={closeModal}>
        <div className="modalHeader">
          {selectedQuestion && selectedQuestion.question}
        </div>
        <div className="modalBody">
          <div className="detailsImg">
            {selectedQuestion && selectedQuestion.img && (
              <img src={selectedQuestion.img} alt="Info" />
            )}
          </div>
          <div className="modalDetails">
            <h3>Description</h3>
            <p>{selectedQuestion && selectedQuestion.info}</p>
          </div>
        </div>
        <div className="modalFooter">
          <button className="modalBtn">Fermer</button>
        </div>
      </Modal>
    </Fragment>
  );
});

export default React.memo(QuizOver);
