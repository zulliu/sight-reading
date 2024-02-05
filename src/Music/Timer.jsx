import { useState, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';

function Timer({ quizStarted, onTimeUpdate }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (quizStarted) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [quizStarted]);

  useEffect(() => {
    if (quizStarted) {
      onTimeUpdate(time);
    }
  }, [time, quizStarted, onTimeUpdate]);

  useEffect(() => {
    if (!quizStarted) {
      setTime(0); // Reset time when the quiz is not started
    }
  }, [quizStarted]);

  return (
    <div className="flex justify-center items-center flex-col mt-4">
      <Typography variant="h3" className="mb-4 font-lobster">
        Time: {time} seconds
      </Typography>
    </div>
  );
}

export default Timer;
