# Welcome to use-remaining-time 👋

[![Version](https://img.shields.io/npm/v/use-remaining-time.svg)](https://www.npmjs.com/package/use-remaining-time)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/b1ondie96/use-remaining-time#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/b1ondie96/use-remaining-time/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/b1ondie96/use-remaining-time)](https://github.com/b1ondie96/use-remaining-time/blob/master/LICENSE)

> React hook that returns remaining time in hh:mm:ss format

## Install

```sh
npm i use-remaining-time
```

## Example

```jsx
const Timer = () => {
  const hourCountdown = Math.round(
    (Date.now() - Date.now() - 60 * 60 * 1000) / 1000
  );
  const { timeString, secondsRemaining, isPaused, resetTimer, setIsPaused } =
    useRemainingTime(hourCountdown, false, () =>
      console.log("Countdown finished")
    );
  return (
    <div>
      <h1>Countdown: {timeString}</h1>
      <button onClick={resetTimer}>Reset countdown</button>
      <button onClick={() => setIsPaused(true)}>Pause countdown</button>
    </div>
  );
};
```

## Show your support

Give a ⭐️ if this project helped you!
