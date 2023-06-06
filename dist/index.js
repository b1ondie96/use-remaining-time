"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRemainingTime = void 0;
const react_1 = __importDefault(require("react"));
/**
 * @param initialSeconds Start of timer.
 * @param initialPaused Initial state, if true, the timer will not tick.
 * @param onCompleted Callback when timer hits 0 seconds remaining.
 */
function useRemainingTime(initialSeconds, initialPaused, onCompleted) {
    const [secondsRemaining, setSecondsRemaining] = react_1.default.useState(Math.abs(initialSeconds));
    const [timeString, setTimeString] = react_1.default.useState(formatTime(Math.abs(initialSeconds)));
    const [isPaused, setIsPaused] = react_1.default.useState(initialPaused);
    react_1.default.useEffect(() => {
        if (secondsRemaining > 0 && !isPaused) {
            const timer = setTimeout(() => {
                const nextTick = secondsRemaining - 1;
                setTimeString(formatTime(nextTick));
                setSecondsRemaining(nextTick);
            }, 1000);
            return () => clearTimeout(timer);
        }
        else if (secondsRemaining === 0 && !isPaused) {
            setIsPaused(true);
            if (onCompleted)
                onCompleted();
        }
    }, [isPaused, secondsRemaining]);
    react_1.default.useEffect(() => {
        setTimeString(formatTime(Math.abs(initialSeconds)));
        setSecondsRemaining(Math.abs(initialSeconds));
    }, [initialSeconds]);
    const resetTimer = react_1.default.useCallback((pause = false) => {
        setSecondsRemaining(Math.abs(initialSeconds));
        setTimeString(formatTime(Math.abs(initialSeconds)));
        setIsPaused(pause);
    }, [initialSeconds]);
    return {
        timeString,
        secondsRemaining,
        isPaused,
        setSecondsRemaining,
        setIsPaused,
        resetTimer,
    };
}
exports.useRemainingTime = useRemainingTime;
function formatTime(time) {
    const secondsRemaining = Math.abs(time);
    if (secondsRemaining === 0)
        return "00:00:00";
    const hours = Math.floor(secondsRemaining / (60 * 60));
    const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60);
    const seconds = Math.floor(secondsRemaining % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
exports.default = useRemainingTime;
