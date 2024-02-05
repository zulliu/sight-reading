// StartPage.jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography, Card } from '@material-tailwind/react';

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
    const soundPath = '/sounds/countdown.mp3';
    const sound = new Audio(soundPath);
    sound.play();
    setCountdown(3); // Start countdown from 3
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      {countdown === null ? (
        <>
          <Typography variant="h2">Sight Reading Challenge</Typography>
          <br />
          <Typography variant="h4" className="" color="gray">
            Are you ready?
          </Typography>

          <br />
          <Button color="green" onClick={startCountdown}>
            Start
          </Button>
        </>
      ) : (
        <Typography variant="h1" color="blue">
          {countdown > 0 ? countdown : 'Go!'}
        </Typography>
      )}
    </div>
  );
}

export default StartPage;
