import React from 'react';
import { Typography, Button } from '@material-tailwind/react';

function QuizSummary({ finalTime, handleRestart }) {
  const { level, comment } = getLevel(finalTime);

  function getLevel(finalTime) {
    if (finalTime <= 15) {
      return {
        level: 'Maestro',
        comment:
          "Bravo! Your tempo and precision are music to our ears. You're conducting the orchestra of champions.",
      };
    } else if (finalTime <= 22) {
      return {
        level: 'Virtuoso',
        comment:
          "A standing ovation! Your skills are hitting every note with perfection. You're a soloist in the symphony of greatness.",
      };
    } else if (finalTime <= 29) {
      return {
        level: 'Harmonizer',
        comment:
          "Encore! You're orchestrating your way to the top, blending skills and passion with each note.",
      };
    } else if (finalTime <= 36) {
      return {
        level: 'Melodist',
        comment:
          "You've got rhythm! There's melody in your method, but the symphony awaits your full suite of skills.",
      };
    } else if (finalTime <= 43) {
      return {
        level: 'Rookie Rhapsodist',
        comment:
          'Your musical journey is underway, and every practice is a step toward your solo debut. Keep the tempo!',
      };
    } else {
      return {
        level: 'Aspiring Artist',
        comment:
          "Every great artist started with a single note. Keep practicing, and you'll compose your masterpiece.",
      };
    }
  }

  return (
    <>
      {' '}
      <Typography variant="h3" className="mb-2">
        {level} level
      </Typography>
      <Typography className="mb-6">
        Hooray! You got 10 notes correct in {finalTime} seconds.
      </Typography>
      <Typography> {comment}</Typography>
      <Button onClick={handleRestart} className="mt-8">
        Restart Quiz
      </Button>
    </>
  );
}

export default QuizSummary;
