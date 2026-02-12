import React from "react";
import Countdown from "./Countdown.jsx";

export default function LockedScreen({ remainingMs, onDevUnlock, onReset }) {
  return (
    <div>
      <div className="lockRow">
        <span>🔒</span>
        <div>
          <strong>Locked</strong> until
        </div>
      </div>

      <Countdown remainingMs={remainingMs} />

      <div className="actions">
        {/* REMOVE THIS BUTTON BEFORE YOU SEND IT */}
        <button className="btn ghost" onClick={onDevUnlock} type="button">
          (Dev) Test Unlock
        </button>
      </div>
    </div>
  );
}
