import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const EDGE_PAD = 14;
const SCALE_MIN = 0.78;
const SCALE_MAX = 1.28;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function RunawayNoButton({ label = "No 🙃", anchorRef, onTaunt, onYes, tauntLimit = 8 }) {
  const btnRef = useRef(null);
  const didInitialHomeRef = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [phase, setPhase] = useState("in"); // "in" | "out"
  const [moves, setMoves] = useState(0);

  const [converted, setConverted] = useState(false); // becomes Yes at end

  const taunts = useMemo(
    () => [
      "Nope 😇",
      "Chal chal 😂",
      "Yeh wala option galat hai 🙃",
      "Choose the pink one 😭",
      "Aw cutie thought she has a out 😌",
      "Hehe nope 💞",
      "Nahi Milega 💘",
    ],
    [],
  );

  function measureBtnAtScale(s) {
    const el = btnRef.current;
    const w = el?.offsetWidth ?? 120;
    const h = el?.offsetHeight ?? 44;
    return { w: w * s, h: h * s };
  }

  function safeRandomPosition(nextScale) {
    const { w, h } = measureBtnAtScale(nextScale);
    const maxX = window.innerWidth - w - EDGE_PAD;
    const maxY = window.innerHeight - h - EDGE_PAD;

    return {
      x: clamp(rand(EDGE_PAD, Math.max(EDGE_PAD, maxX)), EDGE_PAD, Math.max(EDGE_PAD, maxX)),
      y: clamp(rand(EDGE_PAD, Math.max(EDGE_PAD, maxY)), EDGE_PAD, Math.max(EDGE_PAD, maxY)),
    };
  }

  function homePosition(nextScale = 1) {
    const anchor = anchorRef?.current;
    const { w, h } = measureBtnAtScale(nextScale);

    if (!anchor) return safeRandomPosition(nextScale);

    const r = anchor.getBoundingClientRect();
    let x = r.right + 12;
    let y = r.top + r.height / 2 - h / 2;

    const maxX = window.innerWidth - w - EDGE_PAD;
    const maxY = window.innerHeight - h - EDGE_PAD;

    return {
      x: clamp(x, EDGE_PAD, Math.max(EDGE_PAD, maxX)),
      y: clamp(y, EDGE_PAD, Math.max(EDGE_PAD, maxY)),
    };
  }

  function convertToYesAtHome() {
    // snap back beside yes, normalize scale, and convert
    setPhase("out");
    setTimeout(() => {
      setScale(1);
      setPos(homePosition(1));
      setPhase("in");
      setConverted(true);
      onTaunt?.("Okay okay 😳 you can click yes now.");
    }, 120);
  }

  function teleportOrFinish() {
    if (converted) return;

    const nextMoves = moves + 1;

    // If we're at/over limit, end beside Yes and convert to Yes
    if (nextMoves >= tauntLimit) {
      setMoves(nextMoves);
      convertToYesAtHome();
      return;
    }

    // otherwise teleport
    const nextScale = rand(SCALE_MIN, SCALE_MAX);

    setPhase("out");
    setTimeout(() => {
      setScale(nextScale);
      setPos(safeRandomPosition(nextScale));
      setPhase("in");
      setVisible(true);

      setMoves(nextMoves);
      const idx = Math.min(taunts.length - 1, nextMoves - 1);
      onTaunt?.(taunts[idx] ?? taunts[taunts.length - 1]);
    }, 90);
  }

  // mount portal
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // initial home placement ONCE
  useLayoutEffect(() => {
    if (!mounted) return;
    if (didInitialHomeRef.current) return;

    let cancelled = false;

    const placeOnce = (attempt = 0) => {
      if (cancelled) return;

      const anchor = anchorRef?.current;
      const rect = anchor?.getBoundingClientRect();
      const anchorReady = rect && rect.width > 0 && rect.height > 0;

      if (anchorReady && btnRef.current) {
        setScale(1);
        setPos(homePosition(1));
        setPhase("in");
        setVisible(true);
        didInitialHomeRef.current = true;
        return;
      }

      if (attempt < 20) {
        requestAnimationFrame(() => placeOnce(attempt + 1));
      } else {
        setScale(1);
        setPos(safeRandomPosition(1));
        setVisible(true);
        didInitialHomeRef.current = true;
      }
    };

    requestAnimationFrame(() => requestAnimationFrame(() => placeOnce(0)));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // clamp on resize only
  useLayoutEffect(() => {
    function onResize() {
      setPos((p) => {
        const { w, h } = measureBtnAtScale(scale);
        const maxX = window.innerWidth - w - EDGE_PAD;
        const maxY = window.innerHeight - h - EDGE_PAD;
        return {
          x: clamp(p.x, EDGE_PAD, Math.max(EDGE_PAD, maxX)),
          y: clamp(p.y, EDGE_PAD, Math.max(EDGE_PAD, maxY)),
        };
      });
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scale]);

  if (!mounted) return null;

  return createPortal(
    <button
      ref={btnRef}
      type="button"
      className={`btn ${converted ? "primary" : "ghost"} runawayNo`}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 9999,
        visibility: visible ? "visible" : "hidden",
        opacity: visible ? (phase === "out" ? 0 : 1) : 0,
        transform: phase === "out" ? `scale(${scale * 0.88})` : `scale(${scale})`,
        transition: "opacity 90ms ease, transform 90ms ease",
        willChange: "left, top, opacity, transform",
        userSelect: "none",
        touchAction: "manipulation",
      }}
      onMouseEnter={(e) => {
        e.preventDefault();
        teleportOrFinish();
      }}
      onPointerEnter={(e) => {
        e.preventDefault();
        teleportOrFinish();
      }}
      onFocus={(e) => {
        e.preventDefault();
        teleportOrFinish();
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        teleportOrFinish();
      }}
      onClick={(e) => {
        e.preventDefault();
        if (converted) {
          onYes?.(); // ✅ becomes a Yes button at the end
        } else {
          teleportOrFinish();
        }
      }}>
      {converted ? "Yes 💖" : label}
    </button>,
    document.body,
  );
}
