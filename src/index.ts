import React from "react";
export interface UseTimerState {
  /** Time remaining as a hh:mm:ss string. */
  timeString: string;
  /** Time remaining in seconds. */
  secondsRemaining: number;
  /** Whether the timer is paused. */
  isPaused: boolean;

  /** Whether the timer should count down. */
  setIsPaused(value: boolean): void;
  /**
   * Reset the timer.
   *
   * @param pause Whether the timer should freeze after resetting.
   */
  resetTimer(pause?: boolean): void;
}
/**
 * @param initialSeconds Start of timer.
 * @param initialPaused Initial state, if true, the timer will not tick.
 * @param onCompleted Callback when timer hits 0 seconds remaining.
 */
export function useRemainingTime(
  initialSeconds: number,
  initialPaused: boolean,
  onCompleted?: () => void
): UseTimerState {
  const [secondsRemaining, setSecondsRemaining] = React.useState(
    Math.abs(initialSeconds)
  );
  const [timeString, setTimeString] = React.useState(
    formatTime(Math.abs(initialSeconds))
  );
  const [isPaused, setIsPaused] = React.useState(initialPaused);

  React.useEffect(() => {
    if (secondsRemaining > 0 && !isPaused) {
      const timer = setTimeout(() => {
        const nextTick = secondsRemaining - 1;
        setTimeString(formatTime(nextTick));
        setSecondsRemaining(nextTick);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (secondsRemaining === 0 && !isPaused) {
      setIsPaused(true);
      if (onCompleted) onCompleted();
    }
  }, [isPaused, secondsRemaining]);

  React.useEffect(() => {
    setTimeString(formatTime(Math.abs(initialSeconds)));
    setSecondsRemaining(Math.abs(initialSeconds));
    setIsPaused(initialPaused);
  }, [initialSeconds]);

  const resetTimer = React.useCallback(
    (pause: boolean = false) => {
      setSecondsRemaining(Math.abs(initialSeconds));
      setTimeString(formatTime(Math.abs(initialSeconds)));
      setIsPaused(pause);
    },
    [initialSeconds]
  );

  return {
    timeString,
    secondsRemaining,
    isPaused,
    setSecondsRemaining,
    setIsPaused,
    resetTimer,
  } as UseTimerState;
}

function formatTime(time: number) {
  const secondsRemaining = Math.abs(time);
  if (secondsRemaining === 0) return "00:00:00";
  const hours = Math.floor(secondsRemaining / (60 * 60));
  const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60);
  const seconds = Math.floor(secondsRemaining % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
export default useRemainingTime;
