import { useState } from 'react';

import './App.css';
import Music from './Music/Music';
import Timer from './Music/Timer';
import StartPage from './Music/StartPage';
import { Button, Typography } from '@material-tailwind/react';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const handleQuizStart = () => {
    setQuizStarted(true);
    setQuizFinished(false);
  };

  const onQuizFinish = () => {
    setQuizFinished(true);
    setQuizStarted(false); // This will stop the timer in your Timer component
  };

  const handleTimeUpdate = (currentTime) => {
    setFinalTime(currentTime);
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setFinalTime(0);
  };
  return (
    <>
      {!quizStarted && !quizFinished && <StartPage onStart={handleQuizStart} />}

      {quizStarted && (
        <>
          <Timer quizStarted={quizStarted} onTimeUpdate={handleTimeUpdate} />
          <Music onQuizFinish={onQuizFinish} />
          <Button onClick={handleRestart} color="green">
            Restart Practice
          </Button>
        </>
      )}
      {quizFinished && (
        <>
          <Typography variant="h3">
            Hooray, you got 10 notes correct in {finalTime} seconds. Try again?
          </Typography>
          <Button onClick={handleQuizStart}>Restart Quiz</Button>
        </>
      )}
    </>
  );
}

export default App;
