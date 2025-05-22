import React, { useRef, useEffect, useState } from "react";
import Heart from "../assets/Heart";
import '../assets/Game.css'
const Game = () => {
  const gameAreaRef = useRef(null);
  const basketRef = useRef(null);
  const heartsRef = useRef([]);
  const basketXRef = useRef(0);
  const gameOverRef = useRef(false);

  const [basketX, setBasketX] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Constants
  const BASKET_WIDTH = 100;
  const BASKET_SPEED = 7;
  const HEART_SIZE = 35;
  const NUM_HEARTS = 5;
  const MIN_SPEED = 0.8;
  const MAX_SPEED = 1.4;

  const initHearts = () => {
    if (!gameAreaRef.current) return;
    const width = gameAreaRef.current.offsetWidth;

    heartsRef.current = Array.from({ length: NUM_HEARTS }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * (width - HEART_SIZE),
      y: Math.random() * -800,
      speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
      type: Math.random() < 0.5 ? "broken" : "heart",
    }));

    setHearts([...heartsRef.current]);
  };

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    initHearts();
    Heart.stop();
  }, []);

  useEffect(() => {
    basketXRef.current = basketX;
  }, [basketX]);

  useEffect(() => {
    let leftPressed = false;
    let rightPressed = false;
    let animationFrameId;

    const moveBasket = () => {
      animationFrameId = requestAnimationFrame(moveBasket);
      if (gameOverRef.current) return;

      const width = gameAreaRef.current.offsetWidth;
      let newX = basketXRef.current;

      if (leftPressed) newX = Math.max(0, newX - BASKET_SPEED);
      if (rightPressed) newX = Math.min(width - BASKET_WIDTH, newX + BASKET_SPEED);

      if (newX !== basketXRef.current) {
        setBasketX(newX);
        basketXRef.current = newX;
      }
    };

    const handleKeyDown = (e) => {
      if (e.code === "ArrowLeft") leftPressed = true;
      if (e.code === "ArrowRight") rightPressed = true;
    };

    const handleKeyUp = (e) => {
      if (e.code === "ArrowLeft") leftPressed = false;
      if (e.code === "ArrowRight") rightPressed = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    moveBasket();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const animateHearts = () => {
      animationFrameId = requestAnimationFrame(animateHearts);
      if (gameOverRef.current) return;

      const gameWidth = gameAreaRef.current.offsetWidth;
      const gameHeight = gameAreaRef.current.offsetHeight;
      const basketLeft = basketXRef.current;
      const basketRight = basketLeft + BASKET_WIDTH;

      heartsRef.current.forEach((heart) => {
        heart.y += heart.speed;

        if (heart.y > gameHeight) {
          heart.y = -HEART_SIZE;
          heart.x = Math.random() * (gameWidth - HEART_SIZE);
          heart.speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
        }

        const heartCenterX = heart.x + HEART_SIZE / 2;
        const heartBottomY = heart.y + HEART_SIZE;

        if (
          heartBottomY >= gameHeight - 40 &&
          heartCenterX >= basketLeft &&
          heartCenterX <= basketRight
        ) {
          if (heart.type === "broken") {
            setGameOver(true);
          } else {
            setScore((s) => s + 1);
          }

          heart.y = -HEART_SIZE;
          heart.x = Math.random() * (gameWidth - HEART_SIZE);
          heart.speed = 2 + Math.random() * 2;
        }
      });

      setHearts([...heartsRef.current]);
    };

    animateHearts();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setBasketX(0);
    initHearts();
  };

  return (
    <div
      ref={gameAreaRef}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(180deg, #a8d0e6 0%, #374785 100%)",
        cursor: "none",
      }}
    >
      <div
        ref={basketRef}
        style={{
          position: "absolute",
          bottom: 20,
          left: basketX,
          width: BASKET_WIDTH,
          height: 50,
          backgroundColor: "#f4a261",
          borderRadius: "8px 8px 15px 15px",
          boxShadow: `
            0 5px 10px rgba(0,0,0,0.3),
            inset 0 -3px 5px rgba(0,0,0,0.2)
          `,
          ':before': {
            content: '""',
            position: "absolute",
            top: -10,
            left: "10%",
            right: "10%",
            height: 12,
            backgroundColor: "#e76f51",
            borderRadius: "5px",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)"
          },
          backgroundImage: `
            linear-gradient(45deg, 
              transparent 25%,
              rgba(0,0,0,0.1) 25%,
              rgba(0,0,0,0.1) 50%,
              transparent 50%,
              transparent 75%,
              rgba(0,0,0,0.1) 75%,
              rgba(0,0,0,0.1)
            `,
          backgroundSize: "8px 8px"
        }}
      />

      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: "absolute",
            left: heart.x,
            top: heart.y,
            fontSize: HEART_SIZE,
            userSelect: "none",
            pointerEvents: "none",
            color: heart.type === "broken" ? "#2f4858" : "#e56b6f",
            textShadow: `
              0 0 8px ${heart.type === "broken" ?
                "rgba(47,72,88,0.5)" :
                "rgba(229,107,111,0.5)"}
            `,
            transition: "transform 0.3s",
            transform: `rotate(${heart.x % 360}deg)`,
            animation: "float 2s infinite ease-in-out",
          }}
        >
          {heart.type === "broken" ? "💔" : "❤️"}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 28,
          fontWeight: "bold",
          color: "#ffffff",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          background: "rgba(0,0,0,0.2)",
          padding: "8px 20px",
          borderRadius: 10,
          backdropFilter: "blur(3px)",
        }}
      >
        ❤️ {score}
      </div>

      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle, #e56b6f 0%, #2f4858 100%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            zIndex: 1000,
          }}
        >
          <h1 style={{ fontSize: "3em", marginBottom: "20px" }}>Game Over!</h1>
          <p style={{ fontSize: "1.5em", marginBottom: "40px" }}>
            Final Score: {score}
          </p>
          <button
            onClick={handleRestart}
            style={{
              padding: "15px 30px",
              fontSize: "1.2em",
              backgroundColor: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Play Again
          </button>
        </div>
      )}

      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "10px 10px"
      }} />
    </div>
  );
};

export default Game;