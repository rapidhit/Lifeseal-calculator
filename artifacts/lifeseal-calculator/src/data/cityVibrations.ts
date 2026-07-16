// Ch. 36 — Keys to Nations and Cities
// Wording condensed from the book's teachings.
//
// A location's vibration is decoded from its name:
//   Physical vibration  = Roman (Pythagorean) numerology of the city name
//   Spiritual vibration = Hebrew (Chaldean) numerology of the city name
// Both reduce fully to 1–9 (the book reduces even 11 → 2 for cities).
// One's own energy is the Blessed Number seal (day of birth); it must
// synchronize with the city's vibration — checked via the harmony table.

/** Table of City Vibrations (condensed) */
export const CITY_VIBRATIONS: Record<number, string> = {
  1: 'A place to accomplish your dreams and expand — however, a feeling of loneliness.',
  2: 'A place of love, welcome, partnership, a supportive environment and peace. However, emotions can go out of balance.',
  3: 'A happy, enjoyable place with connectivity — full of joy, with big spaces holding many people and crowds. Very good for a home-based business and eating places.',
  4: 'A stable, secured and safe abode — a good place to raise family and foster relationships. However, it is a place of laws that cause frustrations and hinder easy progress.',
  5: 'A place of freedom, changes and a lot of activity. If change and variety matter to you, it will be a good place — but a place of challenges and intellectual demands.',
  6: 'The most beautiful town, place or home — full of art and creativity, with children and pets along with family and friends.',
  7: 'A place of contemplation and crucial decisions born of great and rich experience. A place of study, privacy, solitude and great intellectual expressions.',
  8: 'A place of either abundance or lack. Chances are you will have a lot of financial breakthrough — or debts to deal with. Wealth and poverty are both likely.',
  9: 'Everybody\u2019s house or town. Learning to get along with all manner of characters is important — arguments, violence, joy, peace: name it, they are all here.',
}

/** Ch. 36 counsel (condensed) */
export const CITY_COUNSEL =
  'Locations carry vibrations built from the collective thoughts, cultures and way of life of their people, and these can be decoded numerologically from the name of the place. Your energy must synchronize with the vibrational energy of the city or town you live in or plan to relocate to — if your vibration conflicts with the city\u2019s, failure tends to come right at the edge of breakthrough. That a city is prospering does not mean it is propitious for all its dwellers. Until this principle is understood, one keeps roving from town to town, working like a bull yet eating like an ant.'

export const CITY_SYNC_NOTE =
  'The vibrational energy of a city is its Name Seal by Roman numerology; your own vibrational energy is your Blessed Number seal (day of birth). Check the two against the table of harmony.'

// ── Ch. 36 (completed, pp. 406–413) ──────────────────────────────────────
// Sync method per the book's worked examples: the city vibration used in every
// harmony check is the one its example computes (Kumasi 17 → 8 — the Hebrew /
// Chaldean seal), even though the surrounding text says "Roman numerology."
// Personal seals checked against it, in ascending power:
//   1. Blessed Number (day of birth, reduced 1–9)
//   2. Life Seal (full DOB, reduced — masters reduced too for this lookup)
//   3. Name Seal (Chaldean sum of the full name, reduced fully to 1–9)
// Plus the vowel check: Chaldean sum of the name's vowels vs the city's vowels.

export type CityHarmony = 'excellent' | 'neutral' | 'avoidable'

/** Ch. 36 Table of Harmonics — personal energy (rows) vs city vibration */
export const CITY_HARMONICS: Record<
  number,
  { excellent: number[]; neutral: number[]; avoidable: number[] }
