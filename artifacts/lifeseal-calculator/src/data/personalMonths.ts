// Ch. 15 — Decoding Your Personal Month (PM)
// Wording condensed from the book's teachings.
//
// PM = Personal Year Number + calendar month number, reduced fully to 1–9.
// Each month's PM number is interpreted with the same signification meanings
// as the yearly vibrations (Ch. 17 table). Knowing what each month holds lets
// a person position strategically instead of going through the year on chance.

import { personalMonth, cardinalMonths } from '../lib/numerology'

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export type MonthTag = 'cardinal' | 'blessed' | 'abundance' | 'birthing'

export const MONTH_TAG_LABELS: Record<MonthTag, string> = {
  cardinal: 'Cardinal Month',
  blessed: 'Most Blessed Month',
  abundance: 'Month of Abundance',
  birthing: 'Month of Birthing',
}

export const MONTH_TAG_NOTES: Record<MonthTag, string> = {
  cardinal:
    'Your birth month and its correlated months (every third month). These months share the same vibrational affinity and tend to carry similar occurrences — be ready for them.',
  blessed:
    'The month whose Personal Month number equals your Life Seal — the most auspicious month of your year. Prepare spiritually and adequately before and during it.',
  abundance:
    'The month with a Personal Month number of 8 — the month of financial inflow, money matters and investments.',
  birthing:
    'The month with a Personal Month number of 9 — the month of fruitfulness and reproduction. Birthing has two aspects, conception and delivery, so a delivery this month traces to a seed taken 9–10 months earlier.',
}

export interface MonthReading {
  month: number
  name: string
  pm: number
  steps: string
  tags: MonthTag[]
}

/**
 * Decode all 12 months for a given Personal Year.
 * Book check (Isaac Offei, PY 5, life seal 9, born Feb):
 * cardinal Feb/May/Aug/Nov · most blessed Apr (PM 9) · abundance Mar & Dec
 * (PM 8) · birthing Apr (PM 9).
 */
export function decodeMonths(
  pyn: number,
  lifeSealDigit: number,
  birthMonth: number,
): MonthReading[] {
  const cardinals = new Set(cardinalMonths(birthMonth))
  return MONTH_NAMES.map((name, i) => {
    const month = i + 1
    const { value: pm, steps } = personalMonth(pyn, month)
    const tags: MonthTag[] = []
    if (cardinals.has(month)) tags.push('cardinal')
    if (pm === lifeSealDigit) tags.push('blessed')
    if (pm === 8) tags.push('abundance')
    if (pm === 9) tags.push('birthing')
    return { month, name, pm, steps, tags }
  })
}

export const PM_COUNSEL =
  'Every month carries a precious package programmed into it, and each of your months vibrates its own number for the year — decode them ahead of time so strategic positioning replaces chance. A month\u2019s theme is read with the same signification as the yearly vibrations.'
