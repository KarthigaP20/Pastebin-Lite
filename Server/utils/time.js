

export function calculateExpiry(seconds) {
  if (!seconds) return null;

  const now = new Date();
  return new Date(now.getTime() + seconds * 1000);
}
