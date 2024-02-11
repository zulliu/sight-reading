import { useState, useEffect } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { playStartSound } from '../utils/playSound';
function StartPage({ onStart }) {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    let timer = null;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      onStart(); // Trigger the start function passed from the parent component
    }
    return () => clearTimeout(timer);
  }, [countdown, onStart]);

  const startCountdown = () => {
    playStartSound();
    setCountdown(3); // Start countdown from 3
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      {countdown === null ? (
        <>
          <Typography variant="h1" className="font-lobster">
            Sight Reading Challenge
          </Typography>
          <br />
          <Typography className="" color="gray">
            Are you ready?
          </Typography>

          <br />
          <Button onClick={startCountdown}>Start</Button>
        </>
      ) : (
        <Typography variant="h1" color="blue" className="font-lobster">
          {countdown > 0 ? countdown : 'Go!'}
        </Typography>
      )}
    </div>
  );
}

export default StartPage;
