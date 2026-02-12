import React, { useMemo } from "react";

export default function BackgroundHearts() {
  const hearts = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 26; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        delay: -(Math.random() * 8),
        dur: 10 + Math.random() * 14,
        size: 10 + Math.random() * 16,
        opacity: 0.12 + Math.random() * 0.22,
      });
    }
    return arr;
  }, []);

  return (
    <div className="hearts" aria-hidden="true">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}vw`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.dur}s`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            opacity: h.opacity,
          }}
        />
      ))}
    </div>
  );
}
