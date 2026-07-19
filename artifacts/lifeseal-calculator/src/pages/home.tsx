import { useRef, useState, useEffect } from 'react'
import { downloadReadingPdf } from '../lib/pdf'
import {
  lifeSeal,
  blessedSeal,
  nameNumber,
  personalYear,
  spiritDay,
  soulsDay,
  soulNumber,
  personalDay,
  reduceToDigit,
  type BirthDate,
} from '../lib/numerology'
import {
  LIFE_SEALS,
  PERSONAL_YEARS,
  CAREER_BY_PY,
  VIBRATIONS,
  ASTRO,
  synchronise,
} from '../data/interpretations'
import {
  BUSINESS_SEALS,
  businessCombos,
  BUSINESS_FOOTNOTE,
} from '../data/businessNumerology'
import {
  BUSINESS_SEAL_MEANINGS,
  HARMONY_TABLE,
  harmonyStatus,
  harmonisingDays,
  STRENGTHENING,
  BLESSED_NUMBER_GUIDE,
  MISMATCH_REMEDIES,
  MOON_COUNSEL,
  NUMBER_COLOURS,
  COLOUR_SWATCHES,
  COLOUR_COUNSEL,
  COLOUR_ORDER_NOTE,
  computeBDN,
  bdnMeaning,
} from '../data/businessDecoder'
import {
  moonIllumination,
  ordinal,
  chaldeanName,
  chaldeanVowels,
  nameNumber as romanName,
} from '../lib/numerology'
import {
  decodeMonths,
  MONTH_NAMES,
  MONTH_TAG_LABELS,
  MONTH_TAG_NOTES,
  PM_COUNSEL,
  type MonthTag,
} from '../data/personalMonths'
import {
  decodeDays,
  daysInMonth,
  blessedDayGroups,
  heightenDay,
  PD_COUNSEL,
  PD_FOCUS,
} from '../data/personalDays'
import {
  CITY_VIBRATIONS,
  CITY_COUNSEL,
  CITY_SYNC_NOTE,
  cityHarmony,
  CITY_HARMONY_LABELS,
  CITY_HARMONY_MEANINGS,
  NAME_SEAL_REMEDY,
  VOWEL_REMEDY,
  SPOUSE_NOTE,
  CHALDEAN_LETTERS_BY_VALUE,
  vowelSuggestions,
  type CityHarmony,
} from '../data/cityVibrations'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Download, HelpCircle, Sparkles, AlertCircle, MapPin, Briefcase, CheckCircle2, ChevronLeft, ChevronRight, Moon, Info, Heart, Sun, Star } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel'

interface Reading {
  name: string
  day: number
  month: number
  seal: ReturnType<typeof lifeSeal>
  blessed: ReturnType<typeof blessedSeal>
  nameNum: ReturnType<typeof nameNumber>
  pyn: ReturnType<typeof personalYear>
  spirit: ReturnType<typeof spiritDay>
  soul: string
  soulNum: ReturnType<typeof soulNumber>
  year: number
}

function capitalizeName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}


function SlideShow({ slides, className, onFirstSwipe }: { slides: React.ReactNode[], className?: string, onFirstSwipe?: () => void }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const swiped = React.useRef(false)

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
      if (!swiped.current) {
        swiped.current = true
        onFirstSwipe?.()
      }
    }
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onFirstSwipe])

  return (
    <div className={`relative w-full mx-auto ${className || ''}`}>
      <Carousel setApi={setApi} className="w-full" opts={{ loop: false, align: 'start' }}>
        <CarouselContent className="-ml-2 md:-ml-4 items-stretch">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 h-auto">
              <div className="h-full py-2">
                {slide}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {count > 1 && (
          <div className="flex items-center justify-center mt-6 md:mt-8 gap-4 md:gap-6">
            <CarouselPrevious className="static translate-y-0 translate-x-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white hover:bg-primary/10 border-primary/20 text-primary shadow-sm shrink-0" />
            <span className="text-sm font-bold text-muted-foreground tracking-widest shrink-0">
              {current} <span className="opacity-50">/</span> {count}
            </span>
            <CarouselNext className="static translate-y-0 translate-x-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white hover:bg-primary/10 border-primary/20 text-primary shadow-sm shrink-0" />
          </div>
        )}
      </Carousel>
    </div>
  )
}

