export default function sessionInfo(session, focusDuration, breakDuration, isTimerRunning) {
    const sessionObj = {
        sessionType:null,
        isTimerRunning:isTimerRunning,
        timeRemaining:null,
        focusDuration:focusDuration,
        breakDuration:breakDuration,
        progress:0
        //set duration below
    }

    if(!session) return sessionObj;

    sessionObj.sessionType = session.label;
    sessionObj.timeRemaining = session.timeRemaining;

    if(session.label === 'Focusing') {sessionObj.duration = focusDuration}
    else if(session.label === 'On Break') {sessionObj.duration = breakDuration}

    const duration = sessionObj.duration * 60; //console.log(`duration`, duration);
    const timeElapsed = duration - session.timeRemaining; //console.log(`timeElapsed`, timeElapsed);

    sessionObj.progress = (timeElapsed / duration) * 100
    
    return sessionObj;
}