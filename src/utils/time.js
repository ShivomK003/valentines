// Unlock moment: 14 Feb 2026 00:00:00 IST
export const UNLOCK_IST = {
  year: 2026,
  month: 2,
  day: 14,
  hour: 0,
  minute: 0,
  second: 0,
};

// IST offset = UTC + 5:30
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

export function unlockMomentMs() {
  // Construct a UTC time from the IST components, then shift back by IST offset
  // because IST = UTC + 5:30  =>  UTC = IST - 5:30
  const utcMs = Date.UTC(
    UNLOCK_IST.year,
    UNLOCK_IST.month - 1,
    UNLOCK_IST.day,
    UNLOCK_IST.hour,
    UNLOCK_IST.minute,
    UNLOCK_IST.second,
  );
  return utcMs - IST_OFFSET_MS;
}

export function msUntilUnlock(nowMs = Date.now()) {
  return unlockMomentMs() - nowMs;
}

export function getCountdownParts(ms) {
  const total = Math.max(0, ms);
  const sec = Math.floor(total / 1000);

  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  return { days, hours, minutes, seconds };
}

export function pad2(n) {
  return String(n).padStart(2, "0");
}
