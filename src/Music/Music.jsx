import { useState, useEffect } from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  ButtonGroup,
} from '@material-tailwind/react';
import notesData from './notes.json';

import Status from './Status';

function Music({ onQuizFinish }) {
  const [currentNote, setCurrentNote] = useState({});
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [score, setScore] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    pickRandomNote(notesData.notes);
  }, []);

  const pickRandomNote = (notes) => {
    const note = notes[Math.floor(Math.random() * notes.length)];
    const image = note.images[Math.floor(Math.random() * note.images.length)];
    setCurrentNote({ ...note, selectedImage: `./images/${image}` });
  };

  useEffect(() => {
    if (correctCount >= 10) {
      const soundPath = '/sounds/win.mp3';
      const sound = new Audio(soundPath);
      sound.play();
      onQuizFinish(score);
    }
  }, [correctCount, score, onQuizFinish]);

  const handleNoteSelection = (note) => {
    if (isDisabled) return;
    let soundPath;
    const isCorrect = note === currentNote.note;
    if (isCorrect) {
      const newPoints = 5 + consecutiveCorrect;
      setScore((prevScore) => Math.max(0, prevScore + newPoints));
      setConsecutiveCorrect((prev) => prev + 1);
      setCorrectCount(correctCount + 1);
      soundPath = '/sounds/correct.mp3';
    } else {
      setWrongCount(wrongCount + 1);
      setScore((prevScore) => Math.max(0, prevScore - 3));
      setConsecutiveCorrect(0);
      soundPath = '/sounds/wrong.mp3';
      setTimeout(() => setIsDisabled(false), 2000);
      setIsDisabled(true);
    }
    const sound = new Audio(soundPath);
    sound.play();
    pickRandomNote(notesData.notes);
  };

  return (
    <>
      <Card className="mt-6 w-full flex flex-col items-center justify-center shadow-none">
        <CardHeader
          color="blue-gray"
          floated={false}
          shadow={false}
          className="relative h-72 w-72 mx-0 mt-[-2rem]"
        >
          <img src={currentNote.selectedImage} alt="note" />
        </CardHeader>
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 font-lobster"
          >
            What's this note?
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <ButtonGroup className="gap-1 p-1 mt-[-1rem]">
            {['C', 'D', 'E', 'F'].map((note) => (
              <Button
                key={note}
                className="rounded-full"
                onClick={() => handleNoteSelection(note)}
                disabled={isDisabled}
              >
                {note}
              </Button>
            ))}
          </ButtonGroup>
          <ButtonGroup className="gap-1 p-1">
            {['G', 'A', 'B'].map((note) => (
              <Button
                key={note}
                className="rounded-full"
                onClick={() => handleNoteSelection(note)}
                disabled={isDisabled}
              >
                {note}
              </Button>
            ))}
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Status correctCount={correctCount} wrongCount={wrongCount} />
    </>
  );
}

export default Music;
