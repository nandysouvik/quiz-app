import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import options from '../../assets/images/options.png';
import answers from '../../assets/images/answers.png';
import hints from '../../assets/images/hints.png';
import fiftyFifty from '../../assets/images/fiftyFifty.png'

const QuizInstruction = () => (
  <Fragment>
    <Helmet>
      <title>Quiz Instruction - Quiz App</title>
    </Helmet>
    <div className="instruction container">
      <h1>How to play a game?</h1>
      <p>Ensure you to read this guide from start to finish.</p>
      <ul className="browserDefault" id="mainList">
        <li>The game has the duration of 15 minutes and ends as soon as your time elapses.</li>
        <li>Each game consists of 15 questions.</li>
        <li>
          Each question contains 4 options. <br />
          <img src={options} alt="Quiz App options example" />
        </li>
        <li>
          Select the option which best anwers the question by clicking (or selecting) it. <br />
          <img src={answers} alt="Quiz App answers example." />
        </li>
        <li>
          Each game has two lifeline:
          <ul id="sublist">
            <li>2 50-50 chances</li>
            <li>5 Hints</li>
          </ul>
        </li>
        <li>
          Selecting a 50-50 lifeline by clicking the icon
          <span className="mdi mdi-set-center mdi-24px lifelineIcon"></span>
          will remove 2 wrong answers, leaving the correct answer and one wrong answer. <br />
          <img src={fiftyFifty} alt="Quiz App fifty-fifty example" />
        </li>
        <li>
          Using a hint by clicking the icon
          <span className="mdi mdi-lightbulb-on mdi-24px lifelineIcon"></span>
          will remove one wrong answer leaving two wrong answer and one correct answer. You can use as many hints as possible on a single questions. <br />
          <img src={hints} alt="Quiz App hints example" />
        </li>
        <li>The timer starts as soon as the game starts</li>
      </ul>
      <div>
        <span className="left"><Link to="/">No take me back</Link></span>
        <span className="right"><Link to="/play">Okay, Let's do this</Link></span>
      </div>
    </div>
  </Fragment>
)

export default QuizInstruction
