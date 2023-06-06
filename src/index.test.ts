/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import useRemainingTime from ".";
jest.useFakeTimers();
describe("initial state", () => {
  it("should set secondsRemaining", () => {
    const { result } = renderHook(() => useRemainingTime(10, false));
    expect(result.current.secondsRemaining).toBe(10);
  });
  it("should set timeString", () => {
    const { result } = renderHook(() => useRemainingTime(-10, false));
    expect(result.current.timeString).toBe("00:00:10");
  });
  it("should set isPaused", () => {
    const { result } = renderHook(() => useRemainingTime(-10, true));
    expect(result.current.isPaused).toBe(true);
  });
});
describe("time string", () => {
  it("timeString should be 00:00:00", () => {
    const { result } = renderHook(() => useRemainingTime(0, false));
    expect(result.current.timeString).toBe("00:00:00");
  });
  it("timeString should be 00:06:00", () => {
    const { result } = renderHook(() => useRemainingTime(360, false));
    expect(result.current.timeString).toBe("00:06:00");
  });
  it("timeString should be 00:05:59", () => {
    const { result } = renderHook(() => useRemainingTime(-360, false));
    expect(result.current.timeString).toBe("00:06:00");
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.timeString).toBe("00:05:59");
  });
});
describe("timer", () => {
  it("timer should tick every second", () => {
    const { result } = renderHook(() => useRemainingTime(3, false));

    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.secondsRemaining).toBe(2);
    expect(result.current.timeString).toBe("00:00:02");
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.secondsRemaining).toBe(1);
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.secondsRemaining).toBe(0);
    expect(result.current.isPaused).toBe(true);
  });
  it("timer should be paused on 0 seconds remaining", () => {
    const { result } = renderHook(() => useRemainingTime(1, false));
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.isPaused).toBe(true);
  });
  it("should call onCompleted on 0 seconds", () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useRemainingTime(0, false, fn));
    expect(fn).toHaveBeenCalled();
  });
  it("should reset", () => {
    const { result } = renderHook(() => useRemainingTime(5, false));
    expect(result.current.secondsRemaining).toBe(5);
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.secondsRemaining).toBe(4);
    act(() => result.current.resetTimer());
    expect(result.current.secondsRemaining).toBe(5);
  });
  it("should pause", () => {
    const { result } = renderHook(() => useRemainingTime(5, false));
    expect(result.current.secondsRemaining).toBe(5);
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.secondsRemaining).toBe(4);
    act(() => result.current.setIsPaused(true));
    act(() => jest.advanceTimersByTime(1000));
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.secondsRemaining).toBe(4);
  });
});
