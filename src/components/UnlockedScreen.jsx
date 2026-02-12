import React, { useState } from "react";
import ValentineSection from "./ValentineSection.jsx";
import MessagePlaceholder from "./MessagePlaceholder.jsx";
import FloatingPhotos from "./FloatingPhotos.jsx";

export default function UnlockedScreen({ onReset }) {
  const [answer, setAnswer] = useState(null); // "yes" | "no" | null

  return (
    <div className="cardWrap">
      {answer === null && (
        <div>
          <div className="lockRow">
            <span>🔓</span>
            <div>
              <strong>Unlocked</strong>
            </div>
          </div>
          <ValentineSection onYes={() => setAnswer("yes")} onNo={() => setAnswer("no")} />
        </div>
      )}

      {/* Add an images here */}
      {answer !== null && <FloatingPhotos />}

      <MessagePlaceholder answer={answer} />

      <button className="btn ghost" onClick={onReset} type="button">
        Reset
      </button>
    </div>
  );
}
