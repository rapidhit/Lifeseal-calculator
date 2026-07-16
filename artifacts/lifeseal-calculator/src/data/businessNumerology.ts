// Ch. 31 — Business Numerology
// Career & business areas by Blessed Seal / Life Seal.
// Wording condensed from the book's teachings.

export interface BusinessSeal {
  birthDays: number[]
  /** Condensed character note for this seal in business */
  counsel: string
  /** Areas of work / business best suited to this vibration */
  areas: string[]
  /** Extra caution or advantage note, if the book gives one */
  note?: string
}

export const BUSINESS_SEALS: Record<number, BusinessSeal> = {
  1: {
    birthDays: [1, 10, 19, 28],
    counsel:
      'Do a business you are truly passionate about, with the greatest interest and experience gathered through the work — one you also have versatility and great aptitude for.',
    areas: [
      'Any Government job',
      'Contract jobs with the Government',
      'Projects connected to religion',
      'Organizations that hold honest value for people — work demanding sincerity and high moral standards suits you best',
      'Politics',
      'Start-up projects or organizations',
      'General trading',
      'Real estate',
      'Commerce — you are full of plans and ideas',
      'Teaching / lecturing — your disciplined nature',
      'Medical field and its allied jobs',
    ],
  },
  2: {
    birthDays: [2, 11, 20, 29],
    counsel:
      'Business numerological vibrations point you toward creative, expressive and trading work.',
    areas: [
      'Pastor or teacher of religious studies',
      'Writer',
      'Lawyer',
      'Master of Ceremonies (MC)',
      'Agriculture — especially vegetables, fruits and other produce',
      'Textile industry — production or trading of textile products',
      'Tailoring',
      'Textile showrooms and fashion clothing events',
      'Trader of utensils',
      'Animal husbandry — especially dairy products or running dairies',
      'Trader of flowers, scents and perfumes',
      'Trading cosmetics',
      'Trading paper-related items',
      'Trader of books for educational institutions',
      'Printing press',
      'Imaginative and creative businesses',
      'Playwright',
      'Novel writing',
      'Cinema script writer',
      'Movie director',
      'Poet',
      'Painter',
      'Art director',
      'Trading in jewellery',
      'Splendid photographer',
      'Water and beverage trading',
      'Religious researcher',
      'Greatest all-rounder — able to fit into any business',
    ],
  },
  3: {
    birthDays: [3, 12, 21, 30],
    counsel:
      'Number 3 bearers were not carved for business at all. If BOTH your Blessed Seal and Life Seal are 3, success in business will elude you — such a person must flow with the wind of God’s divine vibrational programming, not fly against it. You can only succeed at business if you carry other, more powerful numbers or seals. You are fit for any organization that requires discipline.',
    areas: [
      'Social service with a charity, trust organization or NGO — better for you than running a business',
      'Civil servant',
      'Army, Navy or Air Force — not as a fighter, but as the strategist who plans troop movements',
      'Accountant',
      'Mediator',
      'Psychiatrist',
      'Doctor, nurse, pharmacist — the medical field',
      'Public speaking, e.g. pastor or marketer',
      'Research jobs in any field — chemistry, physics, math, social science',
      'A very good lawyer — you like arguing, convincing and winning; judges are easily convinced by your defence',
      'Good apologist',
      'Career in politics as General Secretary of a party — immense contribution to its growth',
      'Good adviser or counsellor',
      'Very good special assistant to a key leader — statistical recall, record keeping and filing at a moment’s notice',
      'An excellent tool in any systemic organization — peers grow jealous of your talents',
      'Very good parliamentarian or government minister — intelligent counsel backed by a sincere, honest character',
      'Good electoral commissioner — you play the role of a “King Maker”; you enthrone kings',
    ],
    note:
      'The number 3 is quite sensitive: even in choosing your area of work, look at the other aspects of your numerological vibrations first. If your Blessed Number is 3 and your Life Seal is 1 (or any other number), also consult the list under that Life Seal before deciding. All God’s blessed provisions come to a Number 3 person only with a flawless name — a defective or out-of-balance name must be remedied, else no matter how hard they work they end up lowly paid, with delayed promotions, passed over even when overqualified. The remedy is a flawless personal name, a flawless business name and a flawless signature (Chapters 18, 25–28). In God’s programming the Blessed Number is potent but the Life Seal is more so; the Name Seal outranks both, and the Signature Seal is the most powerful of all. Even with a weak Blessed Number like 3 you can become a business magnate with a powerful Name Seal or Signature — this is why God changed the names of those He walked with, and placed His signature of circumcision on Abraham.',
  },
  4: {
    birthDays: [4, 13, 22, 31],
    counsel:
      'You are a very successful trader — you could sell anything, from pins to guns, bolts and nuts to aerospace gadgets, water to firewood; anything sells by this vibration.',
    areas: [
      'Trading in virtually anything',
      'Cattle and furniture trading — you will find real enjoyment in it',
      'Construction work',
      'Author or writer of books',
      'Successful publisher or editor',
      'Public speaker',
      'Sports trainer, gym instructor and coach',
      'Dancer or dance trainer',
      'Outstanding circus performer',
      'Outstanding musician or singer',
      'Spiritual work on the mysteries of life',
      'Outstanding health professional, especially as a doctor',
      'Alternative medicine practice',
      'Outstanding intrapreneur — a perfect associate or assistant, thanks to your revolutionary and novel ideas',
      'Outstanding extrapreneur or consultant',
      'Sharing your ideas through internet businesses — YouTube, Instagram, TikTok, etc.',
      'Marketing or any crowd-related job — you are an extrovert',
      'Commission-based work, or partner and shareholder in other businesses',
    ],
    note:
      'If any of the other factors (business name, location, launch date, signature) are out of balance, the greatest blessing will not manifest fully.',
  },
  5: {
    birthDays: [5, 14, 23],
    counsel:
      'Number 5 folks are divinely appointed for business — tremendous tenacity, extreme intelligence, laser-speed analytical ability and a natural grace to excel in any venture. Risk takers unafraid of failure: they rebound from regrets and go on to succeed at the next venture. Only extreme success satisfies them. They can stay in one place and command global attention, becoming famous through the internet or word of mouth, naturally inventing novel methods to market products and serve clients.',
    areas: [
      'Any business or career path where you have good aptitude, dedicated passion and great interest — invest all your effort and it yields roaring success',
      'Being on your own — with this seal, working for others invests all your grace in advancing your employer’s course',
      'Commission-based work — over ninety percent of successful brokers and commission agents carry number 5 as a key number',
      'Working with multiple organizations and merchants on commission simultaneously — multiple streams of income',
      'Ticket-booking travel agent for airlines, railways and tourist attractions, all at the same time',
      'Multiple jobs according to your strength and ability',
    ],
    note:
      'If you work for someone, you will not receive much beyond take-home pay — unless the leader is generous and good-hearted. Better to be on your own unless the Lord directs otherwise. Scripture shows the pattern: Laban confessed he prospered because of Jacob (Genesis 30:27), and Potiphar’s whole house was blessed for Joseph’s sake (Genesis 39:2–6). If a person has a Blessed Number of 5 and a Life Seal of 1 or 3, they will surely shine and prosper whether in an organization, working for someone, or in their own private business. How pathetic to give a bad name to a number 5, or for them to sign a bad signature — it greatly affects the grace of God’s provision.',
  },
  6: {
    birthDays: [6, 15, 24],
    counsel:
      'The number 6 is one of the best numbers for business. Number 6 folks rarely enjoy schooling or aspire to higher education, yet they are very smart and excel even in businesses they have no formal education in — business is second nature to them. Born leaders with magnetic charisma; even high-profile personalities follow their lead. They love luxury, flashy lifestyles and the beautiful things of this world.',
    areas: [
      'Creative art work — fame and great success in music, dancing, acting and painting',
      'Fine arts — prosperity and fame flow easily from your hearty disposition to life',
      'Jewellery business',
      'Shopping mall',
      'Fashion',
      'Perfume business',
      'Beauty products',
      'Textile business',
      'Luxury clothes business',
      'Phone business',
      'Classy restaurants',
      'Café business',
      'Hair and salon business',
      'Movie industry',
      'Cinema theatre operations',
      'Selling movies',
      'Video library',
      'Successful and powerful politician — your magnetic attraction of people',
      'Sponsoring political campaigns',
      'Parliamentarian',
      'Minister of State',
      'Successful and classy pastor of a mega church',
    ],
  },
  7: {
    birthDays: [7, 16, 25],
    counsel:
      'For number 7 people, commerce in technology, healing and the creative arts carries your vibration.',
    areas: [
      'Commerce in electrical gadgets — TV sets, washing machines, DVD players, blenders, fridges, cameras, etc.',
      'Cell phone dealer — phone accessories such as chargers, covers and screen protectors',
      'Operating a pharmaceutical store',
      'Pharmaceutical factory for manufacturing drugs',
      'Great accomplishment in fine arts — painting, sculpture, etc.',
      'Successful work in the creative arts of music, singing or dancing',
      'Cinema and movie industry — script writer, art director, composer, assistant director, choreographer, stunt master, cinematographer or make-up artist',
      'Movie producer',
      'Movie sales',
      'Selling chemicals and chemistry products',
      'Export and import business',
      'News magazines',
      'Operating a television station',
      'Author of philosophical books',
      'Business in philosophical materials',
      'Sales of philosophical and religious books',
      'Making money writing books on philosophical matters',
      'Television host',
    ],
  },
  8: {
    birthDays: [8, 17, 26],
    counsel:
      'For number 8 people these areas suit you especially, because 8 rules metals, minerals and oil.',
    areas: [
      'Iron and steel business',
      'Hardware business — selling iron rods, nails, etc.',
      'Mining business — gold, bauxite, coal, etc.',
      'CEO or administrator of oil mines',
      'Oil business — petrol and diesel',
      'Business in edible oils too',
      'Administrator or top managerial position of an institution',
      'High-class prestige work like High Court Judge',
      'Economist of international trade',
      'Stock trader',
      'Woollen and fashion industry — clothes and garment production or sales',
      'Woollen blankets and sweaters',
      'Printing industry',
      'Printing press',
      'Transport industry — busing, taxis or cargoes',
      'Courier service',
      'Selling religious books',
    ],
    note:
      'The vibrational energy of Blessed Number and Life Seal 8 comes with wealth — but also with miseries, misfortunes, accidents and sorrows that cause delays, disappointments and defeats in business. It can be mitigated and remedied.',
  },
  9: {
    birthDays: [9, 18, 27],
    counsel: 'Number 9 people are fighters, and so these areas are best suited to them.',
    areas: [
      'Highly competitive work like sports',
      'Military service',
      'Construction industry — mason, carpenter, electrician, civil engineer, quantity surveyor and architect',
      'Commission agent',
      'Real estate — you will shine well here',
      'Buying and selling lands and estates for good profit',
      'Developing landscapes, buildings and apartments',
      'Engineering fields',
      'Manufacturing mechanical and chemical engineering equipment',
      'Erecting electrical power plants with success',
      'Consultant who can plan, design and execute projects in paper mill plants, oil industries, steel roller mills and glass factories',
      'Trading in electrical and electronic equipment, including heavy electrical goods',
      'Selling cell phones and accessories',
      'Iron and steel — selling steel for the construction industry',
      'Producing and selling bricks',
      'Dealing in sand for building construction',
      'Grace to be a successful politician',
      'Career with the Army, Navy, Air Force or police',
      'Positions that demand courage, great skill, strategy and diplomacy',
      'Excelling as a secret agent for the government',
    ],
  },
}

