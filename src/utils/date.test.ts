import { describe, it, expect } from 'vitest';
import { getLocalDateString } from './date';

describe('getLocalDateString', () => {
  it('formats a given date as local YYYY-MM-DD', () => {
    expect(getLocalDateString(new Date(2026, 7, 31, 15, 30))).toBe('2026-08-31'); // month is 0-indexed
  });

  it('pads single-digit months and days', () => {
    expect(getLocalDateString(new Date(2026, 0, 5, 0, 0))).toBe('2026-01-05');
  });

  it('reads local calendar fields, not UTC ones -- late-night local time stays the same local day', () => {
    // Deliberately not using toISOString() here: for a timezone east of
    // UTC, 23:30 local time is already the next UTC calendar day, which is
    // exactly the bug this helper exists to avoid (see CLAUDE.md's Daily
    // Challenge section). getLocalDateString must report the local date
    // regardless of what UTC date the same instant falls on.
    const lateLocalNight = new Date(2026, 7, 31, 23, 30);
    expect(getLocalDateString(lateLocalNight)).toBe('2026-08-31');
  });

  it('rolls over a year boundary correctly', () => {
    expect(getLocalDateString(new Date(2026, 11, 31, 23, 59))).toBe('2026-12-31');
  });
});
