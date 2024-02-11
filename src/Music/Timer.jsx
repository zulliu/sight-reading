import { useState, useEffect, useRef } from 'react';
import { Typography } from '@material-tailwind/react';

function Timer({ quizStarted, onTimeUpdate }) {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (quizStarted) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current); // Clear the interval when quiz is not started
    }

    return () => clearInterval(intervalRef.current); // Cleanup on component unmount
  }, [quizStarted, onTimeUpdate]);

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
