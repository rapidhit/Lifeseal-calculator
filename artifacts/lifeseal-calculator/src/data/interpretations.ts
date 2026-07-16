// Interpretations from "Cosmic Numerology: A Biblical Approach"
// Structured for display. Wording condensed from the book's teachings.

export interface SealMeaning {
  qualities: string
  description: string
}

/** Ch. 12 — The Life Seals and their Meanings */
export const LIFE_SEALS: Record<number, SealMeaning> = {
  1: {
    qualities:
      'Leader, Pioneer, Travel, Independence, Goal Achievement, Self-Gratification, Lonely, Inventiveness, Genius, Brilliant',
    description:
      'You have natural leadership dispositions. Bearers of this seal are usually pioneers with long-term achievable goals — straight to the point, calling a spade a spade. Good counsellors, out-of-the-box thinkers and inspirational leaders people look up to, though followers can misread the approach as arrogance. They ultimately achieve success in their set goals amidst resistance. Money finds its way easily into such hands; salary rises come in short periods of work. Seal 1 folks are usually workaholics, so understanding the language and principle of rest is crucial for their health.',
  },
  2: {
    qualities:
      'Emotional, Intuitive, Tactical, Diplomatic, Cooperative, Partnership, Warm, Slow, Timid, Secret, Domestic, Helpful, Introspective, Anxious',
    description:
      'A peace-loving person who hates tension and quarrels, and will go to great lengths to avoid them. Prefers to work quietly in the background rather than take the foreground; does not boast or blow their own trumpet. Perfect associates — often better off working with others than pioneering alone. Money comes through efficiency and commitment to duty. Their delight is in team success: the celebration is "WE WON", not "I WON". Their career path attracts many friends; they never live lonely lives.',
  },
  3: {
    qualities:
      'Love and Affection, Creativity, Play, Expression, Intuition and Intellect of Arts, Joy, Popularity, Marriage, Children, Happy Go-Lucky Attitude, Talented, Achievement, Carelessness',
    description:
      'Careers that bring many friends because of a fun-loving nature. With many visions and fascinations, money plays an important role in realising their dreams. Opportunities come with chances of gains or losses — after a loss they must keep pushing forward, relying on the wisdom of God, common sense and counsel; finances then change gradually and considerably. They will always be part of successful teams, bringing creativity to systems that work and demand colour. They must decidedly focus on work in order not to get bored or unproductive.',
  },
  4: {
    qualities:
      'Hard Work, Stability, Work in Organizations, Cold, Intellectual, Discipline, Restrictions, Sympathy, Unique Events, Upheavals in Life, Energy, Slow Activity',
    description:
      'Life seal 4 is a karmic number — here to finish and complete a test, facing one dilemma after another, yet recognised as extremely resourceful and strategic in any system. Their hard work paves brilliant openings and their ideologies finally become the choice, so they must stick to them and constantly review them. People will doubt them, but staying the path wins despite discouraging comments. Likely to work where ideologies and deep contemplation are demanded. 4 is a number of retribution — a weakness to guard against is unforgiveness.',
  },
  5: {
    qualities:
      'Interest in Religion and Religious Institutions, Change and Freedom, Salesman and Research, Happiness, Communication, Temperament, Writing, Talking, Travel, Contact, Media',
    description:
      'A life of many positive changes — though staying in one clear-cut direction is a struggle. Financial breakthrough lies in travelling or moving from place to place; record keeping and documentation must be of primal importance. Their most attached friends will be in distant lands and will help immensely. Teams they join are usually full of young people ready for change; the midst of the elderly frustrates them. Communication is key to their personality — knowledgeable in speech, but their love of change makes them lack patience to dig deeper into a field of study.',
  },
  6: {
    qualities:
      'Material Supply, Money for Those Who Work Hard, Education, Family and Marriage Life, Community and Harmony at Home, Large Groups and Institutions, Beauty, Harmony and Rhythm, Dominion, Responsible — the influence of Venus: Beauty, Luxury, Art, Decoration, Style',
    description:
      'Loves to be part of communities; success comes easier in systems than working solo. Associates and team members celebrate their personality and love them for their contributions — they make their team come alive. Emotional and easily attractive to the opposite sex; responsible at home and enjoying domestic life, luxury and art. Because of deep attachment to communities they can easily forget personal care — they must attend to their health and not lose it at the expense of dedication to the system.',
  },
  7: {
    qualities:
      'The Number of Inventors, Musicians and Composers, Home and Responsibility of Households, Good Health, Conduct — when not in sync it shows Stubbornness and Deceit',
    description:
      'Given to details, perfection, knowledge and wisdom acquisition. Life is full of challenges and will stress them out unless they fix attention on one particular goal — otherwise much time is wasted planning many things with little focus. On money: focus on one thing, be sure to invest, and neither drift with the wind nor drag the feet, else great opportunities are lost. Typically enjoys good health; creativity and inventions come easily — good musicians, instrumentalists, scientists and researchers. One weakness is lateness, from always wanting to look keenly into issues before making a move.',
  },
  8: {
    qualities:
      'Good Health, Abundance, Money, Energy, Endurance, Power and Wealth. Discipline, Methods, Regularity and Systems, Improvement, Making Life Better — if out of sync it brings destruction and puts one through life’s tests',
    description:
      'Blessed with abundance of wealth and an extremely busy life, with results gained through hard work. Conservative methods bring success; gains from financial decisions are not quick but come with time. Elderly people are very helpful in showing how to tread this life — they draw much inspiration from the experience of elders. They will experience afflictions and delays, but these impact them positively. Seal 8 folks keep noticing the conscious synchronicity of the number 8 and its reduced sums appearing everywhere.',
  },
  9: {
    qualities:
      'Enthusiasm, Activity, Energy, Quarrels, Fights and Aggression, Birthing and Completion, Heightened Consciousness, Healing Ability — the influence of Mars: wars, hot temper, arrogance and strength',
    description:
      'A finisher, not a starter — great transactional leaders who maintain the status quo and drive people toward achieving objectives. Change and new transitions are difficult; projects take forever to begin and are usually met with opposition. The end of the year marks greater excitement and accomplishment than the start, creating a pattern of things left unattended awaiting a better end. Procrastination is a big weakness, so proper planning and implementation is cardinal. Seal 9 indicates heightened consciousness, spirituality and supernatural manifestation; they never contribute to anything until they understand the end clearly — peering deeply into topics makes them great teachers and researchers. A bad quality is blocking the inception of things they do not agree with.',
  },
  11: {
    qualities: 'Master Number — Inventive, Religious leader. Shadow: fanatical, frustrated, sets goals too high to reach',
    description:
      'A Master Seal. 11 heightens the effect of the number 2 (1+1) with intensified spiritual sensitivity and inventiveness. Bearers carry the vibration of religious leadership and heightened consciousness, and must guard against fanaticism and goals set too high to reach.',
  },
  22: {
    qualities: 'Master Number — Good at details, Master achiever. Shadow: inferiority complex, ulterior motives',
    description:
      'A Master Seal. 22 intensifies the meaning of the number 4 (2+2) — the master builder. Excellent with details and a master achiever, but must guard against inferiority complex and ulterior motives.',
  },
}

