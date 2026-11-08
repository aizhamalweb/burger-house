export function progressToTime(progress, duration) {
  if (!Number.isFinite(duration) || duration <= 0) return 0
  return Math.min(1, Math.max(0, progress)) * Math.max(0, duration - 0.04)
}
