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
  const hourCountdown = 60 * 60;
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

### Configuration

Hook takes folowing options

| Name             | Type      | Description                                             |
| ---------------- | --------- | ------------------------------------------------------- |
| `initialSeconds` | Number    | Start of timer in second                                |
| `initialPaused`  | Boolean   | Initial pause state                                     |
| `onComplete`     | Function? | Callback when timer hits 0 seconds remaining (optional) |

### Properties

Hook returns following properties:

| Name               | Type     | Description                                                                 |
| ------------------ | -------- | --------------------------------------------------------------------------- |
| `timeString`       | String   | Time remaining in hh:mm:ss format                                           |
| `secondsRemaining` | Number   | The time remaining in seconds                                               |
| `isPaused`         | Boolean  | Whether the timer is currently ticking down                                 |
| `setIsPaused`      | Function | Function to pause or resume timer. Requires `boolean` parameter             |
| `resetTimer`       | Function | A function to reset timer to `initialSeconds` accepts `boolean` parameter . |

## Show your support

Give a ⭐️ if this project helped you!
