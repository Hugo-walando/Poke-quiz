import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizCulture } from "../QuizCulture";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizOver from "../QuizOver";

toast.configure();

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: "",
  score: 0,
  successMsg: "Bonne réponse ! +1",
  errorMsg: "Raté...",
  quizEnd: false,
  userAnswers: [],
  percent: null,
};

const levelNames = ["debutant", "confirme", "expert"];

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizCulture[0].quizz[quizz];
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;

      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );

      this.setState({
        storedQuestions: newArray,
      });
    }
  };

  showToastMsg = (pseudo) => {
    toast.info(`Bienvenue sur QuizCulture ${pseudo}, et bonne chance! `, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({
        quizEnd: true,
      });
    } else {
      console.log(this.state.userAnswers);
      if (this.state.userAnswer !== "") {
        this.setState((prevState) => ({
          userAnswers: [...this.state.userAnswers, this.state.userAnswer],
          idQuestion: prevState.idQuestion + 1,
        }));
      }
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));

      toast.success(this.state.successMsg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(this.state.errorMsg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { maxQuestions, storedQuestions, idQuestion, score, quizEnd } =
      this.state;

    if (this.props.userData && this.props.userData !== prevProps.userData) {
      this.showToastMsg(this.props.userData.pseudo);
    }

    if (storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      });
    }

    if (quizEnd !== prevState.quizEnd) {
      const gradepercent = this.getPercentage(maxQuestions, score);
      this.gameOver(gradepercent);
    }

    if (idQuestion !== prevState.idQuestion) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }
  }

  submitAnswer = (selectedAnswer) => {
    if (selectedAnswer !== null) {
      this.setState({
        userAnswer: selectedAnswer,
        btnDisabled: false,
      });
    }
  };

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = (percent) => {
    if (percent >= 50) {
      if (this.state.userAnswer !== "") {
        this.setState((prevState) => ({
          quizLevel: prevState.quizLevel + 1,
          percent: percent,
          userAnswers: [...this.state.userAnswers, this.state.userAnswer],
        }));
      }
    } else {
      if (this.state.userAnswer !== "") {
        this.setState((prevState) => ({
          percent: percent,
          userAnswers: [...this.state.userAnswers, this.state.userAnswer],
        }));
      }
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...initialState, quizLevel: param });

    this.loadQuestions(levelNames[param]);
  };

  render() {
    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      userAnswers,
      percent,
    } = this.state;

    const displayOptions = options.map((option, index) => {
      return (
        <div
          key={index}
          className={`answerOptions ${
            userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
          {option}
        </div>
      );
    });

    return quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        userAnswers={userAnswers}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <>
        <Levels levelNames={levelNames} quizLevel={quizLevel} />
        <div className="quizWrapper">
          <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
          <div className="questionText">{question}</div>
          <div className="optionsWrapper">{displayOptions}</div>
          <button
            disabled={btnDisabled}
            className="nextBtn"
            onClick={this.nextQuestion}
          >
            {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
          </button>
        </div>
      </>
    );
  }
}

export default Quiz;
