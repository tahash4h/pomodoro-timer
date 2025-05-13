'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles/timer.module.css';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [customMinutes, setCustomMinutes] = useState<string>('25');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeLeft]);

  const formatTime = (seconds: number): React.ReactNode => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return (
      <>
        <span>{hours.toString().padStart(2, '0')}</span>
        <span>:</span>
        <span>{minutes.toString().padStart(2, '0')}</span>
        <span>:</span>
        <span>{secs.toString().padStart(2, '0')}</span>
      </>
    );
  };

  const handleStart = (): void => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = (): void => {
    setIsPaused(true);
  };

  const handleResume = (): void => {
    setIsPaused(false);
  };

  const handleStop = (): void => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(parseInt(customMinutes) * 60);
  };

  const handleCustomTime = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const minutes = parseInt(customMinutes);
    if (!isNaN(minutes) && minutes > 0) {
      setTimeLeft(minutes * 60);
      setIsRunning(false);
      setIsPaused(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pomodoro</h1>
      
      <div className={styles.timerContainer}>
        <div className={styles.timer}>
          {formatTime(timeLeft)}
        </div>
        
        <div className={styles.buttonContainer}>
          {!isRunning ? (
            <button
              onClick={handleStart}
              className={styles.primaryButton}
            >
              Start
            </button>
          ) : isPaused ? (
            <button
              onClick={handleResume}
              className={styles.primaryButton}
            >
              Resume
            </button>
          ) : (
            <button
              onClick={handlePause}
              className={styles.primaryButton}
            >
              Pause
            </button>
          )}
          <button
            onClick={handleStop}
            className={styles.secondaryButton}
          >
            Stop
          </button>
        </div>

        <form onSubmit={handleCustomTime} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="number"
              min="1"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              className={styles.input}
              placeholder="Enter minutes (e.g., 90 for 1h 30m)"
            />
            <button
              type="submit"
              className={styles.primaryButton}
            >
              Set Time
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
