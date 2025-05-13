'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(customMinutes * 60);
  };

  const handleCustomTime = (e) => {
    e.preventDefault();
    setTimeLeft(customMinutes * 60);
    setIsRunning(false);
    setIsPaused(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Pomodoro Timer</h1>
        
        <div className="text-center mb-8">
          <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Start
              </button>
            ) : isPaused ? (
              <button
                onClick={handleResume}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Resume
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Pause
              </button>
            )}
            <button
              onClick={handleStop}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Stop
            </button>
          </div>
        </div>

        <form onSubmit={handleCustomTime} className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              max="60"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter minutes"
            />
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
              Set Time
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 