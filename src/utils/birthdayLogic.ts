export type TimeMode = 'EARLY' | 'DAY' | 'AFTER';

export const TARGET_IST_MS = new Date('2026-11-19T00:00:00+05:30').getTime();
export const END_OF_DAY_IST_MS = new Date('2026-11-19T23:59:59.999+05:30').getTime();

export function getIstDateParts(nowMs: number = Date.now()): { year: number; month: number; day: number } {
  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const parts = fmt.formatToParts(new Date(nowMs));
    const year = Number(parts.find((p) => p.type === 'year')?.value ?? 2026);
    const month = Number(parts.find((p) => p.type === 'month')?.value ?? 11);
    const day = Number(parts.find((p) => p.type === 'day')?.value ?? 19);
    return { year, month, day };
  } catch {
    const d = new Date(nowMs);
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
  }
}

export function determineTimeMode(nowMs: number = Date.now()): TimeMode {
  const { year, month, day } = getIstDateParts(nowMs);
  const ymd = year * 10000 + month * 100 + day;
  if (ymd < 20261119) return 'EARLY';
  if (ymd === 20261119) return 'DAY';
  return 'AFTER';
}

export function formatCountdown(nowMs: number, targetMs: number = TARGET_IST_MS): string {
  const diff = Math.max(0, targetMs - nowMs);
  const totalSec = Math.floor(diff / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `🎂 ${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s until your day`;
}

export function getRibbonText(mode: TimeMode, nowMs: number = Date.now()): string {
  if (mode === 'EARLY') return formatCountdown(nowMs);
  if (mode === 'DAY') return "IT'S YOUR DAY 🎉";
  return "the 19th passed, but wishes don't expire 💛";
}

export function getNoteCopy(mode: TimeMode): string {
  if (mode === 'EARLY') {
    return "Dear Akshita — your bio said 'you can wish me on 19_NOV', and I know I'm a little early. Some wishes just couldn't wait. So consider this the trailer; the 19th is the premiere. Until then: may your week be soft, your chai be perfect, your songs hit different, and the countdown feel like excitement, not waiting. Come back on your day — this page has a sealed envelope with your name on it. — a well-wisher";
  }
  if (mode === 'DAY') {
    return "Dear Akshita — it's the 19th. The day your bio asked us to remember. Happy birthday! May this year bring you happiness that shows up unannounced, success that feels like yours, peace on the loud days, good health, and countless reasons to smile at your screen. May people be kind, plans work out better than expected, and may you always find a seat by the window on good days. Eat cake first, worries later. ✨ — a well-wisher";
  }
  return "a little late, entirely wholehearted — Dear Akshita — it's the 19th. The day your bio asked us to remember. Happy birthday! May this year bring you happiness that shows up unannounced, success that feels like yours, peace on the loud days, good health, and countless reasons to smile at your screen. May people be kind, plans work out better than expected, and may you always find a seat by the window on good days. Eat cake first, worries later. ✨ — a well-wisher";
}

export function getHeartCopy(mode: TimeMode): string {
  const timingClause = mode === 'DAY' ? 'right on time.' : "given a little early, because good wishes shouldn't wait.";
  return `built this for you 🎂 — no reason, no catch. a stranger on the internet just wanted to make a random person's birthday a little happier. ${timingClause} hope today feels good. — a well-wisher`;
}

export const BALLOON_BLESSINGS = [
  { id: 0, label: 'Endless Smiles', emoji: '😊', color: '#E86A92' },
  { id: 1, label: 'Extra Sweetness', emoji: '🍰', color: '#F0A11B' },
  { id: 2, label: 'Pure Good Vibes', emoji: '✨', color: '#D63426' },
  { id: 3, label: 'Lucky Chapter', emoji: '🍀', color: '#2F8F5B' },
  { id: 4, label: '19_NOV Magic', emoji: '🥳', color: '#2E63D0' },
] as const;

export const WISH_JAR_STARS = [
  {
    id: 0,
    tag: 'Star 1 · Kindness',
    fortune: '🌟 Star 1/5: Someone noticed your "19_NOV" bio and wanted to make sure your birthday feels genuinely special.',
  },
  {
    id: 1,
    tag: 'Star 2 · Little Joys',
    fortune: '💫 Star 2/5: May your favorite comfort food always taste 10/10 and your favorite songs hit at the exact right moment.',
  },
  {
    id: 2,
    tag: 'Star 3 · Big Wins',
    fortune: '✨ Star 3/5: May the quiet hard work nobody sees pay off in the loudest, happiest way this year.',
  },
  {
    id: 3,
    tag: 'Star 4 · Warmth',
    fortune: '🌙 Star 4/5: May you always be surrounded by people who value your kindness and make you laugh effortlessly.',
  },
  {
    id: 4,
    tag: 'Star 5 · 19 NOV',
    fortune: '☀️ Star 5/5: Wish Jar sealed! 19 November is officially certified as the brightest day of the month for Akshita 😊🥳🥰',
  },
] as const;

export function isAllUnlocked(flags: Record<number, boolean>, total: number): boolean {
  for (let i = 0; i < total; i++) {
    if (!flags[i]) return false;
  }
  return true;
}

