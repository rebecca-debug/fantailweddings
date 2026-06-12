// Fantail Weddings — Journal articles (location guides).
// Content carried over from the live site's Queenstown & Wānaka pages, in Rebecca's voice,
// with light keyword-led wording (venues/weddings over "wedding planner"), the scrambled
// Queenstown season labels corrected, and the Wānaka closing rewritten (was placeholder text).

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
export type JournalPage = "journal-queenstown" | "journal-wanaka";

export interface JournalArticleData {
  slug: string;
  page: JournalPage;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  cardSummary: string;
  intro: { heading: string; body: string };
  why: { eyebrow: string; heading: string; body: string; image: string };
  seasons: { intro: string; items: JournalSeason[]; outro: string };
  venues: { eyebrow: string; heading: string; items: JournalVenue[] };
  faqs: JournalFAQ[];
  closing: { heading: string; body: string };
}

const queenstown: JournalArticleData = {
  slug: "queenstown-weddings",
  page: "journal-queenstown",
  navLabel: "Queenstown Weddings",
  metaTitle: "Queenstown Wedding Venues & Destination Weddings | Fantail Weddings",
  metaDescription:
    "A guide to Queenstown weddings — iconic venues, the four seasons, and boutique planning for couples marrying in New Zealand's most cinematic alpine destination.",
  eyebrow: "Luxury New Zealand Weddings",
  title: "Queenstown Weddings",
  subtitle: "Destination Weddings, New Zealand",
  heroImage: "/assets/images/journal-queenstown-hero.jpg",
  cardSummary:
    "Iconic venues, four show-stopping seasons, and seamless planning in New Zealand's most cinematic alpine destination.",
  intro: {
    heading: "The Heart of Southern Luxury",
    body: "Queenstown is where nature and sophistication share the same table. Fantail Weddings designs celebrations that balance five-star polish with the rugged beauty of the South Island. The result: weddings that feel cinematic yet personal, where every guest becomes part of the story."
  },
  why: {
    eyebrow: "Where the Magic Happens",
    heading: "Why Queenstown",
    body: "This is New Zealand's destination for couples who want everything: alpine drama, world-class dining, and smooth logistics. Queenstown is built for celebration, from elegant lakefront venues to secret ceremony spots reached only by helicopter. From guest transfers to wine lists, Fantail Weddings makes sure every detail runs effortlessly.",
    image: "/assets/images/journal-queenstown-ceremony.jpg"
  },
  seasons: {
    intro: "Queenstown offers four show-stopping seasons.",
    items: [
      { name: "Spring", text: "Blossom-filled walks and bright alpine greens." },
      { name: "Summer", text: "Long lake days and sunset feasts." },
      { name: "Autumn", text: "Golden vineyards and crisp, clear air." },
      { name: "Winter", text: "Snow-dusted peaks, perfect for cosy receptions." }
    ],
    outro: "Add in lake cruises, mountain adventures, or wine-country dinners, and your celebration becomes a whole experience for you and your guests."
  },
  venues: {
    eyebrow: "Where to Celebrate",
    heading: "Iconic Queenstown Wedding Venues",
    items: [
      { name: "Amisfield", text: "Lakeside vineyard charm, ideal for intimate, luxury Queenstown winery weddings.", url: "https://amisfield.co.nz/" },
      { name: "Jacks Point", text: "Sweeping alpine backdrops for adventurous Queenstown weddings.", url: "https://jackspoint.com/" },
      { name: "Rosewood Matakauri Lodge", text: "Luxury lakeside accommodation with private ceremony spaces, perfect for multi-day Queenstown weddings.", url: "https://www.rosewoodhotels.com/en/matakauri" },
      { name: "The Remarkables", text: "Dramatic high-country scenery and secluded ceremony spots." },
      { name: "Thurlby Domain", text: "Sweeping mountain and lake panoramas; an elegant, memorable backdrop for relaxed yet refined weddings.", url: "https://www.thurlbydomain.co.nz/" },
      { name: "Gibbston Valley", text: "Vineyards and cellar doors, superb for intimate winery weddings.", url: "https://www.gibbstonvalley.com/" },
      { name: "Lake Hayes Pavilion", text: "Stunning waterfront views and relaxed reception options.", url: "https://www.qldc.govt.nz/venues/lake-hayes-pavilion/" }
    ]
  },
  faqs: [
    {
      q: "Is Queenstown easy to reach?",
      a: "Yes. The international airport connects directly with major cities across New Zealand and Australia, making it effortless for guests."
    },
    {
      q: "How far in advance should we book?",
      a: "Ideally 12 to 18 months for peak season. The popular venues fill quickly."
    },
    {
      q: "Can Fantail Weddings plan multi-day celebrations?",
      a: "Yes. From lake cruises to recovery brunches, we coordinate every detail to keep the whole weekend seamless."
    },
    {
      q: "What if we live overseas?",
      a: "We specialise in destination weddings for international couples. Everything from your licence paperwork to vendor selection is managed for you."
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
  navLabel: "Wānaka Weddings",
  metaTitle: "Wānaka Wedding Venues & Destination Weddings | Fantail Weddings",
  metaDescription:
    "A guide to Wānaka weddings — lakeside and high-country venues, the four seasons, and boutique planning in the quieter heart of New Zealand's Southern Lakes.",
  eyebrow: "Luxury New Zealand Weddings",
  title: "Wānaka Weddings",
  subtitle: "Destination Weddings, New Zealand",
  heroImage: "/assets/images/journal-wanaka-hero.jpg",
  cardSummary:
    "Lakeside and high-country venues, four quiet seasons, and intimate planning in the calm heart of the Southern Lakes.",
  intro: {
    heading: "Where Mountains Meet Meaning",
    body: "Wānaka stops time. Fantail Weddings creates celebrations here that feel expansive, elegant, and deeply personal. The light, the stillness, and the ever-changing tones of the lake and mountains lend every wedding its own sense of wonder."
  },
  why: {
    eyebrow: "Where We Create Moments",
    heading: "Why Wānaka",
    body: "Wānaka is the quieter heart of the Southern Lakes, a perfect match for couples seeking connection and calm. It is luxury without pretence, where mountains frame your ceremony and long-table dinners stretch late into golden evenings. Fantail Weddings works with venues that balance refinement and wilderness, from vineyard lodges to lakeside retreats and private high-country stations.",
    image: "/assets/images/journal-wanaka-reception.jpg"
  },
  seasons: {
    intro: "Each season in Wānaka paints a new story.",
    items: [
      { name: "Spring", text: "Blooms with wildflowers and new beginnings." },
      { name: "Summer", text: "Brings blue skies, lake swims, and long nights." },
      { name: "Autumn", text: "Glows with gold and russet hillsides." },
      { name: "Winter", text: "Wraps you in snow-capped romance." }
    ],
    outro: "Choose a heli-wedding on an alpine ridge, a lake-edge ceremony, or a multi-day itinerary of wine tastings, hikes, and recovery brunches overlooking the water."
  },
  venues: {
    eyebrow: "Where to Celebrate",
    heading: "Iconic Wānaka Wedding Venues",
    items: [
      { name: "Rippon Hall", text: "An iconic lakeside vineyard, perfect for intimate, luxury Wānaka weddings.", url: "https://rippon.co.nz/events/wedding-venue/" },
      { name: "Mahu Whenua", text: "Private, rustic-chic grounds near Wānaka for relaxed outdoor weddings.", url: "https://www.mahuwhenua.co.nz/weddings/" },
      { name: "Edgewater", text: "Elegant lakeside accommodation and ceremony spaces, ideal for multi-day wedding experiences.", url: "https://www.edgewater.co.nz/weddings" },
      { name: "Lake Hāwea Station", text: "Dramatic high-country scenery and secluded ceremony spots for adventurous Wānaka weddings.", url: "https://lakehaweastation.com/weddings" },
      { name: "The Lake Hāwea View", text: "Sweeping mountain and lake panoramas, perfect for memorable Wānaka wedding photos.", url: "https://lakehaweaview.co.nz/" },
      { name: "Lakeside on Lake Wānaka", text: "Gorgeous waterfront ceremonies and relaxed reception options.", url: "https://www.lakesidewanaka.co.nz/" }
    ]
  },
  faqs: [
    {
      q: "When is the best time to marry in Wānaka?",
      a: "From October to April, the region offers long days and settled weather, ideal for lakeside or vineyard weddings."
    },
    {
      q: "Can guests travel easily to Wānaka?",
      a: "Yes. It is a one-hour scenic drive from Queenstown Airport, with private transfers arranged for you."
    },
    {
      q: "Do you plan elopements or smaller weddings?",
      a: "Absolutely. We specialise in intimate alpine ceremonies and multi-day gatherings."
    },
    {
      q: "Can everything be arranged from overseas?",
      a: "Yes. Fantail Weddings regularly plans weddings for international couples who have never visited before their big day."
    }
  ],
  closing: {
    heading: "Begin Your Wānaka Story",
    body: "Wānaka is where stillness becomes celebration. When you are ready, talk to Fantail Weddings and we will begin shaping a wedding here that feels unmistakably yours."
  }
};

export const JOURNAL_ARTICLES: JournalArticleData[] = [queenstown, wanaka];

export function getArticleByPage(page: JournalPage): JournalArticleData | undefined {
  return JOURNAL_ARTICLES.find((a) => a.page === page);
}
