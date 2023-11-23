export function getTodayAsYYYYMMDD() {
  const today = new Date();
  return (
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );
}

export function daysPassed(date: string) {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  // ms in a day = 1000ms * 60sec * 60min * 24hr
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
