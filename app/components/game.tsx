"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

type Choice = "Rock" | "Paper" | "Scissors";

export default function Main() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [tie, setTieScore] = useState(0);

  const gameSectionRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameStarted) {
      gsap.from(gameSectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
  };

  const animateClick = (target: HTMLElement) => {
    gsap.from(target, {
      scale: 0.9,
      duration: 0.15,
      ease: "power1.out",
    });
  };

  const flashScore = () => {
    gsap.from(scoreRef.current, {
      scale: 1.1,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const playerChoice = (
    choice: Choice,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    animateClick(event.currentTarget);

    const choices: Choice[] = ["Rock", "Paper", "Scissors"];
    const computerChoiceIndex = Math.floor(Math.random() * 3);
    const computer = choices[computerChoiceIndex];

    if (computer === choice) {
      setTieScore((prev) => prev + 1);
      flashScore();
      return;
    }

    const playerWins =
      (choice === "Rock" && computer === "Scissors") ||
      (choice === "Paper" && computer === "Rock") ||
      (choice === "Scissors" && computer === "Paper");

    if (playerWins) {
      setPlayerScore((prev) => prev + 1);
    } else {
      setComputerScore((prev) => prev + 1);
    }

    flashScore();
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setTieScore(0);
    setGameStarted(false);
  };

  return (
    <div className="w-full mb-20 bg-background flex items-center justify-center">
      {!gameStarted ? (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-white text-4xl font-bold">
            Welcome to Rock Paper Scissors!
          </h1>
          <p className="text-white text-lg">
            Choose your weapon and play against the computer.
          </p>
          <button
            onClick={startGame}
            className="bg-white text-cyan-950 font-bold py-2 px-4 rounded hover:bg-gray-200"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div ref={gameSectionRef} className="flex flex-col items-center gap-6">
          <div
            ref={scoreRef}
            className="flex gap-10 text-white text-2xl font-bold"
          >
            <p>You: {playerScore}</p>
            <p>Computer: {computerScore}</p>
            <p>Ties: {tie}</p>
          </div>

          <h2 className="text-white text-3xl font-bold">Choose your move:</h2>

          <div className="flex gap-4">
            {(["Rock", "Paper", "Scissors"] as Choice[]).map((c) => (
              <button
                key={c}
                onClick={(e) => playerChoice(c, e)}
                className="choice-btn bg-white text-cyan-950 font-bold py-2 px-4 rounded hover:bg-gray-200"
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={resetGame}
            className="mt-6 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
}