/** Ch. 14 — Interpreting Personal Year Numbers */
export const PERSONAL_YEARS: Record<number, string[]> = {
  1: [
    'A year that vibrates with new beginnings for you.',
    'The year will be full of enthusiasm and energy.',
    'You will have the desire to initiate new things — a good year to start projects, since PYN 1 holds the impulse to make whatever you start stand the test of time.',
    'It is a year of setting goals and achieving them.',
    'In this year you will feel alone.',
    'However, it is a year of brilliance and great satisfaction.',
  ],
  2: [
    'A year of partnership and continuing things begun in Personal Year 1.',
    'A very good year to give attention to marriage, relationships, and getting along well with community and cooperation.',
    'A slow but warm, domestically inclined year — though it comes with worry and conscious deliberation to solve and handle issues.',
    'It will be full of secrecy and, if not careful, full of deceit.',
    'A year demanding tact and diplomacy in how you relate.',
  ],
  3: [
    'PYN 3 synchronises you to angelic supply.',
    'A year of love, affection, play, creativity, joy, ecstasy, marriage, children and fascination — a year to achieve in a happy-go-lucky attitude.',
    'A season where you will not feel like working hard; you just want to have a good time.',
    'A good year to make new friends, for learning what you ever dreamt of, and for social and creative activities.',
    'A year to be known by your community.',
  ],
  4: [
    'PYN 4 means you have to work hard and overcome challenges.',
    'A year to work toward your goals and ambitions.',
    'A year of results — on condition that you work hard.',
    'A year of great financial milestones.',
    'A year with risk of losing fortunes if not careful, especially concerning debts — yet also a year of debt release and cancellation.',
    'A year of staying up late and waking up early.',
    'A year of great discipline and restrictions — cold, slow and intellectually demanding.',
    'A year of finding gainful employment.',
  ],
  5: [
    'A year of serious changes — 5 is the number of changes.',
    'A year of freedom, making new friends, travels, communication and exploring your inner desires.',
    'A year of great interest in religion and faith.',
    'A year of writing, talking, media contacts, speed, social media, research and salesmanship.',
    'A very good year to change jobs if you want to.',
  ],
  6: [
    'The hand of God is providing you with material supply and money if you dedicate yourself to work.',
    'A year of great responsibility, both intellectually and emotionally.',
    'A year of luxury, beauty and décor.',
    'A season to focus on home and family life.',
    'A good year with vibrations to easily get married and enhance relationships.',
    'Because of the universal vibrational frequency, you may not get to do all you want because of the demands of people close to you.',
    'Ultimately, it is a very good year.',
  ],
  7: [
    'The cosmic vibrations of this year hand you over to an experience of wisdom and knowledge acquisition.',
    'A year of peace, perfection and a call to details which will lead to discovering yourself.',
    'An excellent year of learning and seeking knowledge to better yourself academically — dedicated to discipleship and growth.',
    'A year of education on all fronts, spiritual and physical.',
    'A non-materialistic yet very acquiring year.',
    'A sensitive year, preparing you spiritually and mentally for what is ahead.',
    'A year of good health and conduct — but going out of sync will result in stumbling.',
    'A year to put your spirit and mind to fruitful labour.',
  ],
  8: [
    'The year offers vibrations of power, bringing money and great financial breakthroughs.',
    'A year of buying cheaply and selling at the best prices — property could be made or gotten easily.',
    'A good year to build and finish your real estate.',
    'A good year for investments, lots and chance alignments.',
    'A year of new beginnings of what you couldn’t do in Personal Year 1 — this time with resources easily available to accomplish it.',
    'The season of your life’s chances as programmed by God.',
    'Also a year of financial pressure: people will gravitate to you for monetary help and your debtors will press hard — try not to borrow or use credit unless you are very comfortable with the risks.',
  ],
  9: [
    'The year when the cosmic angelic vibrations are coming to a close.',
    'Concern will be about things of the future — a year of rounding up your plans and planning the next decade of your life.',
    'Not a year to start major execution of projects, but rather finishing long-standing projects.',
    'A year of consummating all existing projects.',
    'A year of priestly service — a season to focus on worship, kingdom, and reaching out to people.',
    'A year of great prophetic sensitivity, conscious of spiritual activities around you.',
    'A year of mighty giving and helping people — a year of generosity.',
  ],
  11: [
    'A Personal Master Year — it projects master cosmic vibrational frequencies.',
    'A year to capitalise and make buoyant decisions.',
    'A year of wonders and great manifestation in all spheres.',
    'You can easily generate new ideas and start new projects or businesses.',
    'Give a lot of attention to detail — these are years of great achievements.',
    'On the flip side, it may end one up as very impulsive; take decisions with tact.',
    'It is favourable only if one understands and takes advantage of the master frequency of the year.',
  ],
  22: [
    'A Personal Master Year — it projects master cosmic vibrational frequencies.',
    'A year of wonders and great manifestation in all spheres.',
    'Generate new ideas and start new projects or businesses; attend to detail — years of great achievements.',
    'On the flip side, guard against impulsiveness; take decisions with tact.',
    'Favourable only if one understands and takes advantage of the master frequency of the year.',
  ],
}