export default function LifeSealCalculator() {
  const thisYear = new Date().getFullYear()
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [year, setYear] = useState(String(thisYear))
  const [error, setError] = useState('')
  const [reading, setReading] = useState<Reading | null>(null)
  const [decoding, setDecoding] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const pdfRef = useRef<HTMLDivElement>(null)
  const [pdfBusy, setPdfBusy] = useState(false)
  const [pdfError, setPdfError] = useState('')
  const [showSwipeHint, setShowSwipeHint] = useState(false)

  // Auto-dismiss swipe hint after 5 seconds
  useEffect(() => {
    if (!showSwipeHint) return
    const t = window.setTimeout(() => setShowSwipeHint(false), 5000)
    return () => window.clearTimeout(t)
  }, [showSwipeHint])

  // ── Personal Day (Ch. 16) ──
  const [pdMonthChoice, setPdMonthChoice] = useState<number | null>(null)
  const [pdHeightenTarget, setPdHeightenTarget] = useState(8)

  // ── Business Decoder (Ch. 32–33) ──
  const [bizName, setBizName] = useState('')
  const [bizDate, setBizDate] = useState('')
  const [bizError, setBizError] = useState('')
  const [biz, setBiz] = useState<{
    name: string
    seal: number
    total: number
    blessed: number | null
    launch: Date | null
    launchDay: number | null
  } | null>(null)
  const [bizDecoding, setBizDecoding] = useState(false)
  const bizResultsRef = useRef<HTMLDivElement>(null)

  // ── How It Works panel ──
  const [howOpen, setHowOpen] = useState(false)

  // ── City Vibrations (Ch. 36) ──
  const [cityName, setCityName] = useState('')
  const [city, setCity] = useState<{
    name: string
    physical: number
    physicalTotal: number
    spiritual: number
    spiritualTotal: number
  } | null>(null)
  const [cityDecoding, setCityDecoding] = useState(false)
  const cityResultsRef = useRef<HTMLDivElement>(null)

  function revealResults(ref: React.RefObject<HTMLDivElement | null>) {
    requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function decodeCity() {
    const clean = cityName.trim()
    if (!clean || !/[a-zA-Z]/.test(clean)) return
    setCityDecoding(true)
    window.setTimeout(() => {
      const roman = romanName(clean)
      const hebrew = chaldeanName(clean)
      setCity({
        name: capitalizeName(clean),
        physical: reduceToDigit(roman.total),
        physicalTotal: roman.total,
        spiritual: hebrew.value,
        spiritualTotal: hebrew.total,
      })
      setCityDecoding(false)
      revealResults(cityResultsRef)
    }, 480)
  }

  function decodeBusiness() {
    setBizError('')
    const clean = bizName.trim()
    if (!clean || !/[a-zA-Z]/.test(clean)) {
      setBizError('Enter the business name to decode.')
      return
    }
    setBizDecoding(true)
    window.setTimeout(() => {
      const nn = chaldeanName(clean)
      let blessed: number | null = null
      let launch: Date | null = null
      let launchDay: number | null = null
      if (bizDate) {
        const [y, m, d] = bizDate.split('-').map(Number)
        if (y && m && d) {
          launch = new Date(y, m - 1, d)
          launchDay = d
          blessed = reduceToDigit(d)
        }
      }
      setBiz({
        name: capitalizeName(clean),
        seal: nn.value,
        total: nn.total,
        blessed,
        launch,
        launchDay,
      })
      setBizDecoding(false)
      revealResults(bizResultsRef)
    }, 480)
  }

  function decode() {
    setError('')
    const cleanName = fullName.trim()
    if (!cleanName || !/[a-zA-Z]/.test(cleanName)) {
      setError('Enter your full name as you respond to it.')
      return
    }
    if (!dob) {
      setError('Choose your date of birth.')
      return
    }
    const [y, m, d] = dob.split('-').map(Number)
    if (!y || !m || !d) {
      setError('That date of birth doesn’t look complete.')
      return
    }
    const yr = Number(year)
    if (!yr || yr < 1000 || yr > 9999) {
      setError('The year to decode should be a four-digit year, e.g. 2026.')
      return
    }
    const birth: BirthDate = { day: d, month: m, year: y }
    setDecoding(true)
    setReading(null)
    window.setTimeout(() => {
      setReading({
        name: capitalizeName(cleanName),
        day: d,
        month: m,
        seal: lifeSeal(birth),
        blessed: blessedSeal(d),
        nameNum: nameNumber(cleanName),
        pyn: personalYear(birth, yr),
        spirit: spiritDay(birth),
        soul: soulsDay(birth),
        soulNum: soulNumber(cleanName),
        year: yr,
      })
      setDecoding(false)
      revealResults(resultsRef)
      setShowSwipeHint(true)
    }, 620)
  }

  const sealMeaning = reading ? LIFE_SEALS[reading.seal.value] : null
  const astroKey = reading
    ? reading.seal.value > 9
      ? reduceToDigit(reading.seal.value)
      : reading.seal.value
    : 1

  return (
    <div className="min-h-[100dvh] relative overflow-hidden text-foreground selection:bg-primary/20">
      {/* ── Floating swipe hint ── */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.div
            key="swipe-hint"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-8 left-1/2 z-50 pointer-events-none"
            style={{ translateX: '-50%' }}
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-gray-900/80 backdrop-blur-md shadow-2xl border border-white/10 text-white text-sm font-semibold select-none">
              {/* Left chevron pulses outward */}
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              >
                <ChevronLeft className="w-4 h-4 opacity-60" />
              </motion.div>

              {/* Bouncing hand icon */}
              <motion.span
                className="text-base"
                animate={{ x: [-6, 6, -6] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                👆
              </motion.span>

              <span className="tracking-wide">Swipe for more details</span>

              {/* Right chevron pulses outward */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              >
                <ChevronRight className="w-4 h-4 opacity-60" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 flex justify-between items-center bg-background/80 backdrop-blur-xl border-b border-primary/10">
        <div className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-primary flex items-center gap-2 drop-shadow-sm">
          <Star className="w-6 h-6 md:w-8 md:h-8 text-secondary fill-secondary/50" /> Life Seal
        </div>
        <Dialog open={howOpen} onOpenChange={setHowOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 text-primary bg-background/50 backdrop-blur-sm shadow-sm">
              <HelpCircle className="w-4 h-4" />
              <span className="hidden md:inline font-medium">How it works</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] p-0 border-primary/10 bg-background/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl">
            <DialogHeader className="p-6 pb-4 border-b border-primary/10 bg-primary/5">
              <DialogTitle className="font-serif text-2xl md:text-3xl text-primary flex items-center gap-3">
                <Info className="w-7 h-7 text-secondary fill-secondary/20" /> About Life Seal
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="px-6 py-6 h-full max-h-[calc(85vh-90px)]">
              <div className="space-y-8 pb-8 text-muted-foreground leading-relaxed">
                <p className="text-lg text-foreground/90 font-medium">
                  This calculator implements the numerology system taught in{' '}
                  <em className="text-primary/90">Cosmic Numerology: A Biblical Approach</em>. Every result you see is computed
                  with the book’s own formulas and tables.
                </p>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-primary border-b border-primary/10 pb-2">Two letter systems</h3>
                  <p>
                    The book works with two letter-to-number tables. The <strong className="text-foreground">Roman</strong>{' '}
                    (Pythagorean) table maps A–Z in repeating rows of 1–9 and is used for personal
                    names and the physical vibration of places. The <strong className="text-foreground">Hebrew</strong>{' '}
                    (Chaldean) table assigns letters by sound-affinity and is used for business
                    names, spiritual vibrations of places, and the city synchronization checks.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-primary border-b border-primary/10 pb-2">Your personal seals</h3>
                  <p>
                    <strong className="text-foreground">Life Seal</strong> — reduce your birth day, month and year each to a
                    digit, add them, and reduce again (11 and 22 are kept as master numbers). It is
                    the master pattern of your life. <strong className="text-foreground">Blessed Number</strong> — your day of
                    birth reduced to a single digit; it governs favour and timing.{' '}
                    <strong className="text-foreground">Name Seal</strong> — the letter values of the name you answer to, summed
                    and reduced. <strong className="text-foreground">Personal Year</strong> — birth day + birth month + any
                    calendar year, reduced, revealing the theme of that year.{' '}
                    <strong className="text-foreground">Spirit Day</strong> and <strong className="text-foreground">Soul’s Day</strong> are derived from
                    your full date and weekday of birth. Your <strong className="text-foreground">Personal Months</strong> break
                    the year down further: Personal Year + month number gives each month’s
                    vibration, revealing your cardinal months (birth month and every third month
                    after it), your most blessed month (where the month’s number equals your Life
                    Seal), and your months of abundance (8) and birthing (9).
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-primary border-b border-primary/10 pb-2">Business decoder</h3>
                  <p>
                    A business name is summed with Hebrew values into the{' '}
                    <strong className="text-foreground">Business Name Seal</strong>; the launch date’s day gives the business’s
                    Blessed Number. The two are checked against the book’s harmony table, which
                    also drives the auspicious <strong className="text-foreground">launch days</strong> each month. Moon
                    illumination on the launch date (70–100% is ideal) is computed astronomically.
                    The seal and launch day each contribute a <strong className="text-foreground">colour set</strong> for the
                    brand, and together they form the <strong className="text-foreground">Business Destiny Number</strong> — a
                    compound number between 10 and 52 with its own meaning.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-primary border-b border-primary/10 pb-2">Keys to nations &amp; cities</h3>
                  <p>
                    A place name is decoded twice: Roman values give its{' '}
                    <strong className="text-foreground">physical vibration</strong> (what the place is like to live in), Hebrew
                    values give its <strong className="text-foreground">spiritual vibration</strong>. Your compatibility with a
                    city is then checked through the chapter’s Table of Harmonics in ascending
                    order of power: your Blessed Number, then Life Seal, then Name Seal — and
                    finally the vowels of your name against the vowels of the city. Every pairing
                    lands in one of three zones: excellent sync, neutral (you can live there but
                    won’t maximise it), or avoidable disharmony. Where a seal conflicts, the app
                    computes the exact <strong className="text-foreground">difference</strong> and suggests the alias letters
                    or vowel initials that reconcile it.
                  </p>
                </div>

                <div className="space-y-3 bg-secondary/10 p-5 rounded-2xl border border-secondary/30">
                  <h3 className="font-serif text-lg text-secondary-foreground flex items-center gap-2"><Sparkles className="w-4 h-4 text-secondary"/> A note on accuracy</h3>
                  <p className="text-sm text-secondary-foreground/80">
                    Every formula was verified against the book’s own worked examples before being
                    implemented. Where the book’s printed examples contain arithmetic misprints,
                    the app follows the book’s stated tables and method, so a result may
                    occasionally differ from a printed figure — deliberately.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </header>

      <main className="relative z-10 pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide border border-primary/20 shadow-sm mb-4">
            <Heart className="w-4 h-4 fill-primary/20" /> Discover yourself
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight tracking-tight">
            Find your <span className="text-primary relative inline-block">
              Life Seal
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" />
              </svg>
            </span>
          </h1>
          <p className="text-muted-foreground md:text-xl leading-relaxed max-w-2xl mx-auto">
            A delightful journey into your personal numbers. Enter your name and birthday to reveal your sacred path.
          </p>
        </section>

        <Card className="max-w-xl mx-auto bg-white/60 backdrop-blur-xl border-white shadow-xl shadow-primary/5 rounded-3xl animate-in fade-in zoom-in-95 duration-700 delay-150 overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent" />
          <CardContent className="p-6 md:p-10 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/90 font-bold ml-1">Your Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Eleanor Rigby"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  className="bg-white border-primary/10 focus-visible:ring-primary/30 focus-visible:border-primary/50 h-14 text-lg rounded-2xl shadow-sm transition-all hover:border-primary/30"
                />
                <div className="text-xs text-muted-foreground ml-1">The name you respond to most often.</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-foreground/90 font-bold ml-1">Date of Birth</Label>
                <Input 
                  id="dob" 
                  type="date" 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)} 
                  className="bg-white border-primary/10 focus-visible:ring-primary/30 focus-visible:border-primary/50 h-14 text-lg rounded-2xl shadow-sm transition-all hover:border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year" className="text-foreground/90 font-bold ml-1">Year to Peek Into</Label>
                <Input
                  id="year"
                  type="number"
                  min="1900"
                  max="2999"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="bg-white border-primary/10 focus-visible:ring-primary/30 focus-visible:border-primary/50 h-14 text-lg rounded-2xl shadow-sm transition-all hover:border-primary/30"
                />
                <div className="text-xs text-muted-foreground ml-1">See how the numbers line up for a specific year.</div>
              </div>
            </div>
            
            <Button
              onClick={decode}
              disabled={decoding}
              className="w-full h-14 text-lg font-bold rounded-2xl bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
              {decoding ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Unveiling magic...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 fill-white/20" /> REVEAL MY NUMBERS
                </span>
              )}
            </Button>
            
            {error && (
              <div className="text-destructive text-sm text-center font-bold bg-destructive/10 p-4 rounded-2xl border border-destructive/20 animate-in fade-in flex items-center justify-center gap-2" role="alert">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}
          </CardContent>
        </Card>

        {reading && sealMeaning && (() => {
          const heroSeal = (
<section className="text-center space-y-8 animate-in zoom-in-95 duration-1000" aria-label="Your Life Seal">
                <div className="relative inline-flex items-center justify-center w-56 h-56 md:w-64 md:h-64 rounded-full bg-white shadow-2xl shadow-primary/10 border-[6px] border-primary/10 mx-auto group">
                  <div className="absolute -inset-4 rounded-full border-2 border-secondary/30 border-dashed animate-[spin_20s_linear_infinite]" />
                  <div className="absolute -inset-8 rounded-full border border-accent/30 animate-[spin_30s_linear_infinite_reverse]" />
                  
                  <div className="absolute -top-6 -right-6 text-yellow-400 drop-shadow-md animate-bounce"><Star className="w-12 h-12 fill-current" /></div>
                  <div className="absolute -bottom-4 -left-4 text-primary/40 drop-shadow-md"><Heart className="w-10 h-10 fill-current" /></div>
                  
                  <div className="flex flex-col items-center justify-center relative z-10">
                    <span className="text-[6rem] md:text-[7rem] leading-none font-serif font-bold text-primary group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">{reading.seal.value}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-serif text-foreground">{reading.name}</h2>
                  <p className="text-primary font-bold tracking-widest uppercase text-sm md:text-base flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-primary/30 rounded-full" />
                    Your Life Seal
                    <span className="h-px w-8 bg-primary/30 rounded-full" />
                  </p>
                  {(reading.seal.value === 11 || reading.seal.value === 22) && (
                    <div className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-bold shadow-md">
                      <Star className="w-4 h-4 fill-current" /> Master Seal
                    </div>
                  )}
                </div>
              </section>
          );

          const personalSlides = [
<React.Fragment key="0"><Card className="md:col-span-2 bg-white/80 backdrop-blur-md border-white shadow-xl shadow-primary/5 rounded-3xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary via-secondary to-accent" />
                  <CardHeader className="pb-4 pt-8 pl-8 md:pl-10">
                    <CardTitle className="flex justify-between items-center text-3xl font-serif">
                      <span>The Purpose of Your Life Seal</span>
                      <span className="number-seal w-14 h-14 text-2xl shadow-sm">{reading.seal.value}</span>
                    </CardTitle>
                    <CardDescription className="text-primary font-bold text-lg mt-2">{sealMeaning.qualities}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 px-8 md:px-10 pb-8">
                    <p className="text-foreground/80 md:text-lg leading-relaxed">{sealMeaning.description}</p>
                    <div className="bg-primary/5 p-4 rounded-2xl text-sm border border-primary/10 inline-block">
                      <strong className="text-primary block mb-1 font-bold text-xs uppercase tracking-wider">How we found it</strong>
                      <div className="text-muted-foreground font-mono font-medium">{reading.seal.steps.join('  →  ')}</div>
                    </div>
                  </CardContent>
                </Card></React.Fragment>,
<React.Fragment key="1"><Card className="bg-white/80 backdrop-blur-md border-white shadow-lg shadow-primary/5 rounded-3xl transition-all hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-2xl font-serif">
                      <span>Your Name Seal</span>
                      <span className="number-seal w-12 h-12 text-xl">{reading.nameNum.value}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {reading.nameNum.perLetter.map((pl, i) => (
                        <div key={i} className="flex flex-col items-center bg-accent/10 border border-accent/20 rounded-xl p-2 min-w-[3rem] shadow-sm">
                          <span className="font-serif font-bold text-foreground text-xl leading-none">{pl.letter}</span>
                          <span className="text-sm font-bold text-accent-foreground/70 mt-1">{pl.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm font-bold text-muted-foreground bg-gray-50 p-3 rounded-xl">
                      {reading.nameNum.perLetter.map((pl) => pl.value).join(' + ')} ={' '}
                      <span className="text-primary">{reading.nameNum.total}</span>
                      {reading.nameNum.total !== reading.nameNum.value &&
                        ` → ${reading.nameNum.value}`}
                    </div>
                    <p className="text-foreground/80 leading-relaxed">Your seal vibrates by your name. Seals and names go hand-in-hand.</p>
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                      <p className="text-primary font-bold italic">{synchronise(reading.seal.value, reading.nameNum.value)}</p>
                    </div>
                  </CardContent>
                </Card></React.Fragment>,
<React.Fragment key="2"><Card className="bg-white/80 backdrop-blur-md border-white shadow-lg shadow-primary/5 rounded-3xl transition-all hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-2xl font-serif">
                      <span>Year {reading.year}</span>
                      <span className="number-seal w-12 h-12 text-xl bg-secondary/10 border-secondary/30 text-secondary-foreground">{reading.pyn.value}</span>
                    </CardTitle>
                    {(reading.pyn.value === 11 || reading.pyn.value === 22) && (
                      <CardDescription className="text-secondary-foreground font-bold flex items-center gap-1.5 mt-1">
                        <Star className="w-4 h-4 fill-secondary" /> A Master Year
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3 text-foreground/80">
                      {(PERSONAL_YEARS[reading.pyn.value] ?? []).map((line, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <Sun className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{line}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 text-sm">
                      <strong className="text-secondary-foreground block mb-2 text-lg font-serif">Career & Focus</strong>
                      <span className="text-foreground/80 font-medium leading-relaxed">{CAREER_BY_PY[reading.pyn.value]}</span>
                    </div>
                  </CardContent>
                </Card></React.Fragment>,
<React.Fragment key="3"><Card className="md:col-span-2 bg-white/80 backdrop-blur-md border-white shadow-xl shadow-primary/5 rounded-3xl">
                  <CardHeader className="border-b border-primary/5 pb-6">
                    <CardTitle className="flex justify-between items-center text-2xl md:text-3xl font-serif">
                      <span>Your Monthly Rhythms</span>
                      <span className="number-seal w-12 h-12 text-xl bg-accent/20 border-accent/30 text-accent-foreground">{reduceToDigit(reading.pyn.value)}</span>
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">{PM_COUNSEL}</p>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    {(() => {
                      const months = decodeMonths(
                        reduceToDigit(reading.pyn.value),
                        reduceToDigit(reading.seal.value),
                        reading.month,
                      )
                      const presentTags = [...new Set(months.flatMap((m) => m.tags))] as MonthTag[]
                      return (
                        <div className="space-y-10">
                          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {months.map((m, i) => (
                              <div
                                key={m.month}
                                className={`flex flex-col p-4 rounded-2xl transition-all shadow-sm ${
                                  m.tags.includes('blessed') 
                                    ? 'bg-gradient-to-br from-primary to-primary/80 text-white shadow-primary/30 hover:scale-105' 
                                    : m.tags.length 
                                      ? 'bg-secondary/10 border-2 border-secondary/30' 
                                      : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
                                }`}
                              >
                                <div className={`text-xs uppercase tracking-widest font-bold mb-2 ${m.tags.includes('blessed') ? 'text-white/80' : 'text-muted-foreground'}`}>{m.name.slice(0, 3)}</div>
                                <div className={`text-3xl font-serif font-bold ${m.tags.includes('blessed') ? 'text-white' : 'text-foreground'}`}>{m.pm}</div>
                                {m.tags.length > 0 && (
                                  <div className="flex flex-col gap-1 mt-3">
                                    {m.tags.map((t) => (
                                      <span key={t} className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full text-center font-bold ${
                                        t === 'blessed' 
                                          ? 'bg-white/20 text-white' 
                                          : 'bg-secondary text-secondary-foreground shadow-sm'
                                      }`}>
                                        {MONTH_TAG_LABELS[t].replace('Month of ', '').replace(' Month', '')}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-5">
                            {presentTags.map((t) => (
                              <div key={t} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                <div className="font-serif text-primary text-xl mb-3 flex items-center gap-2">
                                  {t === 'blessed' ? <Star className="w-5 h-5 text-secondary fill-secondary" /> : <Sparkles className="w-5 h-5" />}
                                  {MONTH_TAG_LABELS[t]}
                                </div>
                                <div className="font-bold text-foreground mb-2">
                                  {months.filter((m) => m.tags.includes(t)).map((m) => m.name).join(', ')}
                                </div>
                                <p className="text-sm text-foreground/70 leading-relaxed font-medium">{MONTH_TAG_NOTES[t]}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card></React.Fragment>,
<React.Fragment key="4"><Card className="md:col-span-2 bg-white/80 backdrop-blur-md border-white shadow-xl shadow-primary/5 rounded-3xl">
                  <CardContent className="p-6 md:p-10 space-y-8">
                    {(() => {
                      const months = decodeMonths(
                        reduceToDigit(reading.pyn.value),
                        reduceToDigit(reading.seal.value),
                        reading.month,
                      )
                      const lifeSealDigit = reduceToDigit(reading.seal.value)
                      const nameDigit = reduceToDigit(reading.nameNum.value)
                      const blessedSealDigit = reading.blessed.value
                      const soulDigit = reading.soulNum.value
                      const defaultMonth = months.find((m) => m.tags.includes('blessed'))?.month ?? reading.month
                      const pdMonth = pdMonthChoice ?? defaultMonth
                      const pmForMonth = months.find((m) => m.month === pdMonth)!.pm
                      const totalDays = daysInMonth(reading.year, pdMonth)
                      const days = decodeDays(pmForMonth, totalDays)
                      const groups = blessedDayGroups(days, lifeSealDigit, nameDigit, blessedSealDigit, soulDigit)
                      const groupsWithDays = groups.filter((g) => g.days.length > 0)
                      const totalBlessed = groupsWithDays.reduce((a, g) => a + g.days.length, 0)
                      const dayGroupIndex = new Map<number, number>()
                      groupsWithDays.forEach((g, gi) => g.days.forEach((d) => dayGroupIndex.set(d, gi)))
                      const heightened = heightenDay(pdHeightenTarget, lifeSealDigit, nameDigit, blessedSealDigit, soulDigit)
                      
                      return (
                        <>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100 mt-2">
                            <div>
                              <CardTitle className="text-2xl md:text-3xl font-serif mb-3 flex items-center gap-4">
                                Daily Vibrations <span className="number-seal w-10 h-10 text-xl bg-accent/20 border-accent/30 text-accent-foreground">{pmForMonth}</span>
                              </CardTitle>
                              <p className="text-sm font-medium text-muted-foreground max-w-md">{PD_COUNSEL}</p>
                            </div>
                            <div className="space-y-2 w-full md:w-64 shrink-0 bg-gray-50 p-4 rounded-2xl">
                              <Label htmlFor="pdmonth" className="text-foreground font-bold text-xs uppercase tracking-wider ml-1">Pick a month</Label>
                              <select
                                id="pdmonth"
                                value={pdMonth}
                                onChange={(e) => setPdMonthChoice(Number(e.target.value))}
                                className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary/50 shadow-sm"
                              >
                                {MONTH_NAMES.map((name, i) => (
                                  <option key={name} value={i + 1}>
                                    {name} {months[i].tags.includes('blessed') ? ' ⭐ Most Blessed' : ''}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-7 gap-2 md:gap-3">
                            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                              <div key={d} className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2">{d}</div>
                            ))}
                            {days.map((d) => {
                              const gi = dayGroupIndex.get(d.day)
                              const isHighlighted = gi !== undefined
                              return (
                                <div
                                  key={d.day}
                                  title={PD_FOCUS[d.pd]}
                                  className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-2xl transition-all ${
                                    isHighlighted 
                                      ? 'bg-primary text-white shadow-md hover:-translate-y-1' 
                                      : 'bg-gray-50 border border-gray-100 text-foreground hover:bg-gray-100'
                                  }`}
                                >
                                  <div className={`text-[10px] md:text-xs font-bold uppercase mb-1 ${isHighlighted ? 'text-white/80' : 'text-muted-foreground'}`}>
                                    {d.day}
                                  </div>
                                  <div className="text-lg md:text-2xl font-serif font-bold">{d.pd}</div>
                                </div>
                              )
                            })}
                          </div>

                          {groupsWithDays.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-4 mt-8">
                              {groupsWithDays.map((g, gi) => (
                                <div key={g.key} className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                                  <div className="font-serif text-primary text-lg mb-2">
                                    {g.label} <span className="font-sans font-black bg-white px-2 py-1 rounded-md shadow-sm ml-2">{g.matchValue}</span>
                                  </div>
                                  <div className="text-foreground font-bold mb-3 flex flex-wrap gap-2">
                                    {g.days.map((d) => (
                                      <span key={d} className="bg-white text-primary px-2 py-1 rounded-md text-xs shadow-sm">{d}{ordinal(d)}</span>
                                    ))}
                                  </div>
                                  <p className="text-sm font-medium text-foreground/70 leading-relaxed">{g.note}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <AccordionItem value="focus" className="border-none">
                              <AccordionTrigger className="text-foreground hover:text-primary font-bold px-6 py-4">
                                Daily Focus Guide (What to do on each day)
                              </AccordionTrigger>
                              <AccordionContent className="px-6 pb-6 bg-gray-50/50">
                                <ul className="space-y-4 pt-4">
                                  {Object.entries(PD_FOCUS).map(([n, text]) => (
                                    <li key={n} className="flex gap-4 items-start">
                                      <span className="number-seal w-8 h-8 text-sm shrink-0 bg-white shadow-sm border-gray-200 text-foreground">{n}</span>
                                      <span className="leading-relaxed font-medium text-foreground/80 pt-1">{text}</span>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>

                          <div className="bg-secondary/10 p-6 md:p-8 rounded-3xl border border-secondary/20 space-y-6">
                            <div>
                              <h4 className="font-serif text-2xl text-secondary-foreground mb-3 flex items-center gap-2">
                                <Sun className="w-6 h-6 text-secondary fill-secondary" /> Add some sunshine
                              </h4>
                              <p className="text-sm font-medium text-secondary-foreground/80 max-w-2xl leading-relaxed">
                                Want to know exactly what to focus on today? Pick a Personal Day number to see how your core traits line up with it.
                              </p>
                            </div>
                            <div className="space-y-2 max-w-xs">
                              <Label htmlFor="pdheighten" className="text-xs font-bold uppercase tracking-wider text-secondary-foreground">Target Day</Label>
                              <select
                                id="pdheighten"
                                value={pdHeightenTarget}
                                onChange={(e) => setPdHeightenTarget(Number(e.target.value))}
                                className="flex h-12 w-full items-center justify-between rounded-xl border border-secondary/30 bg-white px-4 text-sm font-bold focus-visible:ring-2 focus-visible:ring-secondary/50 shadow-sm text-secondary-foreground"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                  <option key={n} value={n}>Personal Day {n}</option>
                                ))}
                              </select>
                            </div>
                            <ul className="space-y-3">
                              {heightened.map((a) => (
                                <li key={a.key} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 p-4 rounded-2xl bg-white border border-secondary/20 shadow-sm">
                                  <div className="font-mono text-sm font-bold flex items-center gap-2 whitespace-nowrap text-secondary-foreground">
                                    <span>{a.label}</span>
                                    <span className="bg-secondary/20 px-2 py-1 rounded">{a.base}</span>
                                    <span>+</span>
                                    <span>PD {pdHeightenTarget}</span>
                                    <span>=</span>
                                    <span className="number-seal w-8 h-8 text-sm bg-secondary text-secondary-foreground border-none shadow-sm">{a.value}</span>
                                  </div>
                                  {LIFE_SEALS[a.value] && (
                                    <div className="text-sm md:border-l-2 border-secondary/20 md:pl-5 font-medium text-foreground/80">
                                      Focus on <span className="font-bold text-primary">{LIFE_SEALS[a.value].qualities.split(',')[0]}</span>
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )
                    })()}
                  </CardContent>
                </Card></React.Fragment>,
<React.Fragment key="5"><Card className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-purple-50 backdrop-blur-md border-indigo-100 shadow-xl rounded-3xl overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="flex justify-between items-center text-3xl font-serif text-indigo-900">
                      <span className="flex items-center gap-3"><Briefcase className="w-8 h-8 text-indigo-500" /> Career & Purpose</span>
                      <span className="number-seal w-14 h-14 text-2xl bg-indigo-100 border-indigo-200 text-indigo-700">{reading.blessed.value}</span>
                    </CardTitle>
                    <CardDescription className="text-indigo-600 font-bold text-lg mt-2">
                      Blessed Seal {reading.blessed.value} meets Life Seal {reading.seal.value}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 space-y-8">
                    <p className="text-indigo-800/80 font-medium leading-relaxed text-lg">
                      Your <strong className="text-indigo-900">Blessed Seal</strong> and <strong className="text-indigo-900">Life Seal</strong> together
                      reveal the professional paths where you'll shine brightest.
                    </p>

                    {businessCombos(reading.blessed.value, reduceToDigit(reading.seal.value)).length > 0 && (
                      <div className="bg-white/60 border border-indigo-100 rounded-2xl p-6 space-y-4 shadow-sm">
                        {businessCombos(reading.blessed.value, reduceToDigit(reading.seal.value)).map((line, i) => (
                          <div key={i} className="flex gap-4 items-start text-indigo-900 font-medium">
                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed text-lg">{line}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 space-y-4">
                        <h3 className="font-serif text-xl text-indigo-900 flex items-center justify-between border-b border-indigo-50 pb-3">
                          Blessed Seal {reading.blessed.value}
                        </h3>
                        <p className="text-indigo-700/80 italic font-medium leading-relaxed">
                          {BUSINESS_SEALS[reading.blessed.value]?.counsel}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {BUSINESS_SEALS[reading.blessed.value]?.areas.map((a, i) => (
                            <span key={i} className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1.5 rounded-full text-sm">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>

                      {reduceToDigit(reading.seal.value) !== reading.blessed.value && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 space-y-4">
                          <h3 className="font-serif text-xl text-indigo-900 flex items-center justify-between border-b border-indigo-50 pb-3">
                            Life Seal {reduceToDigit(reading.seal.value)}
                          </h3>
                          <p className="text-indigo-700/80 italic font-medium leading-relaxed">
                            {BUSINESS_SEALS[reduceToDigit(reading.seal.value)]?.counsel}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {BUSINESS_SEALS[reduceToDigit(reading.seal.value)]?.areas.map((a, i) => (
                              <span key={i} className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1.5 rounded-full text-sm">
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card></React.Fragment>,
<React.Fragment key="6"><Card className="bg-white/80 backdrop-blur-md border-white shadow-lg shadow-primary/5 rounded-3xl transition-all hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-serif text-accent-foreground flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-accent" /> Spirit Day
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
                      <div className="text-3xl font-serif font-bold text-accent-foreground mb-4 text-center">
                        {reading.spirit.date}
                      </div>
                      <p className="text-foreground/80 font-medium leading-relaxed text-center">
                        Your yearly reset day. A perfect time for quiet reflection, setting intentions, and connecting with your deeper purpose.
                      </p>
                    </div>
                  </CardContent>
                </Card></React.Fragment>,
<React.Fragment key="7"><Card className="bg-white/80 backdrop-blur-md border-white shadow-lg shadow-primary/5 rounded-3xl transition-all hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-serif text-primary flex items-center gap-3">
                      <Heart className="w-6 h-6 text-primary fill-primary/20" /> Soul's Day
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 h-full flex flex-col justify-center">
                      <div className="text-3xl font-serif font-bold text-primary mb-4 text-center">
                        {reading.soul}
                      </div>
                      <p className="text-foreground/80 font-medium leading-relaxed text-center">
                        The day of the week you were born. It connects to the rhythm of your physical energy and natural timing.
                      </p>
                    </div>
                  </CardContent>
                </Card></React.Fragment>,
<React.Fragment key="8"><Card className="md:col-span-2 bg-gray-900 text-white shadow-2xl rounded-3xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
                  
                  <CardHeader className="relative z-10 p-8 border-b border-white/10">
                    <CardTitle className="text-3xl font-serif flex items-center gap-4">
                      Cosmic Signature
                      <Moon className="w-8 h-8 text-yellow-200 fill-yellow-200/20" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                        <div className="font-serif text-green-300 mb-4 flex items-center gap-2 text-lg">
                          <CheckCircle2 className="w-5 h-5" /> Your Strengths
                        </div>
                        <div className="text-white/80 font-medium leading-relaxed">
                          {VIBRATIONS[reading.seal.value]?.positive}
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                        <div className="font-serif text-rose-300 mb-4 flex items-center gap-2 text-lg">
                          <AlertCircle className="w-5 h-5" /> Growth Areas
                        </div>
                        <div className="text-white/80 font-medium leading-relaxed">
                          {VIBRATIONS[reading.seal.value]?.negative}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                      <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-yellow-200/20 flex items-center justify-center border border-yellow-200/30 shrink-0">
                          <Moon className="w-7 h-7 text-yellow-200" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-widest text-white/50 font-bold mb-1">Ruling Body</div>
                          <div className="font-serif text-2xl">{ASTRO[astroKey]?.planet}</div>
                        </div>
                      </div>
                      <div className="flex-[2] bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                          <Sparkles className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-widest text-white/50 font-bold mb-1">Lucky Colors</div>
                          <div className="font-serif text-xl md:text-2xl">{ASTRO[astroKey]?.colours}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card></React.Fragment>
          ];

          return (
            <div className="space-y-20 pt-12 animate-in fade-in duration-1000">
              <div className="flex justify-center" ref={resultsRef}>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!pdfRef.current || pdfBusy) return
                    setPdfBusy(true)
                    setPdfError('')
                    downloadReadingPdf(pdfRef.current, `${reading.name.replace(/\s+/g, '-')}-life-seal-reading`)
                      .catch((err) => {
                        console.error('PDF error:', err)
                        setPdfError('PDF download failed — please try again.')
                      })
                      .finally(() => setPdfBusy(false))
                  }}
                  disabled={pdfBusy}
                  className="gap-2 rounded-full border-primary/20 text-primary font-bold hover:bg-primary/10 bg-white shadow-sm"
                >
                  {pdfBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  {pdfBusy ? 'Saving memory...' : 'Save as PDF'}
                </Button>
                {pdfError && (
                  <p className="text-destructive text-xs font-semibold text-center animate-in fade-in">{pdfError}</p>
                )}
              </div>

              {/* ON SCREEN CAROUSEL */}
              <div className="space-y-16 max-w-3xl mx-auto w-full">
                {heroSeal}
                <SlideShow slides={personalSlides} onFirstSwipe={() => setShowSwipeHint(false)} />
              </div>

              {/* OFFSCREEN PDF CONTAINER — each data-pdf-section becomes its own PDF page */}
              <div className="pointer-events-none" style={{ position: 'fixed', top: 0, left: '-9999px', width: '1100px' }}>
                <div ref={pdfRef} className="space-y-10 bg-[#f7f4ec] p-12">
                  <div data-pdf-section>{heroSeal}</div>
                  {personalSlides.map((slide, i) => (
                    <div data-pdf-section key={i}>
                      {slide}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}
        <div className="relative py-20 mt-32">
          <div className="absolute inset-0 bg-white shadow-xl shadow-primary/5 rounded-[3rem] transform -rotate-1 border border-primary/10" />
          <section className="relative z-10 px-6 py-12 text-center space-y-8 max-w-4xl mx-auto" aria-label="Decode your business">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground">Business Harmony</h2>
            <p className="text-muted-foreground md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Find out if your business name vibrates well with its launch date, and discover its unique destiny number.
            </p>
            
            <Card className="bg-gray-50 border-gray-200 shadow-sm mt-12 text-left rounded-3xl overflow-hidden max-w-2xl mx-auto">
              <CardContent className="p-8 md:p-10 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bizname" className="text-foreground/90 font-bold ml-1 text-lg">Business Name</Label>
                    <Input
                      id="bizname"
                      type="text"
                      placeholder="e.g. Sunny Day Cafe"
                      value={bizName}
                      onChange={(e) => setBizName(e.target.value)}
                      className="bg-white border-gray-200 focus-visible:ring-secondary/50 h-14 text-lg rounded-2xl shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bizdate" className="text-foreground/90 font-bold ml-1 text-lg">Launch Date <span className="text-muted-foreground font-normal text-sm ml-2">(Optional)</span></Label>
                    <Input
                      id="bizdate"
                      type="date"
                      value={bizDate}
                      onChange={(e) => setBizDate(e.target.value)}
                      className="bg-white border-gray-200 focus-visible:ring-secondary/50 h-14 text-lg rounded-2xl shadow-sm"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={decodeBusiness}
                  disabled={bizDecoding}
                  className="w-full h-16 text-xl font-bold rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/20 transition-all active:scale-[0.98]"
                >
                  {bizDecoding ? <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> Analyzing...</> : 'CHECK HARMONY'}
                </Button>
                
                {bizError && (
                  <div className="text-destructive text-sm text-center font-bold bg-destructive/10 p-4 rounded-2xl flex items-center justify-center gap-2" role="alert">
                    <AlertCircle className="w-5 h-5" /> {bizError}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>

        {biz && (() => {
          const businessSlides = [
            <React.Fragment key="1"><Card className="bg-white rounded-3xl border-gray-100 shadow-lg shadow-primary/5 overflow-hidden">
                <div className="bg-secondary/10 p-6 border-b border-secondary/20">
                  <CardTitle className="flex justify-between items-center text-2xl font-serif text-secondary-foreground">
                    <span>Name Seal</span>
                    <span className="number-seal w-14 h-14 text-2xl bg-white border-secondary/30 text-secondary-foreground shadow-sm">{biz.seal}</span>
                  </CardTitle>
                </div>
                <CardContent className="p-8 space-y-6">
                  <p className="text-lg font-medium text-foreground/80">{BUSINESS_SEAL_MEANINGS[biz.seal]}</p>
                  <div className="text-sm font-bold text-muted-foreground bg-gray-50 p-4 rounded-xl inline-block">
                    Total value: {biz.total} → {biz.seal}
                  </div>
                </CardContent>
              </Card></React.Fragment>,
            biz.blessed ? (
              <React.Fragment key="2"><Card className="bg-white rounded-3xl border-gray-100 shadow-lg shadow-primary/5 overflow-hidden">
                  <div className="bg-primary/5 p-6 border-b border-primary/10">
                    <CardTitle className="flex justify-between items-center text-2xl font-serif text-primary">
                      <span>Launch Day</span>
                      <span className="number-seal w-14 h-14 text-2xl bg-white border-primary/20 text-primary shadow-sm">{biz.blessed}</span>
                    </CardTitle>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <p className="text-lg font-medium text-foreground/80">{BLESSED_NUMBER_GUIDE}</p>
                    <div className="text-sm font-bold text-muted-foreground bg-gray-50 p-4 rounded-xl inline-block">
                      From day {biz.launchDay}
                    </div>
                  </CardContent>
                </Card></React.Fragment>
            ) : (
              <React.Fragment key="3"><Card className="bg-gray-50 border-gray-200 border-dashed rounded-3xl flex items-center justify-center min-h-[200px]">
                  <CardContent className="p-8 text-center text-muted-foreground font-medium">
                    Add a launch date to see harmony and color analysis.
                  </CardContent>
                </Card></React.Fragment>
            ),
            biz.blessed ? (
              <React.Fragment key="4"><Card className="bg-white rounded-3xl border-gray-100 shadow-xl shadow-primary/10 overflow-hidden">
                <CardHeader className="p-8 md:p-10 border-b border-gray-50 text-center">
                  <CardTitle className="text-3xl md:text-4xl font-serif text-foreground mb-4">The Verdict</CardTitle>
                  {(() => {
                    const status = harmonyStatus(biz.seal, biz.blessed)
                    return (
                      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-lg shadow-sm border ${
                        status === 'harmony' ? 'bg-green-50 text-green-700 border-green-200' :
                        status === 'neutral' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {status === 'harmony' ? <CheckCircle2 className="w-6 h-6" /> :
                         status === 'neutral' ? <Info className="w-6 h-6" /> :
                         <AlertCircle className="w-6 h-6" />}
                        {status.toUpperCase()} HARMONY
                      </div>
                    )
                  })()}
                </CardHeader>
                <CardContent className="p-8 md:p-10 space-y-10">
                  {harmonyStatus(biz.seal, biz.blessed) !== 'harmony' && (
                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                      <h4 className="font-serif text-amber-900 text-xl mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> How to fix this
                      </h4>
                      <p className="text-amber-800 font-medium leading-relaxed mb-4">
                        To create better harmony, consider moving your launch to one of these days:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {harmonisingDays(biz.seal).map(d => (
                          <span key={d} className="bg-white text-amber-700 font-bold px-4 py-2 rounded-xl shadow-sm border border-amber-100">
                            {d}{ordinal(d)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {biz.launchDay !== null && (() => {
                    const bdn = computeBDN(biz.total, biz.seal, biz.launchDay, biz.blessed)
                    if (!bdn) return null
                    const meaning = bdnMeaning(bdn.value)
                    return (
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-100">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                          <div className="text-center md:text-left">
                            <div className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-2">Business Destiny Number</div>
                            <div className="text-5xl md:text-6xl font-serif font-bold text-indigo-900">{bdn.value}</div>
                          </div>
                          <div className="flex-1 md:border-l-2 border-indigo-200/50 md:pl-8">
                            {meaning.base !== bdn.value && (
                              <div className="text-sm font-bold text-indigo-500/70 mb-2">Shares the vibration of {meaning.base}</div>
                            )}
                            <p className="text-indigo-800/80 font-medium leading-relaxed">{meaning.text}</p>
                            <div className="text-xs font-medium text-indigo-400 mt-4">{bdn.steps}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card></React.Fragment>
            ) : null
          ].filter(Boolean) as React.ReactNode[];

          return (
            <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pt-10" ref={bizResultsRef}>
              <SlideShow slides={businessSlides} onFirstSwipe={() => setShowSwipeHint(false)} />
            </div>
          )
        })()}
                <div className="relative py-20 mt-32">
          <div className="absolute inset-0 bg-accent/5 rounded-[3rem] transform rotate-1 border border-accent/10" />
          <section className="relative z-10 px-6 py-12 text-center space-y-8 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground">City Vibrations</h2>
            <p className="text-muted-foreground md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Discover if you and a city are a match made in heaven, or if the energy clashes.
            </p>
            
            <Card className="bg-white border-accent/20 shadow-xl shadow-accent/5 mt-12 text-left rounded-3xl overflow-hidden max-w-2xl mx-auto">
              <CardContent className="p-8 md:p-10 space-y-8">
                <div className="space-y-4">
                  <Label htmlFor="cityname" className="text-foreground/90 font-bold ml-1 text-lg">City or Country Name</Label>
                  <Input
                    id="cityname"
                    type="text"
                    placeholder="e.g. Tokyo, London, Australia"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    className="bg-gray-50 border-gray-200 focus-visible:ring-accent/50 h-14 text-lg rounded-2xl shadow-inner"
                    onKeyDown={(e) => e.key === 'Enter' && decodeCity()}
                  />
                </div>
                
                <Button
                  onClick={decodeCity}
                  disabled={cityDecoding || !cityName.trim()}
                  className="w-full h-16 text-xl font-bold rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all active:scale-[0.98]"
                >
                  {cityDecoding ? <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> Analyzing...</> : 'CHECK CITY HARMONY'}
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>

        {city && reading && (() => {
          const citySlides = [
<React.Fragment key="0"><Card className="bg-white rounded-3xl border-gray-100 shadow-lg overflow-hidden">
                <div className="bg-orange-50 p-6 border-b border-orange-100">
                  <CardTitle className="text-2xl font-serif text-orange-900 flex justify-between items-center">
                    Physical Vibration
                    <span className="number-seal w-12 h-12 text-xl bg-white border-orange-200 text-orange-700 shadow-sm">{city.physical}</span>
                  </CardTitle>
                </div>
                <CardContent className="p-8 space-y-4">
                  <p className="text-orange-900/80 font-medium leading-relaxed">
                    This is what the city feels like on a day-to-day basis. The infrastructure, the pace, the visible reality.
                  </p>
                  <div className="text-sm font-bold text-orange-700/60 bg-white p-3 rounded-xl inline-block border border-orange-100">
                    Total: {city.physicalTotal} → {city.physical}
                  </div>
                </CardContent>
              </Card></React.Fragment>,
<React.Fragment key="1"><Card className="bg-white rounded-3xl border-gray-100 shadow-lg overflow-hidden">
                <div className="bg-purple-50 p-6 border-b border-purple-100">
                  <CardTitle className="text-2xl font-serif text-purple-900 flex justify-between items-center">
                    Spiritual Vibration
                    <span className="number-seal w-12 h-12 text-xl bg-white border-purple-200 text-purple-700 shadow-sm">{city.spiritual}</span>
                  </CardTitle>
                </div>
                <CardContent className="p-8 space-y-4">
                  <p className="text-purple-900/80 font-medium leading-relaxed">
                    This is the hidden energy of the city. The underlying forces, spiritual atmosphere, and deep currents.
                  </p>
                  <div className="text-sm font-bold text-purple-700/60 bg-white p-3 rounded-xl inline-block border border-purple-100">
                    Total: {city.spiritualTotal} → {city.spiritual}
                  </div>
                </CardContent>
              </Card></React.Fragment>,
<React.Fragment key="2"><Card className="bg-white rounded-3xl border-gray-100 shadow-xl overflow-hidden">
              <CardHeader className="p-8 border-b border-gray-50 text-center">
                <CardTitle className="text-3xl font-serif text-foreground">Harmony Analysis</CardTitle>
                <CardDescription className="text-lg font-medium text-muted-foreground mt-2">
                  How your numbers interact with {city.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {(() => {
                  const harmonies = [
                    { label: "Blessed Seal", userVal: reading.blessed.value, cityVal: city.physical, type: 'physical' as const },
                    { label: "Life Seal", userVal: reduceToDigit(reading.seal.value), cityVal: city.physical, type: 'physical' as const },
                    { label: "Name Seal", userVal: reading.nameNum.value, cityVal: city.physical, type: 'physical' as const },
                    { label: "Vowels", userVal: chaldeanVowels(reading.name).value, cityVal: chaldeanVowels(city.name).value, type: 'spiritual' as const }
                  ]

                  return (
                    <div className="divide-y divide-gray-100">
                      {harmonies.map((h, i) => {
                        const status = cityHarmony(h.userVal, h.cityVal)
                        return (
                          <div key={i} className="p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-xl text-gray-700 shadow-inner">
                                {h.userVal}
                              </div>
                              <div className="text-center w-8 text-gray-400 font-bold">VS</div>
                              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-xl text-gray-700 shadow-inner">
                                {h.cityVal}
                              </div>
                              <div className="ml-4">
                                <div className="font-bold text-foreground text-lg">{h.label}</div>
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{h.type} connection</div>
                              </div>
                            </div>
                            
                            <div className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 ${
                              status === 'excellent' ? 'bg-green-100 text-green-800' :
                              status === 'neutral' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-rose-100 text-rose-800'
                            }`}>
                              {status === 'excellent' ? <CheckCircle2 className="w-5 h-5" /> :
                               status === 'neutral' ? <Info className="w-5 h-5" /> :
                               <AlertCircle className="w-5 h-5" />}
                              {CITY_HARMONY_LABELS[status]}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </CardContent>
            </Card></React.Fragment>
          ];

          return (
            <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pt-10" ref={cityResultsRef}>
              <SlideShow slides={citySlides} onFirstSwipe={() => setShowSwipeHint(false)} />
            </div>
          )
        })()}

            </main>
    </div>
  )
}
