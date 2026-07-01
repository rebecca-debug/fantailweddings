// Fantail Weddings website copy database
export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  investment: string;
  ctaText: string;
  image: string;
  /** Descriptive alt text for the service photo (SEO + screen readers). */
  imageAlt?: string;
  loveNote: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface TimelinePoint {
  id: string;
  step: string;
  title: string;
  description: string;
  image: string;
  /** CSS object-position for framing the photo so faces aren't cropped. */
  imagePosition?: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: "elopement",
    number: "01",
    title: "ELOPEMENTS",
    subtitle: "For couples coming to Aotearoa, New Zealand, to disappear into a landscape together.",
    description: "Just the two of you. Maybe a witness or two. Maybe a celebrant whose voice feels like home. Maybe a single photographer who knows when to step back. A Fiordland scree at the end of a long walk. A tarn above Wānaka in late autumn. A Mackenzie ridgeline at first light. The place chooses you as much as you choose it. It is not about doing less. It is about doing exactly the right things and doing them well.",
    details: [
      "Marriage licence and overseas paperwork sorted with care.",
      "Curated location options across the South Island.",
      "A celebrant matched to your energy.",
      "Photographer (and optional videographer) from a network built over fifteen years.",
      "Florals, hair and makeup, transport, dinner reservation.",
      "Any cultural element you want woven in is treated with the same care as everything else.",
      "A wet-weather backup you can actually use.",
      "Voice notes, Loom videos, and personal calls throughout the planning months, along with a personal online portal to keep all planning information safe and easy to view.",
      "Me on the day, quietly present."
    ],
    investment: "Planning starts from [ NZD $4,300 ]. Vendors and on-the-day costs are quoted separately, so the budget stays transparent.",
    ctaText: "Begin a Conversation about an Elopement",
    image: "/assets/images/Service-01.webp",
    imageAlt: "An eloping couple walk hand in hand through alpine grass beside a lake, South Island mountains glowing behind them at golden hour.",
    loveNote: "“Thank you for creating this itinerary for us, it was so perfectly everything we wanted without knowing it….. Driving into ‘The Hermitage’ with the top down was a dream, and that celebrant was a hoot…..” M&J - Elopement, April 2026"
  },
  {
    id: "intimate",
    number: "02",
    title: "INTIMATE WEDDINGS",
    subtitle: "For couples bringing their favourite people to Aotearoa, New Zealand, for a weekend that begins as a wedding day and becomes something more.",
    description: "Twenty people. Thirty. Forty, sometimes sixty. The number sits within that range. The spirit stays the same. Where the welcome dinner becomes a moment of its own. Where the ceremony is held in a Central Otago valley at six o'clock, when the light goes long, and the air softens. Where the dance floor is the size it needs to be, and not one inch bigger.",
    details: [
      "Full-service, concierge-style planning from your first enquiry to the time we say our fairwells.",
      "Venue scouting and booking, including the slightly hidden ones I know from years on the ground.",
      "Vendor curation.",
      "Multi-day weekend design.",
      "Guest experience design, the auntie's chair with arms for her comfort, the gluten-free cake, the welcome notes in every room.",
      "Wet weather plan, wind plan, sun plan, yes, all three.",
      "A private planning portal where everything lives in one calm place.",
      "Me on the day, with Meghan alongside when the size calls for her."
    ],
    investment: "Planning starts from [ NZD $8,200 ]. Most couples invest a total of [ NZD $65,000 to $230,000] across vendors and the celebration itself. For reference, exclusive South Island wedding venues alone typically range from NZD $10,000 to $25,000+, depending on season and inclusions.",
    ctaText: "Begin a Conversation about an Intimate Wedding",
    image: "/assets/images/service-02.webp",
    imageAlt: "Newlyweds walk through a shower of petal confetti thrown by guests at a lakeside South Island wedding, mountains behind.",
    loveNote: "“Rebecca planned a beautiful wedding that was beloved by our guests as well as us. Recurrent compliments have been on the food (Rebecca somehow found an incredible chef, plucked him from obscurity, and brought him to our wedding, who prepared four incredible meals), the venue, which we would never have found on our own and required complex private negotiations to book, and a boat adventure across a lake in Wanaka. We appreciated her versatility and rapid responsiveness to changing weather conditions... .” M&S - Intimate Wedding, January 2025"
  },
  {
    id: "navigator",
    number: "03",
    title: "THE WEDDING NAVIGATOR",
    subtitle: "For New Zealand couples planning their own wedding, anywhere in the country.",
    description: "Plenty of NZ couples can plan a beautiful wedding without a full planner running it. You are organised. You have done research. You enjoy the planning, mostly. You do not need someone to make every decision for you. What you might need is someone to hand you the map. The order in which things should happen. The questions worth asking each vendor before you sign. The week-by-week rhythm that turns twelve months of overwhelm into a slow, steady build. The check-in three months out, when you wonder whether you have forgotten something, and the second one six weeks out, when the wee freak-out arrives on schedule.",
    details: [
      "Three live calls (a 30-minute onboarding call and two one-hour follow-ups at the milestones that matter).",
      "A personalised toolkit delivered within a week of the onboarding call: a wedding-specific timeline working backwards from your date, a vendor outreach sequence with the right questions to ask, styling aids matched to your venue and season, and a twelve-week countdown checklist for the final stretch.",
      "Built around your wedding, not a template. Built from fifteen years of full-service planning, compressed into a shape that suits a couple doing the work themselves."
    ],
    investment: "[ NZD $850.00 +gst ]. Paid in two parts, half at booking, half before the second follow-up call. If you start with the Navigator and decide within the first month to switch to full-service planning instead, the fee credits transfer.",
    ctaText: "Begin a Conversation about the Wedding Navigator",
    image: "/assets/images/Service-03.webp",
    imageAlt: "A colourful styled wedding tablescape with scalloped placemats, floral-rimmed plates, striped glassware and garden flowers.",
    loveNote: "“OMG - the budget now makes sense. Thank you very much for those tips.” B&S - Online Wedding Consultation, January 2026"
  },
  {
    id: "design",
    number: "04",
    title: "DESIGN, COORDINATION & DAY OF MANAGEMENT",
    subtitle: "For couples capable of doing the bulk of their planning but wise to engage expertise for the details and design.",
    description: "The best pairing for a couple who have their venue and some vendors but need the guiding eye of a designer and logistics expert. I will help you pull your vision together into a cohesive overall wedding design, coordinate the details and take care of the day-of management so you can simply enjoy.",
    details: [
      "Styling consultation and creative direction.",
      "Mood boards, colour palettes, layout suggestions, and styling concepts.",
      "Sourcing of speciality rentals, floral concept collaboration, and visual flow recommendations.",
      "Review of existing plans and enhancements to bring aesthetic cohesion.",
      "Wedding day timeline finalisation and distribution.",
      "Vendor reconfirmation and coordination.",
      "Management of ceremony rehearsal (if applicable).",
      "Complete oversight on the wedding day - setup, styling, cueing, and flow management.",
      "Troubleshooting behind the scenes to ensure a smooth and elevated guest experience."
    ],
    investment: "Planning starts from [ NZD $5,300 ], with all design elements quoted separately to help with budget transparency.",
    ctaText: "Begin a Conversation about Design & Coordination",
    image: "/assets/images/Service-04.webp",
    imageAlt: "A styled wedding place setting with a hand-illustrated menu card, striped linen napkin folded like a rose, and olive-branch detailing.",
    loveNote: ""
  }
];

