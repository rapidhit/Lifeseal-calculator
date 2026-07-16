// Ch. 16 — Decoding Your Personal Day (PD)
// Wording condensed from the book's teachings.
//
// PD = Personal Month number + the day of the month, reduced fully to 1–9.
// Each day's PD number carries a daily package of benefits from God — the
// same signification the book applies to a whole month is scaled down to a
// single day. A day whose PD matches your Life Seal, Name Number, Blessed
// Seal or Soul Number is one of your most blessed days of that month.

import { personalDay, reduceToDigit } from '../lib/numerology'

export interface DayReading {
  day: number
  pd: number
  steps: string
}

/** Decode every day of a given month for a Personal Month number. */
export function decodeDays(pm: number, daysInMonth: number): DayReading[] {
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    const { value: pd, steps } = personalDay(pm, day)
    return { day, pd, steps }
  })
}

/** Number of calendar days in a given month/year. */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export const PD_COUNSEL =
  'Every single day has its own unique package given by God (Psalms 68:19). You can know the blessed vibration packaged for each day of your life and align with it — submitting to the leading of the Lord and making the best out of each day.'

/** Ch. 16 — Table of Personal Days: what to focus on for each PD number. */
export const PD_FOCUS: Record<number, string> = {
  1: 'Plan goals and projects, or pioneer a work. Start a new course. Buy something new. Stand for a competition. Begin a journey, go for an interview — a day to easily find success starting a commencement.',
  2: 'Choose a life partner, go on a date, get assistance from people, sign a contract, add up to your finances by teaming with others and creating synergy. Deal with group pull — a day suited to partnership.',
  3: 'Take legal advice, win a court case with evidence, develop a creative idea. Embark on a joyous activity, present talents or credentials, submit a CV. Decide on a smart move.',
  4: "Consult a doctor, see a lecturer or boss over an issue. Fix a security issue, handle agricultural issues, consult an educational or work facility. Attend to children's issues.",
  5: 'Handle correspondences and media matters. Make a new move, make work adjustments, travel. Talk or present on a TV show.',
  6: "Attend to family, heal broken hearts, solve relationship issues. Have a family meeting, visit a beautiful and luxurious site, organise an old students' conference. Go to an orphanage and donate to the less privileged.",
  7: 'Schedule a meeting with a prophet of God, embark on a pilgrimage, start a higher education. Look into spiritual gifts and mysteries, consult a religious authority.',
  8: 'Try your best chance, invest, make a financial decision, plan your financial issues, give to the less privileged — a day for pursuing financial gains.',
  9: 'Finish a piece of work, make love for the fruit of the womb, practise the gifts of the Spirit. Visit the aged, sort out confidential matters, get in touch with forgotten people, study mysteries — a day to be selective about company and seclude yourself.',
}

export type BlessedDayKey = 'lifeSeal' | 'nameNumber' | 'blessedSeal' | 'soulNumber'

export const BLESSED_DAY_LABELS: Record<BlessedDayKey, string> = {
  lifeSeal: 'Life Seal',
  nameNumber: 'Number of Your Name',
  blessedSeal: 'Blessed Seal',
  soulNumber: 'Soul Number',
}

export const BLESSED_DAY_NOTES: Record<BlessedDayKey, string> = {
  lifeSeal:
    'The most blessed set of days in the month — their vibration matches your Life Seal. Approach these with the greatest expectation.',
  nameNumber:
    'The second set of blessed days — their vibration matches the number of your name.',
  blessedSeal: 'The third set of blessed days — their vibration matches your Blessed Seal.',
  soulNumber: 'The last set of blessed days — their vibration matches your Soul Number.',
}

export interface BlessedDayGroup {
  key: BlessedDayKey
  label: string
  note: string
  matchValue: number
  days: number[]
}

/**
 * Ch. 16 — the days of a month whose PD equals the Life Seal, Name Number,
 * Blessed Seal or Soul Number, ranked in that priority order.
 * Book check (Isaac Offei, April): Life Seal 9 → 9,18,27 · Name 11→2 →
 * 2,11,20,29 · Blessed Seal 7 → 7,16,25 · Soul 4 → 4,13,22 (13 of 30 days).
 */
export function blessedDayGroups(
  days: DayReading[],
  lifeSealDigit: number,
  nameDigit: number,
  blessedSealDigit: number,
  soulDigit: number,
): BlessedDayGroup[] {
  const matches = (v: number) => days.filter((d) => d.pd === v).map((d) => d.day)
  const specs: { key: BlessedDayKey; matchValue: number }[] = [
    { key: 'lifeSeal', matchValue: lifeSealDigit },
    { key: 'nameNumber', matchValue: nameDigit },
    { key: 'blessedSeal', matchValue: blessedSealDigit },
    { key: 'soulNumber', matchValue: soulDigit },
  ]
  return specs.map(({ key, matchValue }) => ({
    key,
    label: BLESSED_DAY_LABELS[key],
    note: BLESSED_DAY_NOTES[key],
    matchValue,
    days: matches(matchValue),
  }))
}

/**
 * Ch. 16 — Heightening/Enhancing the Vibrational Decision.
 * Add each of a person's four core numbers to the PD they want to
 * concentrate their efforts on, to see which aspects of life will
 * generate the greatest outcomes on that day.
 * Book check (Isaac Offei, PD 8 for money): Life Seal 9+8=8, Name 11+8=1,
 * Blessed Seal 7+8=6, Soul 4+8=3 → focus on 8, 1, 6 and 3, in that order.
 */
export function heightenDay(
  pd: number,
  lifeSealDigit: number,
  nameDigit: number,
  blessedSealDigit: number,
  soulDigit: number,
): { key: BlessedDayKey; label: string; base: number; value: number }[] {
  const specs: { key: BlessedDayKey; base: number }[] = [
    { key: 'lifeSeal', base: lifeSealDigit },
    { key: 'nameNumber', base: nameDigit },
    { key: 'blessedSeal', base: blessedSealDigit },
    { key: 'soulNumber', base: soulDigit },
  ]
  return specs.map(({ key, base }) => ({
    key,
    label: BLESSED_DAY_LABELS[key],
    base,
    value: reduceToDigit(base + pd),
  }))
}
