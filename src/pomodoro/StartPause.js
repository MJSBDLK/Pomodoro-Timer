import React from "react";
import classNames from "../utils/class-names";

export default function StartPause({sessionVars, setSession, setIsTimerRunning}) {
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: sessionVars.focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  function stopSession() {
    setIsTimerRunning(false)
    setSession(null)
  }

  return (
    <div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          <button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={playPause}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !sessionVars.isTimerRunning,
                "oi-media-pause": sessionVars.isTimerRunning,
              })}
            />
          </button>
          {/* Stop Button - sessionType returns truthy if there is an active session,
          and falsy if not. so disabled returns truthy if(activeSession), and falsy
          if not */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="stop"
            title="Stop the session"
            onClick={stopSession}
            disabled={!sessionVars.sessionType}
          >
            <span className="oi oi-media-stop" />
          </button>
        </div>
      </div>
    </div>
  );
}
