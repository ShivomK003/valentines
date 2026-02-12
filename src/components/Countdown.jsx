import React, { useMemo } from "react";
import { getCountdownParts, pad2 } from "../utils/time.js";

function TimeBox({ value, label }) {
  return (
    <div className="timeBox" aria-label={label}>
      <div className="num">{value}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export default function Countdown({ remainingMs }) {
  const parts = useMemo(() => getCountdownParts(remainingMs), [remainingMs]);

  return (
    <div className="countdown" aria-live="polite">
      <TimeBox value={parts.days} label="Days" />
      <TimeBox value={pad2(parts.hours)} label="Hours" />
      <TimeBox value={pad2(parts.minutes)} label="Minutes" />
      <TimeBox value={pad2(parts.seconds)} label="Seconds" />
    </div>
  );
}
