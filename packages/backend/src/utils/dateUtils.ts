export function getTodayName(): string {
  return new Date().toLocaleString("en-US", { weekday: "long", timeZone: "Asia/Jerusalem" });
}

export function isShabbat(): boolean {
  return getTodayName() === "Saturday";
}
