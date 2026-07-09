// Fantail Weddings - Journal articles (location guides).
// Copy updated July 2026 with Rebecca's rewritten Queenstown & Wānaka guides (first-person,
// quieter voice) and two new guides: Banks Peninsula and Mackenzie Country. House style: no
// em dashes anywhere; punctuation rewritten with commas, colons and full stops instead.

export interface JournalSeason {
  name: string;
  text: string;
}
export interface JournalVenue {
  name: string;
  text: string;
  url?: string;
}
export interface JournalFAQ {
  q: string;
  a: string;
}
export type JournalPage =
  | "journal-queenstown"
  | "journal-wanaka"
  | "journal-banks-peninsula"
  | "journal-mackenzie";

export interface JournalArticleData {
  slug: string;
  page: JournalPage;
  /** Live route for this guide (also consumed by scripts/seo-build.mjs). */
  route: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  /** Descriptive alt text for the hero photo (SEO + screen readers). */
  heroImageAlt?: string;
  cardSummary: string;
  intro: { heading: string; body: string };
  why: { eyebrow: string; heading: string; body: string; image: string; imageAlt?: string };
  seasons: { intro: string; items: JournalSeason[]; outro: string };
  venues: { eyebrow: string; heading: string; items: JournalVenue[] };
  faqs: JournalFAQ[];
  closing: { heading: string; body: string };
}

const queenstown: JournalArticleData = {
  slug: "queenstown-weddings",
  page: "journal-queenstown",
  route: "/queenstown-wedding-planner/",
  navLabel: "Queenstown Weddings",
  metaTitle: "Queenstown Wedding Venues & Destination Weddings | Fantail Weddings",
  metaDescription:
    "A guide to Queenstown weddings: iconic venues, the four seasons, and boutique planning for couples marrying in New Zealand's most cinematic alpine destination.",
  eyebrow: "Luxury New Zealand Weddings",
  title: "Queenstown Weddings",
  subtitle: "Destination Weddings, New Zealand",
  heroImage: "/assets/images/journal-queenstown-hero.jpg",
  heroImageAlt:
    "A bride and groom walk through golden vineyard rows above Lake Wanaka near Queenstown, mountains behind them.",
  cardSummary:
    "Alpine drama, some of the best food in the country, and the easiest arrival in the South Island, plus the quiet corners most couples never find.",
  intro: {
    heading: "The One Everyone Pictures First",
    body: "Queenstown is the postcard: sharp peaks, a lake that goes on, and the kind of light photographers plan their year around. It's also the easiest place in the South Island for guests to reach, which matters more than people expect when half of them are flying in from the other side of the world. What I love most is knowing where the quiet is, the estate down a private road, the tarn that holds the mountains still before the day-trippers arrive."
  },
  why: {
    eyebrow: "Where the Magic Happens",
    heading: "Why Queenstown",
    body: "This is the region for couples who want a bit of everything: mountains at the ceremony, a long-table dinner that runs late, a helicopter to a ridge if the mood takes you, a cellar door the next morning. The logistics are the smoothest in the South Island, which frees me to focus on how the day feels, not on whether the transfers will turn up. I plan full weddings, design-and-coordinate days, and elopements here, with the same care scaled to the day you actually want.",
    image: "/assets/images/journal-queenstown-ceremony.jpg",
    imageAlt: "A couple share a kiss at an intimate Queenstown ceremony while their guests look on."
  },
  seasons: {
    intro: "Four seasons, four completely different weddings.",
    items: [
      { name: "Spring", text: "Blossom along the lakeshore, bright new green on the hills, and air that still has a bite to it." },
      { name: "Summer", text: "Long, warm evenings and dinners that stretch past ten while it's still light." },
      { name: "Autumn", text: "Gold through the vineyards, clear cold mornings, my favourite light of the year." },
      { name: "Winter", text: "Snow on the tops and a fire indoors; small weddings feel especially warm in the cold months." }
    ],
    outro:
      "Fold in a lake cruise, a morning on the mountain, or a dinner in wine country, and the wedding becomes a few days your guests talk about for years, not a single afternoon."
  },
  venues: {
    eyebrow: "Where to Marry",
    heading: "A Few of My Queenstown Places",
    items: [
      {
        name: "Thurlby Domain",
        text: "A private estate with the whole sweep of mountain and lake in front of you; refined without trying too hard.",
        url: "https://www.thurlbydomain.co.nz/"
      },
      {
        name: "Moke Lake",
        text: "A still, hidden lake a short drive from town. Made for an elopement, or a ceremony for a handful of people who don't mind a little gravel road."
      },
      {
        name: "Sherwood",
        text: "A design-led hotel with a relaxed, lived-in feel and a view back over the lake. Good food, good energy, nothing stiff.",
        url: "https://sherwoodqueenstown.nz/"
      },
      {
        name: "Lake Hayes Pavilion",
        text: "An easy waterfront spot for a relaxed reception, with Lake Hayes doing all the decorating for you.",
        url: "https://www.qldc.govt.nz/venues/lake-hayes-pavilion/"
      }
    ]
  },
  faqs: [
    {
      q: "Can you plan a full wedding here, or only elopements?",
      a: "All of it: full-service planning and production, design-and-coordinate for couples who have the bones in place and want my eye on the day, and elopements. Whatever the size, the care is the same."
    },
    {
      q: "How do guests get to Queenstown?",
      a: "Straight in. The airport connects directly to Auckland, Christchurch, and several Australian cities, so most guests land within reach of a coffee and a mountain view."
    },
    {
      q: "When should we start planning?",
      a: "For a full wedding in peak season, nine to fourteen months gives us room to breathe and first pick of the good venues. Elopements can come together faster."
    },
    {
      q: "We're planning from overseas and haven't seen the venues. Is that a problem?",
      a: "Not at all; it's most of what I do. I'm your eyes and feet on the ground, sending voice notes and short films so you can picture it from your kitchen table."
    }
  ],
  closing: {
    heading: "Begin Your Queenstown Celebration",
    body: "Celebrate in New Zealand's most iconic alpine destination. When you are ready, talk to Fantail Weddings and we will start shaping your Queenstown wedding."
  }
};