/**
 * Special Blessed-Seal + Life-Seal combinations (Ch. 31).
 * Returns extra counsel lines that apply to this exact pairing.
 */
export function businessCombos(blessed: number, life: number): string[] {
  const lines: string[] = []

  if (blessed === 1 && (life === 3 || life === 6)) {
    lines.push(
      'Blessed Number 1 with Life Seal 3 or 6: the pharmaceutical industry is best for you — you will easily identify the best medicine to cure illnesses.'
    )
  }
  if (blessed === 1 && life === 5) {
    lines.push(
      'Blessed Number 1 with Life Seal 5: you will be an all-round health worker, discovering new ways to treat the sick.'
    )
  }
  if (blessed === 1 && life === 9) {
    lines.push('Blessed Number 1 with Life Seal 9: you can be an expert surgeon.')
  }
  if (blessed === 3 && life === 3) {
    lines.push(
      'Both seals are 3: you will not find success in any kind of business. Flow with the wind of God’s divine programming — pursue disciplined organizational work instead, and master the name, business-name and signature remedies (Chapters 18, 25–28).'
    )
  } else if (blessed === 3) {
    lines.push(
      `Blessed Number 3 with Life Seal ${life}: also consult the areas listed under Life Seal ${life} before making your choice — your Life Seal is more potent than your Blessed Number.`
    )
  } else if (life === 3) {
    lines.push(
      `Life Seal 3 with Blessed Number ${blessed}: also weigh the areas under Blessed Seal ${blessed}, and remember a Number 3 vibration demands a flawless name and signature for the blessing to flow.`
    )
  }
  if (blessed === 3 && (life === 5 || life === 6)) {
    lines.push(
      'Blessed Number 3 with Life Seal 5 or 6: you would face failures if your name is out of balance — and if your workplace’s name does not harmonise with your Blessed Seal, that business ends in losses. Remedy the name first.'
    )
  }
  if (blessed === 5 && (life === 1 || life === 3)) {
    lines.push(
      'Blessed Number 5 with Life Seal 1 or 3: you will surely shine and prosper — whether in an organization, working for someone, or in your own private business.'
    )
  }
  if (blessed === 5 || life === 5) {
    lines.push(
      'A number 5 vibration: unless God has audibly directed you to work with another, consider being on your own — working for others invests your grace in advancing your employer.'
    )
  }
  if (blessed === 8 || life === 8) {
    lines.push(
      'A number 8 vibration brings wealth alongside delays and disappointments — these can be mitigated and remedied through the name, business-name and signature chapters.'
    )
  }

  return lines
}

/** Closing counsel repeated throughout Ch. 31 */
export const BUSINESS_FOOTNOTE =
  'This is not all there is to decoding your business or career: your business name, business location, launch date and signature, among other factors, also affect the outcome of your business and your life — these are treated in their own chapters.'
