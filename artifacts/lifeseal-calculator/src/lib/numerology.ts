// ─────────────────────────────────────────────────────────────
// Cosmic Numerology engine
// Implements the calculation methods from
// "Cosmic Numerology: A Biblical Approach"
// ─────────────────────────────────────────────────────────────

/** Letter → number chart (Pythagorean reduction of the AlephBet table, Ch. 10) */
export const LETTER_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
}

/** Sum the digits of a number once. e.g. 1998 → 27 */
export function digitSum(n: number): number {
  return Math.abs(n)
    .toString()
    .split('')
    .reduce((a, d) => a + Number(d), 0)
}

/**
 * Pythagorean reduction: keep adding digits until a single digit 1–9.
 * Master numbers 11 and 22 are NOT reduced (Ch. 10 — Echoes / Master Numbers).
 */
export function reduce(n: number, keepMasters = true): number {
  let v = Math.abs(n)
  while (v > 9) {
    if (keepMasters && (v === 11 || v === 22)) return v
    v = digitSum(v)
  }
  return v
}

/** Reduce fully to a single digit 1–9 (no master exception). */
export function reduceToDigit(n: number): number {
  let v = Math.abs(n)
  while (v > 9) v = digitSum(v)
  return v
}

export interface BirthDate {
  day: number   // 1–31
  month: number // 1–12
  year: number  // e.g. 1998
}

/**
 * LIFE SEAL (Ch. 12 & 14)
 * Sum of the reduced day + reduced month + reduced year, then reduced,
 * keeping 11 and 22 as Master Seals.
 * Book check: 16 Feb 1998 → (1+6)+(0+2)+(1+9+9+8) → 7+2+27 → 7+2+9 = 18 → 9 ✓
 */
export function lifeSeal(d: BirthDate): { value: number; steps: string[] } {
  const dayS = digitSum(d.day)
  const monS = digitSum(d.month)
  const yrS = digitSum(d.year)
  const dayR = reduceToDigit(dayS)
  const monR = reduceToDigit(monS)
  const yrR = reduceToDigit(yrS)
  const total = dayR + monR + yrR
  const value = reduce(total)
  const steps = [
    `Day ${d.day} → ${dayR}`,
    `Month ${d.month} → ${monR}`,
    `Year ${d.year} → ${yrS}${yrS !== yrR ? ` → ${yrR}` : ''}`,
    `${dayR} + ${monR} + ${yrR} = ${total}${total !== value ? ` → ${value}` : ''}`,
  ]
  return { value, steps }
}

/**
 * BLESSED SEAL (Ch. 31 — Business Numerology)
 * The day of your birth, reduced to a single digit.
 * Book check: born on the 16th → 1+6 = 7 ✓
 * (The 11th belongs to Seal 2 and the 22nd to Seal 4 in the book's
 * birth-day groupings, so no master exception applies here.)
 */
export function blessedSeal(day: number): { value: number; steps: string[] } {
  const value = reduceToDigit(day)
  const steps = [
    day > 9
      ? `Born on the ${day}${ordinal(day)} → ${day.toString().split('').join('+')} = ${value}`
      : `Born on the ${day}${ordinal(day)} → ${value}`,
  ]
  return { value, steps }
}

/**
 * SEAL OF YOUR NAME / Name Number (Ch. 9 & 17)
 * Sum of all letter values in the full name, reduced, keeping 11 / 22.
 * Book check: ISAAC OFFEI → 47 → 11 ✓
 */
export function nameNumber(fullName: string): {
  value: number
  total: number
  perLetter: { letter: string; value: number }[]
} {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '').split('')
  const perLetter = letters.map((letter) => ({ letter, value: LETTER_VALUES[letter] }))
  const total = perLetter.reduce((a, l) => a + l.value, 0)
  return { value: reduce(total), total, perLetter }
}

/**
 * PERSONAL YEAR NUMBER — PYN (Ch. 14)
 * Reduced birth day + reduced birth month + reduced current year, then
 * reduced, keeping 11 / 22 as Personal Master Years.
 * Book check: 16 Feb, year 2021 → 7+2+5 = 14 → 5 ✓ ; year 2027 → 7+2+2 = 11 ✓
 */
export function personalYear(
  d: BirthDate,
  currentYear: number
): { value: number; steps: string[] } {
  const dayR = reduceToDigit(digitSum(d.day))
  const monR = reduceToDigit(digitSum(d.month))
  const yrS = digitSum(currentYear)
  const yrR = reduceToDigit(yrS)
  const total = dayR + monR + yrR
  const value = reduce(total)
  const steps = [
    `Birth day ${d.day} → ${dayR}`,
    `Birth month ${d.month} → ${monR}`,
    `Year ${currentYear} → ${yrS}${yrS !== yrR ? ` → ${yrR}` : ''}`,
    `${dayR} + ${monR} + ${yrR} = ${total}${total !== value ? ` → ${value}` : ''}`,
  ]
  return { value, steps }
}

/**
 * SPIRITUAL DATE OF BIRTH / Spirit Day (Ch. 9)
 * Reduce the full birth date; results 1–9 and 10, 11, 12 are all valid and
 * point to a day-of-month = month number (e.g. 11 → 11th of November).
 * Book checks: 19 May 1976 → 10+5+23 → 1+5+5 = 11 → 11th Nov ✓
 *              8 Dec 1992 → 8+3+3 = 14 → 5 → 5th May ✓
 */
