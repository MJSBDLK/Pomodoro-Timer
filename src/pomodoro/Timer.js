import React from "react";
import { minutesToDuration } from "../utils/duration";

export default function Timer({
  sessionType,
  sessionVars,
  setFocusDuration,
  setBreakDuration,
}) {
  const handleFocusDecrease = () => {
    setFocusDuration((currentDuration) => Math.max(5, currentDuration - 5));
  };
  const handleFocusIncrease = () => {
    setFocusDuration((currentDuration) => Math.min(60, currentDuration + 5));
  };
  const handleBreakDecrease = () => {
    setBreakDuration((currentDuration) => Math.max(1, currentDuration - 1));
  };
  const handleBreakIncrease = () => {
    setBreakDuration((currentDuration) => Math.min(15, currentDuration + 1));
  };

  if (sessionType == "focus") {
    return (
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          Focus Duration: {minutesToDuration(sessionVars.focusDuration)}
        </span>
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={handleFocusDecrease}
            disabled={sessionVars.isTimerRunning}
          >
            <span className="oi oi-minus" />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={handleFocusIncrease}
            disabled={sessionVars.isTimerRunning}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    );
  } else if (sessionType == "break") {
    return (
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            Break Duration: {minutesToDuration(sessionVars.breakDuration)}
          </span>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              onClick={handleBreakDecrease}
              disabled={sessionVars.isTimerRunning}
            >
              <span className="oi oi-minus" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              onClick={handleBreakIncrease}
              disabled={sessionVars.isTimerRunning}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
