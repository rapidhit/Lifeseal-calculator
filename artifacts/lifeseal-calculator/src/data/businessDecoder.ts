// Ch. 32 — Business Name Seal and Blessed Number
// Ch. 33 — Business Series of Harmonics
// Wording condensed from the book's teachings.

/** Ch. 32 — Table of Interpretation of Business Seals (condensed) */
export const BUSINESS_SEAL_MEANINGS: Record<number, string> = {
  1: 'A number for leaders, starters and ground-breakers — an auspicious number for any business venture, providing boundless possibilities of success.',
  2: 'The best number for partnership businesses. It demands flexibility and openness to suggestions, with a pool for generating ideas in the work environment. Market share will swing high and low from time to time, so it works perfectly for seasonal-profit ventures — event organizing, travel agencies, real estate agencies, and businesses connected to the rationalities and emotions of people.',
  3: 'A number with challenges of slow business — but it will do very well in the sports and relaxation industry.',
  4: 'A very good number for business, yet it makes demands on your resources and strength, and brings debts. Ventures directly related to money issues (stocks, banks, etc.) should be avoided.',
  5: 'A highly auspicious number for businesses.',
  6: 'An extremely good number for all-round businesses.',
  7: 'The best number for educational institutions, churches and spiritual societies, research centres and libraries, environmental protection agencies, religious institutions, travel agencies, NGOs, and global or international businesses.',
  8: 'A good number for business success — especially for making a lot of money and progress, and for notoriety in your industry — however it carries challenges of miseries, frustrations, delays and accidents.',
  9: 'A good number for any kind of business, especially energetic, high-output ventures regulated by the mantra "the end justifies the means." The caution: strategic decisions must be made with care, scrutiny and foresight. A propitious number for a business of any kind.',
}

/**
 * Ch. 33 — Table of Harmony and Disharmony.
 * Numbers not listed in either column are neutral (allowed, not encouraged).
 */
export const HARMONY_TABLE: Record<number, { harmony: number[]; disharmony: number[] }> = {
  1: { harmony: [1, 2, 4, 7], disharmony: [] },
  2: { harmony: [1, 2, 4, 7], disharmony: [8] },
  3: { harmony: [3, 6, 9], disharmony: [] },
  4: { harmony: [1, 2, 4, 7, 8], disharmony: [9] },
  5: { harmony: [5, 8], disharmony: [1, 2, 3, 4, 6, 7, 9] },
  6: { harmony: [3, 6, 9], disharmony: [4, 8] },
  7: { harmony: [1, 2, 4, 7], disharmony: [8] },
  8: { harmony: [1, 3, 4, 6, 8], disharmony: [7, 9] },
  9: { harmony: [3, 6, 9], disharmony: [] },
}

export type HarmonyStatus = 'harmony' | 'disharmony' | 'neutral'

/** Check how a number relates to a Business Name Seal */
export function harmonyStatus(nameSeal: number, other: number): HarmonyStatus {
  const row = HARMONY_TABLE[nameSeal]
  if (!row) return 'neutral'
  if (row.harmony.includes(other)) return 'harmony'
  if (row.disharmony.includes(other)) return 'disharmony'
  return 'neutral'
}

/** Days of the month (1–31) that reduce to a number in harmony with the seal */
export function harmonisingDays(nameSeal: number): number[] {
  const row = HARMONY_TABLE[nameSeal]
  if (!row) return []
  const days: number[] = []
  for (let d = 1; d <= 31; d++) {
    let v = d
    while (v > 9) v = v.toString().split('').reduce((a, c) => a + Number(c), 0)
    if (row.harmony.includes(v)) days.push(d)
  }
  return days
}

/**
 * Ch. 33 — Making Business Seals 4 and 8 Strong.
 * 4 and 8 are good but difficult numbers (fluid financial inflow with
 * accompanying debts); these blessed date numbers cancel the negative
 * effects of debts and losses.
 */
export const STRENGTHENING: Record<number, { reducesTo: number[]; note: string }> = {
  4: {
    reducesTo: [1, 2, 7],
    note: '4 is strengthened by days that reduce to 1, 2 and 7 — the 1st and 10th; 2nd, 11th, 22nd and 31st; 7th, 16th and 25th of any month.',
  },
  8: {
    reducesTo: [1, 3, 6],
    note: '8 is strengthened by days that reduce to 1, 3 and 6 — the 1st, 10th and 28th; 3rd, 12th, 21st and 30th; 6th, 15th and 24th of any month.',
  },
}

/** Ch. 32 — how to find the Blessed Number of the Business */
export const BLESSED_NUMBER_GUIDE =
  'The Blessed Number of the Business is the day of its launch or start date, reduced. If no launch date was set or it has been forgotten, check whether the proprietor\u2019s birth date harmonizes; for a partnership or corporation, check the incorporation date on the certificate. If none of these harmonize, reorganize and relaunch the business to give it a new vibration — or find a new name that harmonizes and rebrand. The launch day and the proprietor or CEO\u2019s birthday give the best results for analysis.'

