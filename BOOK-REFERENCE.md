# Cosmic Numerology — Formulas & Data Reference

Working reference for the Lifeseal Calculator, consolidating every calculation
method and data table implemented (condensed from the book's teachings).
**Purpose: future dev sessions can clone this repo and continue without
re-photographing chapters.** Interpretation texts live in the data files listed
below; this file holds the formulas and raw data.

> **Repo layout (Replit pnpm monorepo since v2):** the calculator lives at
> `artifacts/lifeseal-calculator/` — all `src/` paths below are relative to it.
> Commands: `pnpm install` · `pnpm run typecheck` · `pnpm --filter
> @workspace/lifeseal-calculator run build`. Root `Dockerfile` builds the
> calculator and serves `dist/public` via nginx :80 (Coolify).

---

## 1. Letter Values

**Pythagorean (Roman) — personal names & city physical vibration** (Ch. 10):

```
A=1 B=2 C=3 D=4 E=5 F=6 G=7 H=8 I=9
J=1 K=2 L=3 M=4 N=5 O=6 P=7 Q=8 R=9
S=1 T=2 U=3 V=4 W=5 X=6 Y=7 Z=8
```

**Chaldean / Hebrew–Roman transposition — business names, city spiritual
vibration, vowel seals** (Ch. 19) — checks: COSMOPOLITAN = 53, SERVICES = 28:

```
A=1 I=1 J=1 Q=1 Y=1 · B=2 K=2 R=2 · C=3 G=3 L=3 S=3 · D=4 M=4 T=4
E=5 H=5 N=5 X=5 · U=6 V=6 W=6 · O=7 Z=7 · F=8 P=8
```

Code: `LETTER_VALUES`, `CHALDEAN_VALUES`, `chaldeanName()`, `chaldeanVowels()`
in `src/lib/numerology.ts`.

## 2. Reduction Rules

- **digitSum(n):** add the digits once (1998 → 27).
- **reduce(n):** keep summing until single digit, **but keep 11 and 22**
  (masters) — Life Seal, Name Number, Personal Year.
- **reduceToDigit(n):** always reduce fully to 1–9 — Blessed Seal, business
  numbers, city vibrations, Personal Month/Day, harmony lookups.

## 3. Personal Numbers

| Number | Formula | Book check |
|---|---|---|
| **Life Seal** (Ch. 12/14) | reduce(reduced day + reduced month + reduced year); keep 11/22 | 16 Feb 1998 → 7+2+9 = 18 → **9** |
| **Blessed Seal** (Ch. 31) | birth day reduced fully | 16th → **7** |
| **Name Number** (Ch. 9/17) | Pythagorean letter sum of full name; keep 11/22 | ISAAC OFFEI → 47 → **11** |
| **Soul Number** (Ch. 16) | Pythagorean sum of **vowels only**, reduced fully | ISAAC OFFEI vowels → 31 → **4** |
| **Personal Year (PYN)** (Ch. 14) | reduce(reduced day + reduced month + reduced current year); keep 11/22 | 16 Feb in 2021 → **5**; in 2027 → **11** |
| **Personal Month (PM)** (Ch. 15) | PYN + calendar month, reduced fully | PY 5, April → 5+4 = **9** |
| **Personal Day (PD)** (Ch. 16) | PM + day of month, reduced fully | PM 9: 21st → 30 → **3**; 27th → 36 → **9**; 1st → **1** |
| **Spirit Day** (Ch. 9) | reduce full DOB, stop at ≤12; n → nth day of nth month | 19 May 1976 → 11 → 11 Nov |
| **Soul's Day** (Ch. 9) | weekday of birth | — |

**Blessed Seal day groupings:** 1→1,10,19,28 · 2→2,11,20,29 · 3→3,12,21,30 ·
4→4,13,22,31 · 5→5,14,23 · 6→6,15,24 · 7→7,16,25 · 8→8,17,26 · 9→9,18,27

## 4. Personal Months & Days — Ch. 15/16

- **Cardinal Months:** birth month + every third month (Feb → Feb, May, Aug,
  Nov) — shared vibrational affinity. `cardinalMonths()`.
- **Most Blessed Month:** the month whose PM equals the Life Seal digit.
- **Month of Abundance:** PM 8 (money/investments). **Month of Birthing:**
  PM 9 (fruitfulness; delivery traces to a seed 9–10 months earlier).
- **Blessed Days in a month:** the day groups matching Life Seal, Name Number,
  Blessed Seal and Soul Number (Isaac in April: Life Seal 9 → 9/18/27, Name
  11→2 → 2/11/20/29, etc.). `blessedDayGroups()`.
- **Heightening a decision:** find seal-days whose PD equals the desired
  vibration (e.g. PD 8 for money matters). `heightenDay()`.
- Data & logic: `src/data/personalMonths.ts`, `src/data/personalDays.ts`,
  `personalMonth()`, `personalDay()` in `src/lib/numerology.ts`.

## 5. Business Numerology — Ch. 31 (Business Decision)

Career/business areas per seal 1–9 + special combos → `src/data/
businessNumerology.ts` (`BUSINESS_SEALS`, `businessCombos()`). Combos: 1+3/6 →
pharma; 1+5 → health worker; 1+9 → surgeon; 3+3 → not carved for business
(remedy chs. 18, 25–28); any 5 → work solo; any 8 → wealth with delays,
remediable. Seal power: Blessed < Life < Name/Business < **Signature**.

## 6. Business Name Seal & Blessed Number — Ch. 32

- **Business Name Seal** = Chaldean letter sum, reduced. Check: Cosmopolitan
  Services 81 → **9**.
- **Blessed Number of the Business** = launch day reduced (20 Oct 2017 → 2).
  Fallbacks: proprietor's birthday → incorporation date → relaunch/rename.
- Interpretations 1–9: `BUSINESS_SEAL_MEANINGS` in `src/data/businessDecoder.ts`.

## 6a. Business Series of Harmonics — Ch. 33

**Table of Harmony and Disharmony** (absent numbers = neutral, discouraged):

| Seal | Harmony | Disharmony |
|---|---|---|
| 1 | 1,2,4,7 | — |
| 2 | 1,2,4,7 | 8 |
| 3 | 3,6,9 | — |
| 4 | 1,2,4,7,8 | 9 |
| 5 | 5,8 | 1,2,3,4,6,7,9 |
| 6 | 3,6,9 | 4,8 |
| 7 | 1,2,4,7 | 8 |
| 8 | 1,3,4,6,8 | 7,9 |
| 9 | 3,6,9 | — |

(Rows 1, 4, 8, 9 verified by the book's own examples.) Launch dates: pick days
reducing to harmony numbers; exact matches heighten. Mismatch remedies (4):
adjust name → harmonising launch date → founder's Blessed Number → change name.
**Moon illumination** 70–100% perfect for launches — `moonIllumination()`
(synodic 29.53058867d from 2000-01-06 18:14 UTC). **Strengthening:** 4 ← days
reducing to 1,2,7; 8 ← days reducing to 1,3,6. Address digits must harmonise
(940 → mark 940/3).

## 6b. Colours of the Business — Ch. 34

| # | Colours |
|---|---|
| 1 | Gold, Yellow, Orange, Brown |
| 2 | White, Green, Cream |
| 3 | Blue, Purple, Red Rose, Rose Pink, Maroon |
| 4 | Bright Blue, Grey, Dark Colours, Neon, Tint/Light |
| 5 | White, Tint/Light, Sparkling/Glittering |
| 6 | Blue, Red Rose, Rose Pink |
| 7 | White, Green, Yellow, Tint/Light |
| 8 | Blue, Black, Dark Grey, Dark Purple |
| 9 | Red, Pink, Red Rose, Pink Rose |

Palette = name seal colours + blessed number colours; anything outside afflicts.
Data: `NUMBER_COLOURS`, `COLOUR_SWATCHES`.

## 6c. Business Destiny Number — Ch. 35

**BDN = Business Seal + Blessed Number** (launch day or proprietor/CEO), kept
**compound 10–52**; single-digit sums → use compound totals; big sums reduce
within limits. Check: 7 + 9 = **16**; compound 81 + 16 = 97 → 16 ✓. Meanings
in `BDN_MEANINGS`; aliases in `BDN_SAME_AS` (33→24 … 52→43). `computeBDN()`.

## 6d. Keys to Nations and Cities — Ch. 36

- **Physical** = Pythagorean of city name; **Spiritual** = Chaldean; both fully
  reduced (London 29→11→**2**). Meanings 1–9: `CITY_VIBRATIONS` in
  `src/data/cityVibrations.ts`.
- **Sync:** city energy (Roman name seal) vs personal Blessed Number via the
  harmony table; the app also compares the **vowel seals** (Chaldean vowels)
  of the person's name vs the city's — `chaldeanVowels()`, `vowelSuggestions`.
- Checks: Accra 8/1 · Moscow 7/3 · Kumasi 2/8 · Lagos 9/8 · Beijing 2/9 ·
  London 2/4 ✓.

> ⚠ **Verified misprints in the book:** Paris physical (P=7 → 27 → **9**, book
> prints 2), Singapore physical (dropped N → 50 → **5**, book prints 9),
> New York spiritual (2+8=10 → **1**, book prints 2). App follows the book's
> method and tables — do not "fix" these backwards.

## 7. Where Everything Lives (paths under `artifacts/lifeseal-calculator/`)

| File | Contents |
|---|---|
| `src/lib/numerology.ts` | Both letter tables, all reductions & seals, personalMonth/Day, soulNumber, chaldeanVowels, moonIllumination |
| `src/data/interpretations.ts` | Life Seal & Personal Year meanings, vibrations, astro, synchronise() |
| `src/data/businessNumerology.ts` | Ch. 31 career areas + combos |
| `src/data/businessDecoder.ts` | Ch. 32–35: seal meanings, harmony, colours, BDN |
| `src/data/cityVibrations.ts` | Ch. 36 city meanings & counsel |
| `src/data/personalMonths.ts` / `personalDays.ts` | Ch. 15/16 months, days, blessed groups, heightening |
| `src/pages/home.tsx` | Full UI (all decoders, PDF export) |
| `src/lib/pdf.ts` | html2canvas + jsPDF download |

## 8. Chapter Build Status — **ALL COMPLETE** ✅

9, 10, 12, 14, 17 (personal seals) · 15, 16 (months/days, soul number) ·
19 (Chaldean) · 31–36 (full business suite incl. city vowel sync). No chapters
pending. Future work is features/polish, not book capture.
