import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuizCulture } from "../QuizCulture";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizOver from "../QuizOver";

toast.configure();

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
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
      userAnswers: [],
    };

    this.state = this.initialState;
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
    } else {
      console.log("Pas assez de questions !");
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
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({
        quizEnd: true,
      });
    } else {
      this.setState((prevState) => ({
        userAnswers: [...prevState.userAnswers, prevState.userAnswer],
        idQuestion: prevState.idQuestion + 1,
      }));
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
    if (this.props.userData && this.props.userData !== prevProps.userData) {
      this.showToastMsg(this.props.userData.pseudo);
    }

    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }

    if (this.state.quizEnd !== prevState.quizEnd) {
      const gradepercent = this.getPercentage(
        this.state.maxQuestions,
        this.state.score
      );
      this.gameOver(gradepercent);
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

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = (percent) => {
    this.setState((prevState) => ({
      userAnswers: [...prevState.userAnswers, prevState.userAnswer],
    }));

    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: percent,
      });
    } else {
      this.setState({
        percent: percent,
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...this.initialState, quizLevel: param });

    this.loadQuestions(this.state.levelNames[param]);
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

    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={this.state.levelNames}
        score={this.state.score}
        maxQuestions={this.state.maxQuestions}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        userAnswers={this.state.userAnswers}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <>
        <Levels
          levelNames={this.state.levelNames}
          quizLevel={this.state.quizLevel}
        />
        <div className="quizWrapper">
          <ProgressBar
            idQuestion={this.state.idQuestion}
            maxQuestions={this.state.maxQuestions}
          />
          <div className="questionText">{this.state.question}</div>
          <div className="optionsWrapper">{displayOptions}</div>
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
      </>
    );
  }
}

export default Quiz;