const wanaka: JournalArticleData = {
  slug: "wanaka-weddings",
  page: "journal-wanaka",
  route: "/nz-wanaka-wedding-planner/",
  navLabel: "Wānaka Weddings",
  metaTitle: "Wānaka Wedding Venues & Destination Weddings | Fantail Weddings",
  metaDescription:
    "A guide to Wānaka weddings: lakeside and high-country venues, the four seasons, and boutique planning in the quieter heart of New Zealand's Southern Lakes.",
  eyebrow: "Luxury New Zealand Weddings",
  title: "Wānaka Weddings",
  subtitle: "Destination Weddings, New Zealand",
  heroImage: "/assets/images/journal-wanaka-hero.jpg",
  heroImageAlt:
    "A bride and groom stand on a mountain ridge high above Lake Wanaka, snow-capped peaks across the water.",
  cardSummary:
    "Lakeside and high-country calm, an hour from Queenstown's airport but a world slower. For couples who want room to breathe.",
  intro: {
    heading: "Wānaka Slows Everything Down",
    body: "Wānaka is Queenstown's quieter sibling, an hour up the road, and a different pace entirely. The lake is stiller, the town smaller, the evenings longer and more golden. Couples come here when they want the mountains without the crowds and space to actually feel the day happening. Push on to Lake Hāwea, ten minutes further, and it gets quieter still."
  },
  why: {
    eyebrow: "Where We Create Moments",
    heading: "Why Wānaka",
    body: "This is for couples who want calm at the centre of everything, not less beautiful than Queenstown, just less loud. Long-table dinners that run into a gold-and-pink evening; a ceremony with a whole mountain range behind you and barely another soul in sight. I work with private estates, lakeside spots, and high-country stations here, and I plan full weddings, design-and-coordinate days, and elopements across all of them.",
    image: "/assets/images/journal-wanaka-reception.jpg",
    imageAlt: "A candlelit long-table wedding reception inside a fairy-lit barn near Wanaka."
  },
  seasons: {
    intro: "Each season here reads a little differently.",
    items: [
      { name: "Spring", text: "Wildflowers, lambs on the hills, and that first proper warmth after a hard frost." },
      { name: "Summer", text: "Blue days, lake swims, and evenings that don't end until well after nine." },
      { name: "Autumn", text: "Gold and russet across the hillsides; the quietest, most flattering light of the year." },
      { name: "Winter", text: "Snow on the Southern Alps and long, still, clear days. Elopements feel especially intimate now." }
    ],
    outro:
      "Add a heli-flight to an alpine ridge, a morning on the water, or a slow lunch at a cellar door, and a Wānaka wedding becomes a handful of unhurried days rather than one busy afternoon."
  },
  venues: {
    eyebrow: "Where to Marry",
    heading: "A Few of My Wānaka Places",
    items: [
      {
        name: "Horseshoe Bend Estate",
        text: "A private riverside estate ten minutes from town, with room for everyone to stay and settle in. They ask for a planner on the day, which is exactly where I come in.",
        url: "https://horseshoebendestate.co.nz/"
      },
      {
        name: "Dublin Bay",
        text: "A quiet, tree-lined stretch of Lake Wānaka's shore. Beautiful for an intimate ceremony with your feet more or less in the water."
      },
      {
        name: "Lake Hāwea View",
        text: "Sweeping mountain-and-lake panoramas, ten minutes farther out where the crowds thin to almost none.",
        url: "https://lakehaweaview.co.nz/"
      },
      {
        name: "Lake Hāwea Station",
        text: "A working high-country station with dramatic scenery and secluded corners, for couples who want space and a little adventure.",
        url: "https://lakehaweastation.com/"
      }
    ]
  },
  faqs: [
    {
      q: "Do you only do small weddings and elopements in Wānaka?",
      a: "I do all three: full-service, design-and-coordinate, and elopements. Intimate is where I'm happiest, but \"intimate\" can still mean fifty of your favourite people."
    },
    {
      q: "How do guests get here?",
      a: "Most fly into Queenstown and drive the hour over the Crown Range, which is a beautiful arrival in itself. I can arrange private transfers so no one has to navigate an alpine pass in a hire car after a long-haul flight."
    },
    {
      q: "Is Wānaka really quieter than Queenstown?",
      a: "Noticeably. Same mountains, fewer people. If your guest list is small and you want room to breathe, this is often where I steer couples."
    },
    {
      q: "Can everything be arranged from overseas?",
      a: "Yes. Many of my couples marry here, having never set foot in Wānaka until the week of the wedding. That's my job: to make the unseen feel known in voice notes and calls that fit your time zone."
    }
  ],
  closing: {
    heading: "Begin Your Wānaka Story",
    body: "Wānaka is where stillness becomes celebration. When you are ready, talk to Fantail Weddings and we will begin shaping a wedding here that feels unmistakably yours."
  }
};

