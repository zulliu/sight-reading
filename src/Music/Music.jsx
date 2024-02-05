// Music.jsx
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

  useEffect(() => {
    pickRandomNote(notesData.notes);
  }, []);

  useEffect(() => {
    if (correctCount >= 10) {
      // Check if correctCount has reached the limit
      const soundPath = '/sounds/win.mp3';
      const sound = new Audio(soundPath);
      sound.play();
      onQuizFinish(); // Call the function passed as prop to handle quiz finish
    }
  }, [correctCount, onQuizFinish]); // Add onQuizFinish to the dependency array if it might change, otherwise it can be omitted

  const pickRandomNote = (notes) => {
    const note = notes[Math.floor(Math.random() * notes.length)];
    const image = note.images[Math.floor(Math.random() * note.images.length)];
    setCurrentNote({ ...note, selectedImage: `./images/${image}` });
  };

  const handleNoteSelection = (note) => {
    let soundPath;
    const isCorrect = note === currentNote.note;
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
      soundPath = '/sounds/correct.mp3';
    } else {
      setWrongCount(wrongCount + 1);
      soundPath = '/sounds/wrong.mp3';
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
