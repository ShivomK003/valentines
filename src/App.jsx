import React, { useEffect, useMemo, useState } from "react";
import BackgroundHearts from "./components/BackgroundHearts.jsx";
import LockedScreen from "./components/LockedScreen.jsx";
import UnlockedScreen from "./components/UnlockedScreen.jsx";
import { msUntilUnlock, UNLOCK_IST } from "./utils/time.js";

const STORAGE_KEY = "valentine_unlock_override_v1";

export default function App() {
  const [now, setNow] = useState(Date.now());
  const [overrideUnlocked, setOverrideUnlocked] = useState(localStorage.getItem(STORAGE_KEY) === "true");

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);

  const remainingMs = useMemo(() => msUntilUnlock(now), [now]);
  const isUnlocked = overrideUnlocked || remainingMs <= 0;

  function devUnlock() {
    localStorage.setItem(STORAGE_KEY, "true");
    setOverrideUnlocked(true);
  }

  function resetOverride() {
    localStorage.removeItem(STORAGE_KEY);
    setOverrideUnlocked(false);
  }

  return (
    <div className="page">
      <BackgroundHearts />

      <div className="container">
        <div className="card">
          <div className="topRow">
            <div>
              <h1>Hi Tanishi 💖</h1>
              {!isUnlocked && (
                <div>
                  <p className="sub">I have a surprise for you 😋😋</p>
                  <p className="sub"> Check the website again when the countdown ends!</p>
                </div>
              )}
            </div>

            {!isUnlocked && (
              <div className="pill" title="Unlock time is fixed to Asia/Kolkata (IST)">
                <span className="dot" />
                <span>
                  Unlocks: {UNLOCK_IST.day} Feb {UNLOCK_IST.year} • 12:00 AM (IST)
                </span>
              </div>
            )}
          </div>

          <div className="grid">
            <div className="panel">
              {!isUnlocked ? (
                <LockedScreen remainingMs={remainingMs} onDevUnlock={devUnlock} onReset={resetOverride} />
              ) : (
                <UnlockedScreen onReset={resetOverride} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
