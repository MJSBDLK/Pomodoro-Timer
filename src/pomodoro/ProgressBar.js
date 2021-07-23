import {minutesToDuration, secondsToDuration} from "../utils/duration"

export default function ProgressBar({sessionVars}) {
    if (!sessionVars.sessionType) return null;
    return (
         <div>
            {/* This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
            <div className="row mb-2">
              <div className="col">
                {/* Update message below to include current session (Focusing or On Break) total duration */}
                <h2 data-testid="session-title">
                  {sessionVars.sessionType} for { minutesToDuration(sessionVars.duration) } minutes
                </h2>
                {/* TODO: Update message below correctly format the time remaining in the current session */}
                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(sessionVars.timeRemaining)} remaining
                </p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={sessionVars.progress} // TODO: Increase aria-valuenow as elapsed time increases
                    style={{ width: (sessionVars.progress)+"%" }} // TODO: Increase width % as elapsed time increases
                  />
                </div>
              </div>
            </div>
          </div>
    );
}