export const TIMELINE_DATA: TimelinePoint[] = [
  {
    id: "timeline-1",
    step: "01",
    title: "The first conversation",
    description: "You send me a note from anywhere in the world. I read it myself. We schedule a call within a week, working with your time zone, not mine. I want to hear your story. Where you met. Why Aotearoa. What you have already imagined and what is still blank space. There is no script.",
    image: "/assets/images/slide-05.jpg",
    imagePosition: "28% 50%"
  },
  {
    id: "timeline-2",
    step: "02",
    title: "The proposal",
    description: "Within five days, I send you a personalised proposal. A piece of writing shaped around what you told me, with the right service shape, a recommended approach, a transparent investment, and the next step clearly marked. A Loom video walks you through it.",
    image: "/assets/images/slide-06.jpg",
    imagePosition: "center 58%"
  },
  {
    id: "timeline-3",
    step: "03",
    title: "The welcome",
    description: "Once we are working together, I will send you a Welcome Guide. Part roadmap, part reference document. Written in plain English, you can read with a glass of wine instead of a highlighter.",
    image: "/assets/images/slide-07.jpg",
    imagePosition: "center 80%"
  },
  {
    id: "timeline-4",
    step: "04",
    title: "The planning months",
    description: "Voice notes after every vendor conversation. Loom videos are best when something is shown rather than told. Email check-ins at each milestone. A private planning portal you can open at 2 am if you want to.",
    image: "/assets/images/slide-08.jpg",
    imagePosition: "center 55%"
  },
  {
    id: "timeline-5",
    step: "05",
    title: "The celebration",
    description: "By the time the day arrives, every detail has been considered, refined, and prepared. I am quietly present from morning until I turn the lights off. You should barely see me at all. That is the point.",
    image: "/assets/images/slide-12.jpg",
    imagePosition: "center 0%"
  }
];

