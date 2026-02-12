import React, { useRef, useState } from "react";
import RunawayNoButton from "./RunawayNoButton.jsx";

export default function ValentineSection({ onYes }) {
  const [toast, setToast] = useState("");
  const yesRef = useRef(null);

  return (
    <div className="valSection">
      <h2 className="valTitle">Will you be my Valentine? 💘</h2>
      <p className="valSub">(The “No” option is… having issues.)</p>

      <div className="actions" style={{ marginTop: 14, marginRight: 75 }}>
        <button ref={yesRef} className="btn primary" type="button" onClick={onYes}>
          Yes 💖
        </button>

        <RunawayNoButton
          label="No 🙃"
          anchorRef={yesRef}
          onTaunt={setToast}
          onYes={onYes}
          tauntLimit={8} // <- change this to how many “escapes” you want
        />
      </div>

      <div className="toast">{toast}</div>
    </div>
  );
}
