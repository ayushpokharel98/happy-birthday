import { useEffect, useRef } from 'react';

const BackgroundMusic = ({ src, playOn = false }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playOn) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn("Autoplay failed:", err.message);
        });
      }
    } else {
      audio.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [src, playOn]);

  return (
    <audio
      ref={audioRef}
      src={src}
      loop
      autoPlay={false}
      preload="auto"
      style={{ display: "none" }}
    />
  );
};

export default BackgroundMusic;
