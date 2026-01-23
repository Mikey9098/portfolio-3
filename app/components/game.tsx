"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type SubmittedWord = {
  word: string;
  points: number;
  time: number; // seconds remaining when submitted
};

const VOWELS = ["A", "E", "I", "O", "U"];
const CONSONANTS = [
  "B",
  "C",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function genRack(size = 9) {
  // mild vowel balance: ~3-4 vowels
  const vowelCount = Math.max(
    2,
    Math.min(4, Math.floor(size / 3) + (Math.random() < 0.5 ? 1 : 0)),
  );

  const rack: string[] = [];
  for (let i = 0; i < vowelCount; i++) rack.push(pick(VOWELS));
  for (let i = vowelCount; i < size; i++) rack.push(pick(CONSONANTS));

  // shuffle
  for (let i = rack.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rack[i], rack[j]] = [rack[j], rack[i]];
  }

  return rack;
}

function letterCounts(letters: string[]) {
  const m = new Map<string, number>();
  for (const ch of letters) m.set(ch, (m.get(ch) ?? 0) + 1);
  return m;
}

function canBuildWord(wordRaw: string, rack: string[]) {
  const word = wordRaw.toUpperCase().replace(/[^A-Z]/g, "");
  if (!word) return false;

  const rackMap = letterCounts(rack);
  const wordMap = letterCounts(word.split(""));

  for (const [ch, needed] of wordMap.entries()) {
    if ((rackMap.get(ch) ?? 0) < needed) return false;
  }
  return true;
}

function basePoints(word: string) {
  const len = word.length;
  // Simple length-based scoring
  if (len <= 2) return 0;
  if (len === 3) return 1;
  if (len === 4) return 2;
  if (len === 5) return 4;
  if (len === 6) return 7;
  if (len === 7) return 10;
  return 14 + (len - 8) * 2; // 8+ letters scale
}

