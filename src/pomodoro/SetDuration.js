import React from "react";
import { minutesToDuration } from "../utils/duration";

export default function SetDuration({ sessionVars }) {
  //console.log(`Svars`, sessionVars)

  return (
    <div className="row">
      <div className="col">
        <Timer sessionType="focus" sessionVars={sessionVars} />
      </div>
      <div className="col">
        <Timer sessionType="break" sessionVars={sessionVars} />
      </div>
    </div>
  );
}
