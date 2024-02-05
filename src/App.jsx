import { useState } from 'react';

import './App.css';
import Music from './Music/Music';
import Timer from './Music/Timer';
import StartPage from './Music/StartPage';
import QuizSummary from './Music/QuizSummary';
import { Button } from '@material-tailwind/react';

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
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      {!quizStarted && !quizFinished && <StartPage onStart={handleQuizStart} />}

      {quizStarted && (
        <>
          <Timer quizStarted={quizStarted} onTimeUpdate={handleTimeUpdate} />
          <Music onQuizFinish={onQuizFinish} />
          <Button onClick={handleRestart} variant="outlined" className="mt-4">
            Restart Practice
          </Button>
        </>
      )}
      {quizFinished && (
        <>
          <QuizSummary finalTime={finalTime} handleRestart={handleRestart} />
        </>
      )}
    </div>
  );
}

export default App;
