import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizCulture } from "../QuizCulture";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizOver from "../QuizOver";

toast.configure();

class Quiz extends Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    successMsg: "Bonne réponse ! +1",
    errorMsg: "Raté...",
    quizEnd: false,
  };

  storedDataRef = React.createRef();

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
    } else {
      console.log("Pas assez de questions !");
    }
  };

  showWelcomeMsg = (pseudo) => {
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
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.gameOver();
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));

      // if (this.state.score === 2) {
      //   this.setState({
      //     successMsg: "Encore une bonne réponse !",
      //   });
      // }
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
    if (this.props.userData && this.props.userData !== prevProps.userData) {
      this.showWelcomeMsg(this.props.userData.pseudo);
    }

    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }

    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  gameOver = () => {
    this.setState({
      quizEnd: true,
    });
  };

  render() {
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <div
          key={index}
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
          {option}
        </div>
      );
    });

    return !this.state.quizEnd ? (
      <QuizOver ref={this.storedDataRef} />
    ) : (
      <div className="quizWrapper">
        <Levels />
        <ProgressBar
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}
        />
        <div className="questionText">{this.state.question}</div>
        <div>{displayOptions}</div>
        <button
          disabled={this.state.btnDisabled}
          className="nextBtn"
          onClick={this.nextQuestion}
        >
          {this.state.idQuestion < this.state.maxQuestions - 1
            ? "Suivant"
            : "Terminer"}
        </button>
      </div>
    );
  }
}

export default Quiz;