export function spiritDay(d: BirthDate): { value: number; date: string; steps: string[] } {
  const dayR = reduceToDigit(digitSum(d.day))
  const monR = reduceToDigit(digitSum(d.month))
  const yrR = reduceToDigit(digitSum(d.year))
  let total = dayR + monR + yrR
  const steps = [
    `Day ${d.day} → ${dayR}, Month ${d.month} → ${monR}, Year ${d.year} → ${yrR}`,
    `${dayR} + ${monR} + ${yrR} = ${total}`,
  ]
  while (total > 12) {
    const next = digitSum(total)
    steps.push(`${total} → ${next}`)
    total = next
  }
  const MONTHS = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const date = `${total}${ordinal(total)} of ${MONTHS[total]}`
  return { value: total, date, steps }
}

/**
 * YOUR SOUL'S DAY (Ch. 9)
 * The day of the week you were born (same weekday as conception).
 */
export function soulsDay(d: BirthDate): string {
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return DAYS[new Date(d.year, d.month - 1, d.day).getDay()]
}

/**
 * MOON ILLUMINATION (Ch. 33 — Business Series of Harmonics)
 * Percentage of the moon's face illuminated on a given date, from the
 * synodic cycle (29.53 days). The book counsels 70–100% for launches.
 */
export function moonIllumination(date: Date): number {
  const SYNODIC = 29.53058867
  const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14) // 6 Jan 2000, 18:14 UTC
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86400000
  const phase = ((days % SYNODIC) + SYNODIC) % SYNODIC
  return Math.round(((1 - Math.cos((2 * Math.PI * phase) / SYNODIC)) / 2) * 100)
}

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

/**
 * CHALDEAN LETTER VALUES (Ch. 19 — Hebrew to Latin/Roman Transposition)
 * Used for BUSINESS names (Ch. 32/35). Personal names use LETTER_VALUES.
 * Book checks: COSMOPOLITAN = 53, SERVICES = 28.
 */
export const CHALDEAN_VALUES: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
}

/** Business name seal via the Chaldean transposition */
export function chaldeanName(name: string): { total: number; value: number } {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, '')
  const total = [...letters].reduce((sum, ch) => sum + (CHALDEAN_VALUES[ch] ?? 0), 0)
  return { total, value: reduceToDigit(total) }
}

/**
 * Ch. 36 — vowel seal of a name via the Chaldean transposition.
 * Book checks: ISSACHAR OFFEI vowels I,A,A,O,E = 15 → 6; KUMASI vowels U,A,I = 8.
 */
export function chaldeanVowels(name: string): { vowels: string[]; total: number; value: number } {
  const vowels = [...name.toUpperCase().replace(/[^A-Z]/g, '')].filter((ch) =>
    'AEIOU'.includes(ch),
  )
  const total = vowels.reduce((sum, ch) => sum + (CHALDEAN_VALUES[ch] ?? 0), 0)
  return { vowels, total, value: total === 0 ? 0 : reduceToDigit(total) }
}

/**
 * Ch. 15 — Personal Month: PM = Personal Year Number + calendar month number,
 * reduced fully to 1–9 (book's worked example reduces May 5+5=10 → 1).
 * Book checks (PY 5): Jan 6, Feb 7, Apr 9, May 1, Sep 5, Oct 6, Nov 7, Dec 8.
 */
export function personalMonth(pyn: number, monthNum: number): { value: number; steps: string } {
  const total = pyn + monthNum
  const value = reduceToDigit(total)
  const steps =
    total === value ? `${monthNum} + ${pyn} = ${value}` : `${monthNum} + ${pyn} = ${total} → ${value}`
  return { value, steps }
}

/**
 * Ch. 15 — Cardinal Months: the birth month and its correlated months
 * (every third month). Book check: born February → Feb, May, Aug, Nov.
 */
export function cardinalMonths(birthMonth: number): number[] {
  return [0, 3, 6, 9].map((k) => ((birthMonth - 1 + k) % 12) + 1)
}

/**
 * Ch. 16 — Personal Day: PD = Personal Month number + day of the month,
 * reduced fully to 1–9 (the book's Table of Personal Days cycles PD
 * strictly 1→9 through every month, with no master-number exception).
 * Book checks (Isaac Offei, PM 9 in April): 21 Apr → 21+9=30 → 3 ✓
 * 27 Apr → 27+9=36 → 9 ✓ ; 1 Apr → 1+9=10 → 1 ✓
 */
export function personalDay(pm: number, dayOfMonth: number): { value: number; steps: string } {
  const total = pm + dayOfMonth
  const value = reduceToDigit(total)
  const steps =
    total === value ? `${dayOfMonth} + ${pm} = ${value}` : `${dayOfMonth} + ${pm} = ${total} → ${value}`
  return { value, steps }
}

/**
 * Ch. 16 — Soul Number: sum of the Pythagorean letter values (LETTER_VALUES,
 * same table used for the Name Number) of only the vowels in a name,
 * reduced fully to 1–9. Distinct from the Ch. 36 "vowel seal" which uses the
 * Chaldean table instead.
 * Book check: ISAAC OFFEI vowels I,A,A,O,E,I → 9+1+1+6+5+9 = 31 → 4 ✓
 */
export function soulNumber(fullName: string): { vowels: string[]; total: number; value: number } {
  const vowels = [...fullName.toUpperCase().replace(/[^A-Z]/g, '')].filter((ch) =>
    'AEIOU'.includes(ch),
  )
  const total = vowels.reduce((sum, ch) => sum + (LETTER_VALUES[ch] ?? 0), 0)
  return { vowels, total, value: total === 0 ? 0 : reduceToDigit(total) }
}