function formatTime(s: number) {
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function WordRushPage() {
  const DURATION = 60;

  // ✅ Prevent hydration mismatch: render a stable shell until mounted
  const [mounted, setMounted] = useState(false);

  // ✅ Deterministic initial state for SSR/first paint
  const [rack, setRack] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(DURATION);
  const [running, setRunning] = useState<boolean>(false);

  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [submitted, setSubmitted] = useState<SubmittedWord[]>([]);
  const [error, setError] = useState<string>("");

  const bestKey = "wordrush_best_v1";
  const [best, setBest] = useState<number>(0);

  const tickRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const usedWords = useMemo(
    () => new Set(submitted.map((s) => s.word)),
    [submitted],
  );

  useEffect(() => {
    setMounted(true);

    // ✅ Random rack only after mount (client-only)
    setRack(genRack(9));

    // ✅ localStorage only after mount
    try {
      const v = localStorage.getItem(bestKey);
      if (v) setBest(Number(v) || 0);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!running) return;

    tickRef.current = window.setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);

    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      tickRef.current = null;
    };
  }, [running]);

  useEffect(() => {
    if (timeLeft === 0 && running) {
      setRunning(false);
      setError("");
      setInput("");

      // save best
      setBest((b) => {
        const next = Math.max(b, score);
        try {
          localStorage.setItem(bestKey, String(next));
        } catch {
          // ignore
        }
        return next;
      });
    }
  }, [timeLeft, running, score]);

  function start() {
    setRack(genRack(9));
    setTimeLeft(DURATION);
    setScore(0);
    setStreak(0);
    setSubmitted([]);
    setError("");
    setInput("");
    setRunning(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function resetRound() {
    setRunning(false);
    setRack(genRack(9));
    setTimeLeft(DURATION);
    setScore(0);
    setStreak(0);
    setSubmitted([]);
    setError("");
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function shuffleRack() {
    if (running) {
      // shuffle only (no change in letters)
      setRack((r) => {
        const a = [...r];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      });
    } else {
      setRack(genRack(9));
    }
  }

  function submitWord() {
    setError("");

    if (!running) {
      setError("Press Start to play.");
      return;
    }

    const w = input
      .toUpperCase()
      .trim()
      .replace(/[^A-Z]/g, "");
    if (w.length < 3) {
      setError("Word must be at least 3 letters.");
      setStreak(0);
      return;
    }

    if (!canBuildWord(w, rack)) {
      setError("You can only use letters from the rack.");
      setStreak(0);
      return;
    }

    if (usedWords.has(w)) {
      setError("Already used that word.");
      setStreak(0);
      return;
    }

    const base = basePoints(w);
    if (base <= 0) {
      setError("That word is too short.");
      setStreak(0);
      return;
    }

    // Streak bonus: +10% per streak (capped)
    const nextStreak = streak + 1;
    const bonusMult = 1 + Math.min(0.5, nextStreak * 0.1); // cap at +50%
    const pts = Math.round(base * bonusMult);

    setScore((s) => s + pts);
    setStreak(nextStreak);
    setSubmitted((list) => [{ word: w, points: pts, time: timeLeft }, ...list]);
    setInput("");
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitWord();
    } else if (e.key === "Escape") {
      setInput("");
      setError("");
    }
  }

  const ended = !running && timeLeft === 0;

  // ✅ Stable SSR/first render output to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-dvh bg-zinc-950 text-zinc-100 grid place-items-center">
        <div className="text-sm text-zinc-400">Loading Word Rush…</div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Word Rush</h1>
          <p className="text-sm text-zinc-400">
            Build words using only the rack letters. Press{" "}
            <span className="text-zinc-200">Enter</span> to submit.
          </p>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-zinc-400">Time</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">
              {formatTime(timeLeft)}
            </div>
            <div className="mt-3 text-xs text-zinc-400">Best</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">
              {best}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-zinc-400">Score</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">
              {score}
            </div>
            <div className="mt-3 text-xs text-zinc-400">Streak</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">
              {streak}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-zinc-400">Controls</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={start}
                className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
              >
                Start
              </button>
              <button
                onClick={resetRound}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                Reset
              </button>
              <button
                onClick={shuffleRack}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                Shuffle Rack
              </button>
            </div>

            {ended && (
              <div className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
                Time’s up. Final score:{" "}
                <span className="font-semibold">{score}</span>
              </div>
            )}
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium">Letter Rack</div>
              <div className="text-xs text-zinc-400">
                Use these letters only (repeat a letter only if it appears
                multiple times).
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {rack.map((ch, idx) => (
              <div
                key={`${ch}-${idx}`}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/20 text-lg font-semibold"
                title={ch}
              >
                {ch}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setError("");
                setInput(e.target.value);
              }}
              onKeyDown={onKeyDown}
              placeholder="Type a word…"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
              disabled={!running}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              onClick={submitWord}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 disabled:opacity-50"
              disabled={!running}
            >
              Submit
            </button>
          </div>

          {error && <div className="mt-2 text-sm text-red-300">{error}</div>}

          <div className="mt-3 text-xs text-zinc-400">
            Scoring: 3 letters = 1, 4 = 2, 5 = 4, 6 = 7, 7 = 10, 8+ scales.
            Streak adds up to +50%.
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Submitted Words</div>
            <div className="text-xs text-zinc-400">
              {submitted.length} total
            </div>
          </div>

          {submitted.length === 0 ? (
            <div className="mt-3 text-sm text-zinc-400">No words yet.</div>
          ) : (
            <ul className="mt-3 space-y-2">
              {submitted.slice(0, 20).map((s) => (
                <li
                  key={s.word}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold">{s.word}</span>
                    <span className="text-xs text-zinc-400">
                      ({s.word.length} letters)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-zinc-300 tabular-nums">
                      +{s.points}
                    </span>
                    <span className="text-xs text-zinc-500 tabular-nums">
                      {s.time}s left
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="mt-8 text-xs text-zinc-500">
          Portfolio tip: add a “daily rack” mode + Supabase leaderboard to make
          this look production-ready.
        </footer>
      </div>
    </div>
  );
}
