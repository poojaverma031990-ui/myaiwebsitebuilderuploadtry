import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TARGET_IST_MS,
  determineTimeMode,
  formatCountdown,
  getRibbonText,
  getNoteCopy,
  getHeartCopy,
  BALLOON_BLESSINGS,
  WISH_JAR_STARS,
  isAllUnlocked,
} from './birthdayLogic';

test('determineTimeMode classifies EARLY, DAY, and AFTER in Asia/Kolkata timezone', () => {
  // 18 Nov 2026 23:59:50 IST -> EARLY
  const earlyMs = new Date('2026-11-18T23:59:50+05:30').getTime();
  assert.equal(determineTimeMode(earlyMs), 'EARLY');

  // 19 Nov 2026 00:00:00 IST -> DAY
  assert.equal(determineTimeMode(TARGET_IST_MS), 'DAY');

  // 19 Nov 2026 23:30:00 IST -> DAY
  const lateDayMs = new Date('2026-11-19T23:30:00+05:30').getTime();
  assert.equal(determineTimeMode(lateDayMs), 'DAY');

  // 20 Nov 2026 00:00:01 IST -> AFTER
  const afterMs = new Date('2026-11-20T00:00:01+05:30').getTime();
  assert.equal(determineTimeMode(afterMs), 'AFTER');
});

test('formatCountdown formats exact days, hours, minutes, seconds', () => {
  const sampleNow = TARGET_IST_MS - (1 * 86400 + 4 * 3600 + 22 * 60 + 10) * 1000;
  assert.equal(formatCountdown(sampleNow), '🎂 1d 04h 22m 10s until your day');
});

test('getRibbonText returns appropriate ribbon per mode', () => {
  assert.equal(getRibbonText('DAY'), "IT'S YOUR DAY 🎉");
  assert.equal(getRibbonText('AFTER'), "the 19th passed, but wishes don't expire 💛");
});

test('getNoteCopy and getHeartCopy return exact required strings', () => {
  assert.ok(getNoteCopy('EARLY').startsWith("Dear Akshita — your bio said 'you can wish me on 19_NOV'"));
  assert.ok(getNoteCopy('DAY').startsWith("Dear Akshita — it's the 19th."));
  assert.ok(getNoteCopy('AFTER').startsWith('a little late, entirely wholehearted —'));
  assert.ok(getHeartCopy('EARLY').includes("given a little early, because good wishes shouldn't wait."));
  assert.ok(getHeartCopy('DAY').includes('right on time.'));
});

test('BALLOON_BLESSINGS and WISH_JAR_STARS have 5 items and isAllUnlocked checks completion', () => {
  assert.equal(BALLOON_BLESSINGS.length, 5);
  assert.equal(WISH_JAR_STARS.length, 5);
  assert.equal(isAllUnlocked({ 0: true, 1: true, 2: false, 3: true, 4: true }, 5), false);
  assert.equal(isAllUnlocked({ 0: true, 1: true, 2: true, 3: true, 4: true }, 5), true);
});

