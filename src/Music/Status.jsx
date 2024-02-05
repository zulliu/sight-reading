import { Typography } from '@material-tailwind/react';
function Status({ correctCount, wrongCount }) {
  return (
    <div className="flex justify-center items-center space-x-4">
      <Typography variant="h6" color="green">
        Correct: {correctCount}
      </Typography>
      <Typography variant="h6" color="red">
        Wrong: {wrongCount}
      </Typography>
    </div>
  );
}

export default Status;
