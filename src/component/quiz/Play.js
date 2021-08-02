import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import questions from '../../assets/questions/questions.json';
import isEmpty from '../../utils/is-empty';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: '',
      numberOfQuestions: questions.length,
      numberOfAsweredQuestions: 0,
      currentIndexPointer: 1,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      previousRandomNumbers: [],
      time: {}
    };
    this.interval = null;
  }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
    this.dispalyQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    this.startTimer();
  }

  dispalyQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        previousRandomNumbers: [],
        answer
      }, () => {
        this.showOptions();
      });
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  }

  correctAnswer = () => {
    M.toast({
      html: 'Correct answer',
      classes: 'toastValid',
      displayLength: 1500
    });
    this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAsweredQuestions: prevState.numberOfAsweredQuestions + 1
    }))
  }

  wrongAnswer = () => {
    M.toast({
      html: 'Wrong answer',
      classes: 'toastInvalid',
      displayLength: 1500
    });
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAsweredQuestions: prevState.numberOfAsweredQuestions + 1
    }));
  }

  handleNextButtonClick = () => {
    if (this.state.nextQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        currentIndexPointer: prevState.currentIndexPointer + 1
      }), () => {
        this.dispalyQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      });
    }
  }

  handlePreviousButtonClick = () => {
    if (this.state.previousQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex - 1
      }), () => {
        this.dispalyQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      });
    }
  }

  handleSubmitButtonClick = () => {
    if (this.state.currentIndexPointer === this.state.numberOfQuestions) {
      if (window.confirm('Are you sure you want to Submit?')) {

        this.props.history.push('/')
      }
    } else {
      alert('Please Complete the Quiz')
    }
  }

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case 'nextButton':
        this.handleNextButtonClick();
        break;

      case 'previousButton':
        this.handlePreviousButtonClick();
        break;

      case 'submitButton':
        this.handleSubmitButtonClick();
        break;

      default:
        break;
    }
  }

  showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach(option => {
      option.style.visibility = 'visible';
    });

    this.setState({
      usedFiftyFifty: false
    })
  }

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll('.option'));
      let indexOfAnswer;
      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
          indexOfAnswer = index;
        }
      });
      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomNumbers.length >= 3) break;
      }
    }
  }

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll('.option');
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
          indexOfAnswer = index;
        }
      });

      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = 'hidden';
        }
      });
      this.setState(prevState => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true
      }))
    }
  }

  startTimer = () => {
    const countDownTime = Date.now() + 900000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(this.interval);
        this.setState({
          time: {
            minutes: 0,
            seconds: 0
          }
        }, () => {
          alert('Quiz has Ended!');
          this.props.history.push('/');
        });
      } else {
        this.setState({
          time: {
            minutes,
            seconds
          }
        })
      }
    }, 1000)
  }

  render() {
    const { currentQuestion, hints, fiftyFifty, currentQuestionIndex, numberOfQuestions, time } = this.state;

    return (
      <Fragment>
        <Helmet><title>Quiz Page</title></Helmet>
        <div className="questions">
          <h2>Quiz Mode</h2>
          <div className="lifelineContainer">
            <p>
              <span onClick={this.handleFiftyFifty} className="mdi mdi-set-center mdi-24px lifelineIcon">
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p>
              <span onClick={this.handleHints} className="mdi mdi-lightbulb-on mdi-24px lifelineIcon">
                <span className="lifeline">{hints}</span>
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="left" style={{ float: 'left' }}>{currentQuestionIndex} of {numberOfQuestions}</span>
              <span className="right"><span className="mdi mdi-clock-outline mdi-24px"></span>{time.minutes}:{time.seconds}</span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className="optionsContainer">
            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
          </div>
          <div className="optionsContainer">
            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
          </div>
          <div className="buttonContainer">
            <button id="previousButton" onClick={this.handleButtonClick}>Previous</button>
            <button id="nextButton" onClick={this.handleButtonClick}>Next</button>
            <button id="submitButton" onClick={this.handleButtonClick}
            >Submit</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Play;