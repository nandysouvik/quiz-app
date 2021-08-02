import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './component/Home';
import Play from './component/quiz/Play';
import QuizInstruction from './component/quiz/QuizInstruction';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play/instructions" exact component={QuizInstruction} />
      <Route path="/play" exact component={Play} />
    </Router>
  );
}

export default App;
