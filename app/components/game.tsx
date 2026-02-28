"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Main() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [tie, setTieScore] = useState(0);

  const gameSectionRef = useRef(null);
  const scoreRef = useRef(null);

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

  function startGame() {
    setGameStarted(true);
  }

  function animateClick() {
    gsap.from(".choice-btn", {
      scale: 0.9,
      duration: 0.15,
      ease: "power1.out",
      stagger: 0.1,
    });
  }

  function flashScore() {
    gsap.from(scoreRef.current, {
      scale: 1.1,
      duration: 0.2,
      ease: "power1.out",
    });
  }

  function playerChoice(choice: any) {
    animateClick();

    const computerChoiceIndex = Math.floor(Math.random() * 3);
    const choices = ["Rock", "Paper", "Scissors"];
    const computer = choices[computerChoiceIndex];

    if (computer === choice) {
      setTieScore(tie + 1);
      flashScore();
      return;
    }

    const playerWins =
      (choice === "Rock" && computer === "Scissors") ||
      (choice === "Paper" && computer === "Rock") ||
      (choice === "Scissors" && computer === "Paper");

    if (playerWins) {
      setPlayerScore(playerScore + 1);
    } else {
      setComputerScore(computerScore + 1);
    }

    flashScore();
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
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
            <button
              onClick={() => playerChoice("Rock")}
              className="choice-btn bg-white text-cyan-950 font-bold py-2 px-4 rounded hover:bg-gray-200"
            >
              Rock
            </button>

            <button
              onClick={() => playerChoice("Paper")}
              className="choice-btn bg-white text-cyan-950 font-bold py-2 px-4 rounded hover:bg-gray-200"
            >
              Paper
            </button>

            <button
              onClick={() => playerChoice("Scissors")}
              className="choice-btn bg-white text-cyan-950 font-bold py-2 px-4 rounded hover:bg-gray-200"
            >
              Scissors
            </button>
          </div>
        </div>
      )}
    </div>
  );
}