const banksPeninsula: JournalArticleData = {
  slug: "banks-peninsula-weddings",
  page: "journal-banks-peninsula",
  route: "/banks-peninsula-weddings/",
  navLabel: "Banks Peninsula Weddings",
  metaTitle: "Banks Peninsula Weddings & Elopements | Fantail Weddings",
  metaDescription:
    "A guide to marrying on Banks Peninsula: Akaroa's harbours, coastal luxury villas, and boutique planning an hour from Christchurch, for intimate South Island weddings and elopements.",
  eyebrow: "Luxury New Zealand Weddings",
  title: "Banks Peninsula Weddings",
  subtitle: "Destination Weddings, New Zealand",
  heroImage: "/assets/images/WEB_237_BJ_6688.webp",
  heroImageAlt:
    "A couple exchange vows at the water's edge on a pebbled South Island shore, guests gathered under the trees.",
  cardSummary:
    "Volcanic harbours, French-village charm, and turquoise bays an hour from Christchurch. The coast most couples don't know to ask for.",
  intro: {
    heading: "The One Nobody Expects",
    body: "Most couples arrive in New Zealand thinking mountains. Banks Peninsula is the surprise: a set of old volcanic harbours an hour from Christchurch, where green-and-gold farmland tips straight into turquoise water and Hector's dolphins, the smallest in the world, turn up uninvited. Akaroa, the little French settlement at its heart, still has its street names in French and a harbour you'll want to eat every meal beside. It feels like a secret, and for now it mostly is."
  },
  why: {
    eyebrow: "Where the Coast Takes Over",
    heading: "Why Banks Peninsula",
    body: "This is for couples who want the sea instead of the snow, and somewhere their guests won't have already seen on a hundred other feeds. It's one of the gentlest regions in the South Island to reach: Christchurch's international airport is a short drive from the first bay, which takes a lot of the strain out of a long-haul guest list. The land does the work: coves, clifftops, gardens a century old. I plan full weddings, design-and-coordinate days, and elopements here, and it lends itself beautifully to the small and the seriously private.",
    image: "/assets/images/AandJ-50.webp",
    imageAlt: "Two brides in deep red suits walk hand in hand along a waterfront promenade at dusk."
  },
  seasons: {
    intro: "The peninsula's a maritime place, so its seasons are softer than the high country's.",
    items: [
      { name: "Spring", text: "Green hills, new lambs, and the harbours at their calmest and clearest." },
      { name: "Summer", text: "Warm coastal days, long swims, and dinners outside as the light goes down over the water." },
      { name: "Autumn", text: "Golden pasture, settled weather, and the quietest stretch once the summer visitors leave." },
      { name: "Winter", text: "Crisp, clear, and deeply private, with the whole coast more or less to yourselves." }
    ],
    outro:
      "Fold in a harbour cruise, a morning among the dolphins, or a long lunch of Akaroa salmon and local cheese, and the wedding becomes a coastal few days your guests won't stop talking about."
  },
  venues: {
    eyebrow: "Where to Marry",
    heading: "A Few of My Banks Peninsula Places",
    items: [
      {
        name: "Annandale",
        text: "A collection of private villas across a 4,000-acre coastal farm at Pigeon Bay, reached by farm track or, if you like, by helicopter. About as secluded and romantic as New Zealand gets, and made for elopements and very small gatherings.",
        url: "https://annandale.com/"
      },
      {
        name: "Otahuna Lodge",
        text: "An 1895 homestead in thirty acres of heritage gardens at the base of the peninsula, twenty minutes from Christchurch. Grand, warm, and one of the country's finest lodges.",
        url: "https://otahuna.co.nz/"
      },
      {
        name: "Akaroa & the Harbour",
        text: "The French village and its working harbour: a ceremony at the water's edge, then dinner where the boats come in. A whole region's charm in one small bay."
      }
    ]
  },
  faqs: [
    {
      q: "Where exactly is Banks Peninsula?",
      a: "Just east of Christchurch: the hilly, harbour-cut headland you fly over on the way in. The first bays are under an hour from the airport, which makes it one of the gentlest South Island arrivals for overseas guests."
    },
    {
      q: "What can you plan here, elopements only?",
      a: "All three: full-service, design-and-coordinate, and elopements. The peninsula suits intimate and private settings especially well."
    },
    {
      q: "Is it very different from Queenstown or Wānaka?",
      a: "Completely. This is coast, not alpine: harbours and dolphins instead of peaks and tussock. If you want somewhere unexpected and largely undiscovered, this is where I'd point you."
    },
    {
      q: "Can we plan it from overseas without visiting first?",
      a: "Yes. I'll be your eyes on the ground, walking the bays, checking the light at the time of day you'll marry, and sending it all back to you in voice notes and short films."
    }
  ],
  closing: {
    heading: "Begin Your Banks Peninsula Celebration",
    body: "If the coast is calling, talk to Fantail Weddings and we will start shaping a Banks Peninsula wedding that feels like the secret it still is."
  }
};