> = {
  1: { excellent: [1, 4, 8, 9], neutral: [2, 3, 5], avoidable: [6, 7] },
  2: { excellent: [2, 7, 8, 9], neutral: [1, 4, 6], avoidable: [5] },
  3: { excellent: [3, 5, 6, 7, 9], neutral: [1, 2], avoidable: [4, 8] },
  4: { excellent: [4, 1, 6], neutral: [2, 7, 8, 9], avoidable: [3, 5] },
  5: { excellent: [5, 1, 3, 6, 7, 8, 9], neutral: [], avoidable: [2, 4] },
  6: { excellent: [6, 3, 4, 5], neutral: [2, 5, 7], avoidable: [1, 8] },
  7: { excellent: [7, 2, 3], neutral: [4, 5, 6, 8], avoidable: [1, 9] },
  8: { excellent: [8, 1, 2, 4], neutral: [5, 7, 9], avoidable: [3, 6] },
  9: { excellent: [9, 1, 2, 3, 6], neutral: [4, 5, 8], avoidable: [7] },
}

/** Look up how a personal seal syncs with a city vibration */
export function cityHarmony(personal: number, cityVib: number): CityHarmony {
  const row = CITY_HARMONICS[personal]
  if (!row) return 'neutral'
  if (row.excellent.includes(cityVib)) return 'excellent'
  if (row.avoidable.includes(cityVib)) return 'avoidable'
  return 'neutral'
}

export const CITY_HARMONY_LABELS: Record<CityHarmony, string> = {
  excellent: 'Excellent vibrational sync',
  neutral: 'Neutral vibrational sync',
  avoidable: 'Avoidable vibrational sync (disharmony)',
}

/** Condensed meaning of each sync level for the dweller */
export const CITY_HARMONY_MEANINGS: Record<CityHarmony, string> = {
  excellent:
    'Your energy vibrates with this place — it is a city where your destiny can flourish.',
  neutral:
    'You can live in this city, but you will not make the best out of it on this seal alone — go further and check (or work on) the next seal in the hierarchy.',
  avoidable:
    'Your energy conflicts with this city\u2019s vibration — without a remedy, effort here tends to break down at the edge of breakthrough.',
}

/** Ch. 36 remedy: alias / add-on name (the Simon → Peter principle) */
export const NAME_SEAL_REMEDY =
  'When the Name Seal is not in harmony with the city, take the difference between the city\u2019s seal and your name seal, and adopt an alias, initial or add-on name whose letters (Hebrew values) sum to that difference. A surname or alias is an "add-on" to a name — it carries power to correct and enhance one\u2019s vibration so the name becomes the key to the city\u2019s gates. The alias must become the popular name you are called by in that city.'

/** Ch. 36 vowel remedy */
export const VOWEL_REMEDY =
  'If the vowels of your name are in disharmony with the vowels of the city\u2019s name, take the difference between the two vowel seals and adopt vowel initials or a vowel-bearing alias summing to that difference — then be popularly called by it in the city.'

/** Ch. 36 spouse note (condensed) */
export const SPOUSE_NOTE =
  'A spouse whose Name Seal is in disharmony with the city brings harmony around the house but friction between the couple. The remedy is a pet or alias name — used personally between the two — that harmonises with the city\u2019s vibration, just as Adam personally called his wife Eve while everyone else addressed her as Woman.'

/** Letters whose Hebrew (Chaldean) value equals n — for alias suggestions */
export const CHALDEAN_LETTERS_BY_VALUE: Record<number, string[]> = {
  1: ['A', 'I', 'J', 'Q', 'Y'],
  2: ['B', 'K', 'R'],
  3: ['C', 'G', 'L', 'S'],
  4: ['D', 'M', 'T'],
  5: ['E', 'H', 'N', 'X'],
  6: ['U', 'V', 'W'],
  7: ['O', 'Z'],
  8: ['F', 'P'],
}

/** Suggest vowel initials (Hebrew values: A=1 E=5 I=1 O=7 U=6) summing to n */
export function vowelSuggestions(n: number): string[] {
  const VOWELS: [string, number][] = [
    ['A', 1],
    ['E', 5],
    ['I', 1],
    ['O', 7],
    ['U', 6],
  ]
  const out: string[] = []
  // single vowels
  for (const [v, val] of VOWELS) if (val === n) out.push(v)
  // pairs, e.g. difference 2 → A.I.
  for (const [v1, a] of VOWELS)
    for (const [v2, b] of VOWELS)
      if (a + b === n && out.length < 6) out.push(`${v1}.${v2}.`)
  return [...new Set(out)].slice(0, 5)
}