/** Ch. 33 — the four remedies when seal and blessed number don't harmonize */
export const MISMATCH_REMEDIES: string[] = [
  'Adjust the business name to create harmony with the business blessed number, if already set up',
  'Simply choose a launch date that harmonizes with the business name seal as the official launch date',
  'If the launch date cannot be changed because the business is already running, check whether the Business Name Seal harmonizes with the founder\u2019s Blessed Number',
  'If there is still no harmony, consider changing the name of the business — either by adjusting it or changing it completely',
]

/** Ch. 33 — moon illumination counsel */
export const MOON_COUNSEL =
  'Check the illumination of the moon for the launch date — this concerns the fame of the business. Illuminations between 70% and 100% are perfect: the higher the percentage, the better the influence on your business.'

/** Ch. 33 — address and location harmony (condensed) */
export const ADDRESS_COUNSEL =
  'Harmony of numbers also applies to your address: if the digits of the address clash (e.g. 9 and 4 in 940), it can bring loss of customers, tension among staff and a general lack of money. Remedy it by writing or pasting a harmonizing number at the back of the entrance door (e.g. 3 harmonizes 940, so mark 940/3), or choose an address, house name or car plate that harmonizes with your blessed number and city — city vibrations are treated in their own chapter.'

// ── Ch. 34 — Choosing the Colours of Your Business ──

/** Colours per numerological vibration number */
export const NUMBER_COLOURS: Record<number, string[]> = {
  1: ['Gold', 'Yellow', 'Orange', 'Brown'],
  2: ['White', 'Green', 'Cream'],
  3: ['Blue', 'Purple', 'Red Rose', 'Rose Pink', 'Maroon'],
  4: ['Bright Blue', 'Grey', 'Dark Colours', 'Neon', 'Tint or Light Colours'],
  5: ['White', 'Tint or Light Colours', 'Sparkling or Glittering Colours'],
  6: ['Blue', 'Red Rose', 'Rose Pink'],
  7: ['White', 'Green', 'Yellow', 'Tint or Light Colours'],
  8: ['Blue', 'Black', 'Dark Grey', 'Dark Purple'],
  9: ['Red', 'Pink', 'Red Rose', 'Pink Rose'],
}

/** CSS swatch for each colour name (visual approximation) */
export const COLOUR_SWATCHES: Record<string, string> = {
  Gold: 'linear-gradient(135deg, #e6c15a, #b8860b)',
  Yellow: '#f2c81e',
  Orange: '#ef7f1a',
  Brown: '#7d4f2a',
  White: '#ffffff',
  Green: '#2e9e4f',
  Cream: '#f4ecd6',
  Blue: '#2456c4',
  Purple: '#7a3ab8',
  'Red Rose': '#c21e56',
  'Rose Pink': '#f29cb7',
  Maroon: '#701c2e',
  'Bright Blue': '#1f7ae0',
  Grey: '#8a8f98',
  'Dark Colours': 'linear-gradient(135deg, #2b2f3a, #14161d)',
  Neon: 'linear-gradient(135deg, #3dff7c, #17e0d0)',
  'Tint or Light Colours': 'linear-gradient(135deg, #f4f6fb, #e2e8f2)',
  'Sparkling or Glittering Colours':
    'linear-gradient(135deg, #fdfbf3 0%, #f0e2ae 25%, #ffffff 50%, #e8d491 75%, #fdfbf3 100%)',
  Black: '#15171c',
  'Dark Grey': '#3c4148',
  'Dark Purple': '#3d2352',
  Red: '#d3212c',
  Pink: '#f78fb3',
  'Pink Rose': '#f6c9d8',
}

/** Ch. 34 counsel (condensed) */
export const COLOUR_COUNSEL =
  'Harmonizing the Business Name Seal with the Blessed Number provides a set of colours from each number\u2019s vibration. Any mix from within this set harmonizes with the business — but any colour outside the set introduced into the mix will afflict the business, causing frustrations, financial drain and even collapse. Colours must never be chosen by feelings or mere preference: colour is the first thing a client\u2019s eye unconsciously notices, retaining clients with a grace of loyalty or creating repulsion.'

export const COLOUR_ORDER_NOTE =
  'Choose the launch date first (a harmonising day with the highest moon illumination) — the launch date then informs the colour choice, since its Blessed Number contributes the second half of the palette.'

// ── Ch. 35 — Business Destiny Number (BDN) ──
// BDN = Business Seal + Business Blessed Number (launch day, or the
// proprietor/CEO's Blessed Number). Must remain a COMPOUND number 10–52;
// if the reduced sum is single-digit, use the compound (double-digit)
// values from the seal and/or blessed calculations instead.

