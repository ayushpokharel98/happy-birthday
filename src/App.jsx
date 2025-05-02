import React, { useEffect, useState } from 'react';
import "./App.css";
import Heart from './assets/Heart';
import texts from './assets/texts';
import Quiz from './components/Quiz';
import Gallery from './components/Gallery';
import FinalPage from './components/FinalPage';
import BackgroundMusic from './components/BackgroundMusic';

import birthdayTone from './assets/audio/happy-birthday.mp3';
import quizTone from './assets/audio/quiz-tone.mp3';
import galleryTone from './assets/audio/gallery-tone.mp3';
import finalToone from './assets/audio/final.mp3';

const App = () => {
  useEffect(() => {
    Heart();
  }, []);

  const [count, setCount] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [galleryFinished, setGalleryFinished] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleClick = () => {
    if (!hasInteracted) setHasInteracted(true);
    setCount(count + 1);
    setFadeKey(prev => prev + 1);
  };

  // Determine which audio to play and key to force remount
  const getMusicKey = () => {
    if (count < texts.length) return "intro";
    if (!quizFinished) return "quiz";
    if (!galleryFinished) return "gallery";
    return "final";
  };

  const getMusicSrc = () => {
    if (count < texts.length) return birthdayTone;
    if (!quizFinished) return quizTone;
    if (!galleryFinished) return galleryTone;
    return finalToone;
  };

  return (
    <>
      <BackgroundMusic
        key={getMusicKey()}
        src={getMusicSrc()}
        playOn={hasInteracted || quizFinished || galleryFinished}
      />

      {count < texts.length ? (
        <div className='h-lvh overflow-hidden text-white flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-600'>
          <div className='flex flex-col gap-4 justify-center items-center'>
            <p
              key={fadeKey}
              className="transition-opacity duration-700 opacity-0 animate-fade-in text-center text-lg"
            >
              {texts[count]}
            </p>
            <button
              onClick={handleClick}
              className='bg-slate-200 flex items-center gap-1 text-black rounded-lg p-2 hover:cursor-pointer hover:bg-white transition duration-300'
            >
              Click your little cursor right here my princess! ❤️
            </button>
          </div>
        </div>
      ) : !quizFinished ? (
        <Quiz onFinish={() => setQuizFinished(true)} />
      ) : !galleryFinished ? (
        <Gallery onFinish={() => setGalleryFinished(true)} />
      ) : (
        <FinalPage />
      )}
    </>
  );
};

export default App;
