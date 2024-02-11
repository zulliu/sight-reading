import { useState } from 'react';

import './App.css';
import Music from './Music/Music';
import Timer from './Music/Timer';
import StartPage from './Music/StartPage';
import QuizSummary from './Music/QuizSummary';
import { Button } from '@material-tailwind/react';
import PitchGame from './Music/PitchGame';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [gameMode, setGameMode] = useState('pitchGame');

  const handleQuizStart = () => {
    setQuizStarted(true);
    setQuizFinished(false);
  };

  const onQuizFinish = (score) => {
    setFinalScore(score);
    setQuizFinished(true);
    setQuizStarted(false); // This will stop the timer
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
      {!quizStarted && !quizFinished && (
        <>
          <StartPage onStart={handleQuizStart} />
          <Button
            onClick={() => setGameMode('music')}
            variant="outlined"
            className="mt-4"
          >
            Button Mode
          </Button>
          <Button
            onClick={() => setGameMode('pitchGame')}
            variant="outlined"
            className="mt-4"
          >
            Play Mode
          </Button>
        </>
      )}

      {quizStarted && gameMode === 'music' && (
        <>
          <Timer quizStarted={quizStarted} onTimeUpdate={handleTimeUpdate} />
          <Music onQuizFinish={onQuizFinish} />
          <Button onClick={handleRestart} variant="outlined" className="mt-4">
            Restart Practice
          </Button>
        </>
      )}
      {quizStarted && gameMode === 'pitchGame' && (
        <>
          <Timer quizStarted={quizStarted} onTimeUpdate={handleTimeUpdate} />
          <PitchGame
            onQuizFinish={onQuizFinish}
            quizStarted={quizStarted}
            quizFinished={quizFinished}
          />
          <Button onClick={handleRestart} variant="outlined" className="mt-4">
            Restart Practice
          </Button>
        </>
      )}

      {quizFinished && (
        <>
          <QuizSummary
            finalTime={finalTime}
            finalScore={finalScore}
            handleRestart={handleRestart}
          />
        </>
      )}
    </div>
  );
}

export default App;
