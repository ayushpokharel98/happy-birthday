import React, { useEffect, useState } from 'react';
import "./App.css";
import texts from './assets/texts';
import Quiz from './components/Quiz';
import Gallery from './components/Gallery';
import FinalPage from './components/FinalPage';
import BackgroundMusic from './components/BackgroundMusic';
import birthdayTone from './assets/audio/happy-birthday.mp3';
import quizTone from './assets/audio/quiz-tone.mp3';
import galleryTone from './assets/audio/gallery-tone.mp3';
import finalToone from './assets/audio/final.mp3';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import HerPhoto from './assets/pictures/landing.jpg'
import Balloon from './assets/pictures/balloon.png'
import Game from './components/Game';
import Heart from './assets/Heart';
const App = () => {
  const [count, setCount] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [galleryFinished, setGalleryFinished] = useState(false);
  const [game, setGame] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (quizFinished || galleryFinished) {
      Heart();
    }
  }, [quizFinished, galleryFinished]);


  const handleClick = () => {
    if (!hasInteracted) setHasInteracted(true);
    setCount(prev => prev + 1);
    setFadeKey(prev => prev + 1);
  };

  const getMusicKey = () => {
    if (count < texts.length) return "intro";
    if (!quizFinished) return "quiz";
    if (!galleryFinished) return "gallery";
    if (!game) return "final";
    return "finished";
  };

  const getMusicSrc = () => {
    if (count < texts.length) return birthdayTone;
    if (!quizFinished) return quizTone;
    if (!galleryFinished) return galleryTone;
    if (!game) return finalToone;
    return null;
  };

  return (
    <>
      <BackgroundMusic
        key={getMusicKey()}
        src={getMusicSrc()}
        playOn={hasInteracted || quizFinished || galleryFinished || game}
      />

      {count < texts.length ? (
        <div className='h-screen overflow-hidden text-white gap-3 flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 via-blue-300 to-purple-500 relative'>
          <Confetti
            width={width}
            height={height}
            colors={['#ff69b4', '#ffd700', '#ffffff']}
            numberOfPieces={80}
          />


          <div className="flex flex-col items-center justify-center gap-8 z-10 px-4">
            <div className="relative group opacity-0 animate-photo">
              <div className="absolute -inset-2 bg-pink-300 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <img
                  src={HerPhoto}
                  alt="Her"
                  className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-white shadow-xl transform transition-transform duration-300 hover:scale-105"
                />
                <img
                  src={Balloon}
                  className="absolute -top-12 -left-8 w-24 animate-bounce opacity-0 animate-entrance animate-delay-1"
                  alt="Balloon"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
              <p
                key={fadeKey}
                className="text-2xl md:text-3xl font-cursive transition-opacity duration-700 opacity-0 animate-fade-in text-white drop-shadow-lg px-4 opacity-0 animate-entrance"
              >
                {texts[count]}
              </p>

              <div className="flex gap-2 opacity-0 animate-entrance animate-delay-2">
                {texts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${index <= count ? 'bg-white' : 'bg-white/30'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={handleClick}
                className="bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 opacity-0 animate-entrance animate-delay-3"
              >
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Click your little cursor right here my princess! ❤️
                  {
                    count === texts.length - 1 && ("(Ajhaii xa haii!!)")
                  }
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : !quizFinished ? (
        <Quiz onFinish={() => setQuizFinished(true)} />
      ) : !galleryFinished ? (
        <Gallery onFinish={() => setGalleryFinished(true)} />
      ) : !game ? (
        <FinalPage onFinish={() => setGame(true)} />
      ) : (
        <Game />
      )}
    </>
  );
};

export default App;