/** Ch. 14 — Career Decisions and PY Number */
export const CAREER_BY_PY: Record<number, string> = {
  1: 'Year of opportunities. Go for the best. Attend to long-term projects.',
  2: 'Stay where you are for now — do not leave. If you have lost your job, a new one is unlikely, so do something for yourself. A promotion will not make you happy.',
  3: 'A happy year. Looking for a new job is very risky — stay and enjoy what you have.',
  4: 'Not a good time to change your career. Save a lot of money and work hard.',
  5: 'Change and go for the opportunities, but be careful — a rush may cause losses.',
  6: 'Good time to grow and expand your career or business.',
  7: 'Go to school to consolidate your knowledge. Take time in decisions because your money is rationed.',
  8: 'Promotion. Money and investment.',
  9: 'Finish long-standing work; round up rather than launch into new careers.',
  11: 'Make no adjustments unless it is extremely important.',
  22: 'Success all the way with opportunities.',
}

/** Ch. 10 — Table of Number Vibrations */
export const VIBRATIONS: Record<number, { positive: string; negative: string }> = {
  1: {
    positive: 'Leader, Energetic, Go-getting, Confident, Doer, Maverick, Original, Thinker, Influencer, Pioneer',
    negative: 'Aggressive, Stubborn, Self-Conscious, Egotistic, Self-Seeking, Extremist',
  },
  2: {
    positive: 'Partnership, Cooperative, Approachable, Supportive, Unassertive, Discretion, Diplomacy, Introspective',
    negative: 'Emotional, Unstable, Insecure, Subservient, Timid, Deceptive, Double-Tongued, Lack of Temperance, Tricky',
  },
  3: {
    positive: 'Family, Love and Affection, Play, Go-lucky attitude, Talented, Popular, Creativity, Excited, Entertainer, Good at Writing and Speaking',
    negative: 'Bored, Dislikes Responsibility, Impulsive, Morose, Unproductive, Wasteful, Envious',
  },
  4: {
    positive: 'Disciplined, Good worker, Works in Organizations, Honest, Organized, Patient, Stable, Patriotic, Practical, Reliable',
    negative: 'Boring, Argumentative, Dry, Too Serious, Opinionated, Stern, Workaholic, Upheavals in life, Slow activity',
  },
  5: {
    positive: 'Adventurous, Adaptable, Courageous, Delightful, Clever, Intellectual, Research, Freedom, Social, Super Salesman, Humorous, Communication, Good at Writing and Speaking, Interested in Religion',
    negative: 'Restless, Irresponsible, Careless, Debauchery, Gambler',
  },
  6: {
    positive: 'Domestic, Artistic, Humanitarian, Nurturer, Accountable, Serves, Marriage life, Does well with large groups and institutions, Community, Beauty, Decoration, Luxury, Art, Style',
    negative: 'Nosy, Slavery, Self-righteous, Complacent, Sexual tyranny',
  },
  7: {
    positive: 'Dignified, Educator, Intuitive, Inventive, Love of nature, Silent, Spiritual or Scientific, Studious, Good Health, Awakening, Accuracy, Spiritual Perfection, Detail',
    negative: 'Skeptical, Unapproachable, Melancholy, Dwells on the past, Stubborn',
  },
  8: {
    positive: 'Abundance, Efficient, Stamina, Ambitious, New Beginning, Wealth, Manifestation, New Wave',
    negative: 'Impatient, Materialistic, Needs philosophic study, Not frugal, Pushy, Thoughtless, Abusive, Cruel, Ignorant, Intolerant, Revengeful, Schemer, Temper, Uncultured',
  },
  9: {
    positive: 'Birthing, Completion, Heightened Consciousness, Dramatic, Philanthropic, Unselfish, Priesthood, Seclusion',
    negative: 'Aggression, Aimless, Burdened, Frustrated, Unfulfilled, Wars, Hot Temper, Arrogance, Strength',
  },
  11: {
    positive: 'Inventive, Religious leader',
    negative: 'Fanatical, Frustrated, Sets goals too high to reach',
  },
  22: {
    positive: 'Good at details, Master achiever',
    negative: 'Inferiority complex, Ulterior motives',
  },
}

