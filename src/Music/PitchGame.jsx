import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import notesData from './notes.json';
import Status from './Status';
import { autoCorrelate, noteFromPitch } from '../utils/processFrequency';
import {
  playCorrectSound,
  playWrongSound,
  playWinSound,
} from '../utils/playSound';

function PitchGame({ onQuizFinish, quizStarted, quizFinished }) {
  const [currentNote, setCurrentNote] = useState({});
  const currentNoteRef = useRef({});
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [score, setScore] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [audioContext, setAudioContext] = useState(null);
  const [shouldStartRecording, setShouldStartRecording] = useState(false);

  useEffect(() => {
    // This effect might be adjusted or removed based on how you choose to start the game.
    if (quizStarted && !quizFinished) {
      pickRandomNote(notesData.notes);
    }
  }, [quizStarted, quizFinished]);

  useEffect(() => {
    // Cleanup to stop recording and close audio context when component unmounts
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  useEffect(() => {
    let timeoutId;

    if (shouldStartRecording && quizStarted && !quizFinished) {
      timeoutId = setTimeout(() => {
        startRecording();
        setShouldStartRecording(false); // Reset the trigger
      }, 500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [shouldStartRecording, quizStarted, quizFinished]); // Dependencies

  useEffect(() => {
    if (correctCount >= 10) {
      playWinSound();
      onQuizFinish(score);
    }
  }, [correctCount, score, onQuizFinish]);

  const pickRandomNote = (notes) => {
    if (!quizStarted || quizFinished) return;
    const note = notes[Math.floor(Math.random() * notes.length)];
    const image = note.images[Math.floor(Math.random() * note.images.length)];
    setCurrentNote({ ...note, selectedImage: `./images/${image}` });
    currentNoteRef.current = { ...note, selectedImage: `./images/${image}` }; // Update the ref
    // setTimeout(() => startRecording(), 500); // Start recording after a delay
    setShouldStartRecording(true);
  };

  const startRecording = async () => {
    if (!quizStarted || quizFinished) return;

    const newAudioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    setAudioContext(newAudioContext);
    const newAnalyser = newAudioContext.createAnalyser();
    newAnalyser.fftSize = 2048;
    const bufferLength = newAnalyser.fftSize;
    const buffer = new Float32Array(bufferLength);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = newAudioContext.createMediaStreamSource(stream);
      source.connect(newAnalyser);

      let pitchClasses = [];
      let detectionsCount = 0;

      const detectPitch = () => {
        if (!newAnalyser) return;

        newAnalyser.getFloatTimeDomainData(buffer);
        const pitch = autoCorrelate(buffer, newAudioContext.sampleRate);

        if (pitch !== -1 && detectionsCount < 10) {
          const pitchClass = noteFromPitch(pitch);
          pitchClasses.push(pitchClass);
          detectionsCount++;

          if (detectionsCount < 10) {
            setTimeout(detectPitch, 10); // Wait 50ms before the next detection
          } else {
            // Calculate the average pitch
            const mostFrequentPitchClass =
              findMostFrequentPitchClass(pitchClasses);
            checkAnswer(mostFrequentPitchClass);
          }
        } else {
          // No pitch detected, or unable to detect pitch, try again immediately
          requestAnimationFrame(detectPitch);
        }
      };

      detectPitch(); // Start pitch detection
    } catch (err) {}
  };

  const checkAnswer = (note) => {
    const isCorrect = note === currentNoteRef.current.note;
    if (isCorrect) {
      const newPoints = 5 + consecutiveCorrect;
      setScore((prevScore) => Math.max(0, prevScore + newPoints));
      setConsecutiveCorrect((prev) => prev + 1);
      setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
      playCorrectSound();
    } else {
      setWrongCount((prevWrongCount) => prevWrongCount + 1);
      setScore((prevScore) => Math.max(0, prevScore - 3));
      setConsecutiveCorrect(0);
      playWrongSound();
    }
    if (quizStarted && !quizFinished) {
      pickRandomNote(notesData.notes);
    }
  };

  function findMostFrequentPitchClass(pitchClasses) {
    const frequencyMap = pitchClasses.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(frequencyMap).reduce((a, b) =>
      frequencyMap[a] > frequencyMap[b] ? a : b,
    );
  }
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
            Sing or play this note!
          </Typography>
        </CardBody>
      </Card>
      <Status correctCount={correctCount} wrongCount={wrongCount} />
    </>
  );
}

export default PitchGame;
