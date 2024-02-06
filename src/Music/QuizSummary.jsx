import { useState, useEffect } from 'react';
import { Typography, Button } from '@material-tailwind/react';

function QuizSummary({ finalTime, finalScore, handleRestart }) {
  const [total, setTotal] = useState(0);
  const { level, comment } = getLevel(total);

  useEffect(() => {
    // This function now runs once on component mount or when finalScore or finalTime changes
    const totalScore = calculateFinalScore(finalScore, finalTime);
    setTotal(totalScore); // Update the state here
  }, [finalScore, finalTime]); // Dependencies array ensures effect runs on changes to these values

  function calculateFinalScore(baseScore, finalTime) {
    let timeBonus = 0;
    if (finalTime <= 15) timeBonus = 30;
    else if (finalTime <= 22) timeBonus = 15;
    else if (finalTime <= 29) timeBonus = 10;
    else if (finalTime <= 36) timeBonus = 5;
    // No bonus for tier 5 and below

    return baseScore + timeBonus;
  }

  function getLevel(score) {
    // Define score thresholds for levels
    if (score >= 90) {
      return {
        level: 'Maestro',
        comment:
          "Bravo! Your tempo and precision are music to our ears. You're leading the symphony of success.",
      };
    } else if (score >= 75) {
      return {
        level: 'Virtuoso',
        comment:
          "A standing ovation! You're playing every note with perfection. The stage of greatness awaits.",
      };
    } else if (score >= 60) {
      return {
        level: 'Harmonizer',
        comment:
          "Encore! Your skills harmonize beautifully with your ambition. You're a rising star.",
      };
    } else if (score >= 45) {
      return {
        level: 'Melodist',
        comment:
          "You've got rhythm! Your melody is forming, but the crescendo of mastery is still ahead.",
      };
    } else if (score >= 30) {
      return {
        level: 'Rookie Rhapsodist',
        comment:
          'Your musical journey is taking shape. Every practice brings you closer to your debut.',
      };
    } else {
      return {
        level: 'Aspiring Artist',
        comment:
          "The path to greatness starts with a single note. Keep practicing, and you'll find your symphony.",
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
        You got 10 notes correct in {finalTime} seconds, that's{' '}
        <span className="font-bold text-4xl text-blue-500">{total}</span> points
      </Typography>
      <Typography> {comment}</Typography>
      <Button onClick={handleRestart} className="mt-8">
        Restart Quiz
      </Button>
    </>
  );
}

export default QuizSummary;
