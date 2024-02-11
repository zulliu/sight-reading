import { useState } from 'react';

import './App.css';
import Music from './Music/Music';
import Timer from './Music/Timer';
import StartPage from './Music/StartPage';
import QuizSummary from './Music/QuizSummary';
import { Button, ButtonGroup } from '@material-tailwind/react';
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
          {' '}
          <div className="absolute top-4 left-12">
            <ButtonGroup variant="outlined">
              <Button
                size="sm"
                onClick={() => setGameMode('button')}
                className={`w-28 h-10 border-2 flex justify-center items-center ${
                  gameMode === 'button'
                    ? 'border-green-500 '
                    : 'border-gray-300 '
                }`}
              >
                Button Mode
              </Button>
              <Button
                size="sm"
                onClick={() => setGameMode('pitchGame')}
                className={`w-28 h-10 border-2 flex justify-center items-center ${
                  gameMode === 'pitchGame'
                    ? 'border-green-500 '
                    : 'border-gray-300 '
                }`}
              >
                Play Mode
              </Button>
            </ButtonGroup>
          </div>
          <StartPage onStart={handleQuizStart} />
        </>
      )}

      {quizStarted && gameMode === 'button' && (
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
