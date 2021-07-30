import React from "react";
import Timer from "./Timer";

export default function SetDuration({
  sessionVars,
  setFocusDuration,
  setBreakDuration,
}) {
  return (
    <div className="row">
      <div className="col">
        <Timer
          sessionType="focus"
          sessionVars={sessionVars}
          setFocusDuration={setFocusDuration}
          setBreakDuration={setBreakDuration}
        />
      </div>
      <div className="col">
        <Timer
          sessionType="break"
          sessionVars={sessionVars}
          setFocusDuration={setFocusDuration}
          setBreakDuration={setBreakDuration}
        />
      </div>
    </div>
  );
}
