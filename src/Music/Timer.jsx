// Timer.jsx
import { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@material-tailwind/react';

function Timer({ quizStarted, onTimeUpdate }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (quizStarted) {
      interval = setInterval(() => {
        setTime((time) => {
          const newTime = time + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [quizStarted, onTimeUpdate]);

  useEffect(() => {
    if (!quizStarted) {
      setTime(0); // Reset time when the quiz is not started
    }
  }, [quizStarted]);

  return (
    <div className="flex justify-center items-center flex-col mt-4">
      <div className="text-2xl font-semibold mb-4">Time: {time} seconds</div>
    </div>
  );
}

export default Timer;