/** Ch. 10 — Table of Astro-Numerology */
export const ASTRO: Record<number, { planet: string; colours: string }> = {
  1: { planet: 'Sun', colours: 'Gold, Yellow, Orange, Purple' },
  2: { planet: 'Moon', colours: 'White, Blue, Silver, Cream' },
  3: { planet: 'Jupiter', colours: 'Yellow, Violet, Purple, Green' },
  4: { planet: 'Uranus', colours: 'Light Blue, White, Light Grey' },
  5: { planet: 'Mercury', colours: 'White, Green — Avoid Red' },
  6: { planet: 'Venus', colours: 'Blue, Rose, Pink — Avoid Yellow' },
  7: { planet: 'Neptune', colours: 'Green and Yellow' },
  8: { planet: 'Saturn', colours: 'Dark Grey, Dark Blue, Purple, Black' },
  9: { planet: 'Mars', colours: 'Red, Yellow, Orange, White' },
}

/** Ch. 12 — Synchronising Life Seal with the Number of the Name.
 * The life seal defines the purpose; the name number defines how the
 * purpose is expressed. */
export function synchronise(seal: number, name: number): string {
  const PURPOSE: Record<number, string> = {
    1: 'a leader and pioneer',
    2: 'a partner and peacemaker',
    3: 'a creative and joyful achiever',
    4: 'a builder who finishes life’s tests',
    5: 'an agent of change and communication',
    6: 'a nurturer of home, community and beauty',
    7: 'a seeker of wisdom, detail and invention',
    8: 'a steward of abundance, power and wealth',
    9: 'a finisher with heightened consciousness',
    11: 'a master of inventive, spiritual leadership',
    22: 'a master builder and achiever',
  }
  const EXPRESSION: Record<number, string> = {
    1: 'expressed through pioneering leadership and original thinking',
    2: 'expressed through partnership, diplomacy and associate leadership',
    3: 'expressed through creativity, communication and joy',
    4: 'expressed through discipline, organisation and steady work',
    5: 'expressed through change, travel, media and communication',
    6: 'expressed through community, family and service to institutions',
    7: 'expressed through religious depth, study and spiritual insight',
    8: 'expressed through enterprise, wealth-building and systems',
    9: 'expressed through completion, philanthropy and priestly service',
    11: 'expressed with heightened consciousness as an associate leader (11 → 2)',
    22: 'expressed with master-builder precision and detail (22 → 4)',
  }
  return `Your Life Seal defines your purpose: you are ${PURPOSE[seal] ?? PURPOSE[reduceFallback(seal)]}. The number of your name determines how that purpose is expressed — ${EXPRESSION[name] ?? EXPRESSION[reduceFallback(name)]}.`
}

function reduceFallback(n: number): number {
  let v = n
  while (v > 9) v = v.toString().split('').reduce((a, d) => a + Number(d), 0)
  return v
}