/** Destiny number meanings, condensed. 10–52; aliases resolve via BDN_SAME_AS. */
export const BDN_MEANINGS: Record<number, string> = {
  10: 'A good destiny number for business, carrying the grace of good intentions — preserving human life or meeting goals: hospitals and health-related work, law firms, religious and educational institutions.',
  11: 'Good only for 2 and its accompanying harmonics. Be careful about utterances in communication — you can be held accountable for your opinions.',
  12: 'Good for businesses that sacrifice for the interests of others, or that at some point require unexpected sacrifices from their workers — e.g. security companies and NGOs.',
  13: 'A fortunate and very auspicious destiny number, as long as it is in combination with 4, 8, 9, 12, 13, 15, 17, 18, 22, 26, 27 or 31.',
  14: 'Good — compatible with any number combination, since it reduces to 5 which is compatible with all. The number of the communication industry: telecoms, television and radio stations, art companies, the music industry. It does not fit businesses affected by climate catastrophes, nor those bordering on the judgments of people — gambling, betting and chance businesses.',
  15: 'A good destiny number, very propitious for businesses that seek aid and awards of contract to operate. Combines well with 4, 8, 13, 17, 22, 26 and 31.',
  16: 'A good destiny number if combined with 7, 16 or 25. The caution: it can result in failure, folding up or destruction of the business in the long term.',
  17: 'An auspicious number bringing financial breakthrough and all-round success — legendary honour, leaving the business as a legacy into old age and beyond. It must be proven, though, with a person for whom numbers reducing to 4 and 8 work positively, not negatively.',
  18: 'Good because it reduces to 9 — but combined with 4 and 8 the negative qualities of 9 can manifest: violence, bloodshed, anger, betrayal, enmity. Repeated, it can take on a tragic quality.',
  19: 'A destiny number of overall success.',
  20: 'Auspicious when combined with other numbers in the “2” series; otherwise it carries warnings of hardships, especially when combined with 8s.',
  21: 'A destiny number of eventual success after hard work.',
  22: 'Can be propitious if combined with numbers in its 4 series — or a number of naivety that makes one a victim of others.',
  23: 'A highly fortunate and gracious destiny number.',
  24: 'A number of support and success, especially in the realms of romance and relationships.',
  25: 'A destiny number of overall success.',
  26: 'A warning about one\u2019s partnerships and the future. Not a good number — though in some cases it can bring money that comes with a price.',
  27: 'A fortunate destiny number, as long as the individual acts within their own judgment and heeds counsel.',
  28: 'A good destiny number when connected to future plans — unless it is accompanied by several numbers in its own “one” series.',
  29: 'A number of betrayals and bad luck, unless accompanied by several numbers of its own “two” series.',
  30: 'A powerful destiny number — the future of the individual lies in his or her own hands.',
  31: 'A number of isolation, not overly fortunate in worldly terms. (A month holds at most 31 days, so destiny numbers beyond this point are special lessons and repetitions of earlier numbers.)',
  32: '“The Paths of Wisdom” — a fortunate destiny number, especially for anything relating to groups. Follow your own counsel, and thoroughly question any from others.',
  36: 'Shares the vibration of 27 — and it is the number of mastery.',
  37: 'A number of happy relationships and associations. A good number.',
  43: 'Not a fortunate number — it symbolizes defeats and failures.',
  51: 'A combination of success with a venture, but it warns of enemies both in hiding and in plain sight.',
}

/** Numbers that carry the same vibration as an earlier destiny number */
export const BDN_SAME_AS: Record<number, number> = {
  33: 24, 34: 25, 35: 26, 38: 29, 39: 30, 40: 31, 41: 32,
  42: 24, 44: 26, 45: 27, 46: 37, 47: 29, 48: 30, 49: 31, 50: 32, 52: 43,
}

export function bdnMeaning(n: number): { base: number; text: string } {
  if (BDN_MEANINGS[n]) return { base: n, text: BDN_MEANINGS[n] }
  const base = BDN_SAME_AS[n]
  return { base, text: BDN_MEANINGS[base] ?? '' }
}

const digitSum = (n: number) =>
  n.toString().split('').reduce((a, c) => a + Number(c), 0)

/**
 * Compute the BDN. Tries the book's paths in order — reduced seal + reduced
 * blessed first; if single-digit, the compound values — accepting the first
 * result that lands (after digit-summing anything above 52) in 10–52.
 */
export function computeBDN(
  sealCompound: number,
  sealReduced: number,
  blessedCompound: number,
  blessedReduced: number
): { value: number; steps: string } | null {
  const candidates: Array<[number, string]> = [
    [sealReduced + blessedReduced, `${blessedReduced} + ${sealReduced}`],
    [sealCompound + blessedCompound, `${blessedCompound} + ${sealCompound}`],
    [sealCompound + blessedReduced, `${blessedReduced} + ${sealCompound}`],
    [sealReduced + blessedCompound, `${blessedCompound} + ${sealReduced}`],
  ]
  for (const [raw, label] of candidates) {
    let v = raw
    let trail = `${label} = ${raw}`
    while (v > 52) {
      v = digitSum(v)
      trail += ` → ${v}`
    }
    if (v >= 10 && v <= 52) return { value: v, steps: trail }
  }
  return null
}
