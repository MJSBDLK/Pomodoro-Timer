import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration, secondsToDuration} from "../utils/duration"
import sessionInfo from "./sessionInfo.js"
import ProgressBar from "./ProgressBar.js"
import SetDuration from "./SetDuration.js"
import StartPause from "./StartPause.js"

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  // Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const sessionVars = sessionInfo(session, focusDuration, breakDuration, isTimerRunning)

  // Custom hook that invokes the callback function every second
  // Note: You will not need to make changes to the callback function
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  // Called whenever the play/pause button is clicked.




  return (
    <div className="pomodoro">
      <SetDuration sessionVars={sessionVars} setFocusDuration={setFocusDuration} setBreakDuration={setBreakDuration} />
      <StartPause sessionVars={sessionVars} setSession={setSession} setIsTimerRunning={setIsTimerRunning} />
      <ProgressBar sessionVars={sessionVars} session={session} />
    </div>
  );
}

export default Pomodoro;