const mackenzie: JournalArticleData = {
  slug: "mackenzie-country-weddings",
  page: "journal-mackenzie",
  route: "/mackenzie-country-weddings/",
  navLabel: "Mackenzie Country Weddings",
  metaTitle: "Mackenzie & Aoraki/Mt Cook Weddings & Elopements | Fantail Weddings",
  metaDescription:
    "A guide to Mackenzie Country weddings: Lake Pūkaki, Aoraki/Mount Cook, and the world's clearest night skies, with boutique planning for elopements and intimate high-country weddings.",
  eyebrow: "Luxury New Zealand Weddings",
  title: "Mackenzie Country Weddings",
  subtitle: "Destination Weddings, New Zealand",
  heroImage: "/assets/images/BONNIE_JENKINS_621-BJ_9149.webp",
  heroImageAlt:
    "A bride and groom embrace on a snow-dusted tussock ridge, high-country valleys and snow-capped peaks all around.",
  cardSummary:
    "Turquoise lakes, golden tussock, and the clearest night skies on earth. High-country New Zealand at its most elemental.",
  intro: {
    heading: "Big Sky Country",
    body: "The Mackenzie is where the South Island opens right out: a high, wide basin of golden tussock, impossibly turquoise glacial lakes, and Aoraki/Mount Cook standing over all of it. At night, it becomes something else again. This is an International Dark Sky Reserve, one of the largest in the world, and the stars here are the kind most people have never actually seen. It's remote, it's elemental, and it rewards couples who want scale and silence over polish for its own sake."
  },
  why: {
    eyebrow: "Where the Land Does the Talking",
    heading: "Why the Mackenzie",
    body: "This is for couples who want the landscape to be the whole event: Lake Pūkaki's blue, the tussock going gold at day's end, a sky full of stars instead of a dance floor. It asks a little more in the way of logistics, being genuinely remote, and that's precisely where a planner earns her place: permits for a ceremony inside the national park, a plan for weather that changes its mind, warmth arranged for a night under the stars. I plan full weddings, design-and-coordinate days, and elopements here, though it's elopements and very small gatherings the region does best of all.",
    image: "/assets/images/Alpine-Elopement-NZ.webp",
    imageAlt: "An eloping couple stand in golden tussock beside a weathered high-country hut, dry alpine hills behind."
  },
  seasons: {
    intro: "The high country runs to extremes, and each season has its own reward.",
    items: [
      { name: "Spring", text: "Snow still on the peaks, lupins not far off, and the lakes at their most vivid." },
      { name: "Summer", text: "Long warm days, late light, and the best of the night skies once the sun finally goes down." },
      { name: "Autumn", text: "Gold tussock, still air, and cold, clear mornings that photograph like nothing else." },
      { name: "Winter", text: "Snow to the lake edge and a profound quiet: spectacular, and not for the faint-hearted." }
    ],
    outro:
      "Add a guided night under the stars, a scenic flight onto a glacier, or a morning beside Aoraki, and even the smallest wedding here feels vast."
  },
  venues: {
    eyebrow: "Where to Marry",
    heading: "A Few of My Mackenzie Places",
    items: [
      {
        name: "Mt Cook Lakeside Retreat",
        text: "Private villas on the shores of Lake Pūkaki, looking straight up at Aoraki across the water, within the Dark Sky Reserve. It handles everything from an elopement for two to a small wedding beautifully; my first call in this region.",
        url: "https://mtcookretreat.nz/"
      },
      {
        name: "Lakestone Lodge",
        text: "An off-grid lodge high on Lake Pūkaki's southern shore, every window framing the lake and the Alps. Quiet luxury in the truest sense.",
        url: "https://lakestonelodge.co.nz/"
      },
      {
        name: "Aoraki/Mount Cook National Park",
        text: "For couples who want to marry in the mountains themselves: a ceremony among the peaks, arranged properly and with the right permits. Raw and unforgettable."
      }
    ]
  },
  faqs: [
    {
      q: "Can we actually get married inside Aoraki/Mount Cook National Park?",
      a: "Yes, with the right permissions. The national park requires a permit for ceremonies, and sorting that is part of what I do. It's worth it; there are few places on earth like it."
    },
    {
      q: "What can you plan here?",
      a: "All three: full-service, design-and-coordinate, and elopements, though the Mackenzie is at its best for elopements and very small, very intentional gatherings."
    },
    {
      q: "How remote is it, honestly?",
      a: "Genuinely remote: two to three hours from Queenstown, and the nearest town, Twizel, is small. That's the point. It does mean planning matters more here, not less. I plan for the weather rather than hope past it."
    },
    {
      q: "Is it good for stargazing at the wedding?",
      a: "It's one of the darkest skies in the world. A night ceremony, or a guided look through a telescope after dinner, is something your guests will never forget, and something almost nowhere else can offer."
    }
  ],
  closing: {
    heading: "Begin Your Mackenzie Celebration",
    body: "If big sky and stillness sound like your day, talk to Fantail Weddings and we will begin shaping a Mackenzie wedding under the clearest night skies in the world."
  }
};

export const JOURNAL_ARTICLES: JournalArticleData[] = [queenstown, wanaka, banksPeninsula, mackenzie];

export function getArticleByPage(page: JournalPage): JournalArticleData | undefined {
  return JOURNAL_ARTICLES.find((a) => a.page === page);
}