export const ABOUT_FACTS = [
  "Earl Grey tea. The first cup, the second cup, the just-in-case third cup. Black with honey.",
  "I am a hugger. Just so you know.",
  "I love every flower. Except gerberas. (I am not sorry.)",
  "I drive my car like the race car driver I think I am.",
  "Three nieces. Three very different beauties and personalities. All have my heart",
  "Jasper, my dog, has a wristwatch for dinner and walks. I am not making that up.",
  "If your idea will not work, I will tell you. If a vendor is not the right match, I will say so. I would rather have a slightly hard conversation in May than a heartbreaking one in November."
];

export const FAQ_DATA: FAQ[] = [
  {
    id: "fq-01",
    question: "How far in advance should we book?",
    answer: "For elopements and intimate weddings, most couples reach out 12 to 18 months ahead. Peak season (late February through April) tends to fill 18 months out. For the Wedding Navigator, most couples book 9 to 14 months out, though the toolkit works whether you have eighteen months or six."
  },
  {
    id: "fq-02",
    question: "Where in New Zealand do you work?",
    answer: "Wānaka, Queenstown, and the wider Central Otago region are where I work most. I also plan elopements in the Mackenzie Country (including Aoraki/Mt Cook), the Marlborough Sounds, Banks Peninsula, and occasionally Fiordland. The Wedding Navigator is available NZ-wide."
  },
  {
    id: "fq-03",
    question: "Can overseas couples legally marry in New Zealand?",
    answer: "Yes. You will need a marriage licence (NZD $150, valid 3 months, approved at least 3 working days before the ceremony), a registered celebrant, two witnesses, and to be physically present. I walk every overseas couple through the paperwork in detail."
  },
  {
    id: "fq-04",
    question: "How many couples do you take on each year?",
    answer: "A small handful. Four to six weddings per year, plus a number of elopements and Wedding Navigator engagements. The number is deliberate."
  },
  {
    id: "fq-05",
    question: "Can you accommodate cultural and religious traditions?",
    answer: "Yes, with care and respect. Tea ceremonies, mehndi, karakia, multi-faith ceremonies, and other family or cultural traditions are welcome. I work closely with celebrants and vendors across many cultures."
  },
  {
    id: "fq-06",
    question: "How do you handle the time zone difference for overseas couples?",
    answer: "Most of my couples are 11 to 18 hours behind New Zealand. It is often an advantage. I am awake when you sleep, doing the work, sending vendor follow-ups, sorting paperwork. You wake up to progress. Communication runs on voice notes, Loom videos, and scheduled calls at a time that suits you."
  },
  {
    id: "fq-07",
    question: "What does a Wānaka or Queenstown wedding venue typically cost?",
    answer: "Exclusive South Island wedding venues generally range from NZD $10,000 to $25,000+, depending on the season, the inclusions, and the size of your guest count."
  },
  {
    id: "fq-08",
    question: "Are LGBTQIA+ couples and rainbow families welcome?",
    answer: "Always. Every kind of love belongs here. Every shape of family. Every faith. Every story. This is non-negotiable for me."
  },
  {
    id: "fq-09",
    question: "How is the Wedding Navigator different from full planning?",
    answer: "Full planning is a year of voice notes, vendor management, design, and on-the-day coordination, with me running the wedding for you. The Wedding Navigator is three calls, a personalised toolkit, and a roadmap. You do the planning. I give you the map and check in twice."
  },
  {
    id: "fq-10",
    question: "What happens on the day if something goes wrong?",
    answer: "Something usually shifts. Weather, timing, a flight, a flower delivery. Rarely something dramatic. The reason a Fantail day feels calm is that the wet weather plan, the wind plan, and the contingency plan have all been built before you arrive. You may never know what got adjusted."
  },
  {
    id: "fq-11",
    question: "Can you bring in our own vendors, or do you work only with your preferred suppliers?",
    answer: "Both. I have a vendor network built one coffee at a time over fifteen years, and I will usually recommend from within it. If you have a photographer or stylist you want to fly in from your home country, that is also welcome. I will work alongside them and handle the local logistics."
  },
  {
    id: "fq-12",
    question: "Will I actually hear back from Rebecca personally?",
    answer: "Yes. There is no inbox monitored by an assistant. I read every enquiry myself, usually with a cup of Earl Grey in the morning before the day gets busy. You will hear back within two working days."
  }
];
