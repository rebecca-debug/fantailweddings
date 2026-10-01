import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { RevealHeading } from "./reveal";

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

interface IntimateWeddingsProps {
  onEnquire: () => void;
}

const INCLUDED = [
  "Full-service, concierge planning, from your first enquiry to the last farewell.",
  "Venue scouting and booking, including the quiet, unlisted places I can reach through years of relationships on the ground.",
  "A hand-picked vendor team, matched to you.",
  "Multi-day weekend design, so the wedding is the peak of a trip, not the whole of it.",
  "Guest-experience design: the aunty's chair with arms for her comfort, the gluten-free cake, the welcome note in every room.",
  "A wet-weather plan, a wind plan, a sun plan. Yes, all three.",
  "A private planning portal where everything lives in one calm place.",
  "Me on the day, with the whole experience thought through in advance, quietly solving the problems you may never even know about."
];

export default function IntimateWeddings({ onEnquire }: IntimateWeddingsProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Intimate Weddings | Fantail Weddings";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    meta?.setAttribute(
      "content",
      "Intimate South Island wedding planning for twenty to sixty guests, around Wānaka, Queenstown, the Mackenzie Basin and Central Otago. Full-service, concierge planning with Rebecca of Fantail Weddings."
    );
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="bg-[#f7f7f7] text-black">
      {/* HERO */}
      <section className="relative h-[60vh] sm:h-[68vh] min-h-[520px] max-h-[720px] flex items-center justify-center overflow-hidden">
        <motion.img
          src="/assets/images/service-02.webp"
          alt="Newlyweds walk through a shower of petal confetti at a lakeside South Island wedding, mountains behind."
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: LUX_EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 py-14 text-center text-white" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.55)" }}>
          <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/85 font-light block mb-5">Intimate Weddings</span>
          <RevealHeading
            as="h1"
            className="font-serif text-3xl sm:text-5xl font-light leading-[1.12] tracking-tight mb-6"
            text="The weekend that begins as a wedding and becomes something more."
            amount={0.3}
          />
          <p className="text-sm sm:text-base font-light text-white/90 leading-[1.85] max-w-xl mx-auto mb-9">
            Full-service, concierge planning for intimate South Island weddings: twenty to sixty of your favourite
            people, somewhere around Wānaka, Queenstown, the Mackenzie Basin, or a quiet corner of Central Otago.
          </p>
          <button
            onClick={onEnquire}
            className="group inline-flex items-center justify-center gap-3 bg-[#f3eee2] text-[#412c00] px-8 py-4 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium shadow-xl shadow-black/25 hover:bg-white transition active:scale-[0.99] duration-300"
          >
            Begin a conversation
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </section>

      {/* WHAT THIS IS */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-6">What this is</span>
        <p className="text-base text-[#5b6470] font-light leading-[1.9] mb-5">
          An intimate wedding is not a smaller version of a big one. It is a different thing entirely. Twenty people,
          thirty, forty, sometimes sixty. The number sits within that range, and the spirit stays the same: everyone you
          love in one place, for longer than an afternoon.
        </p>
        <p className="text-base text-[#5b6470] font-light leading-[1.9] mb-5">
          I plan these across the South Island of Aotearoa New Zealand, most often around Wānaka, Queenstown and the
          wider Central Otago, where the welcome dinner becomes a moment of its own, where a ceremony can sit in a valley
          at six o'clock when the light goes long, and the air softens.
        </p>
        <p className="text-base text-[#5b6470] font-light leading-[1.9]">
          This is full-service planning, start to finish. From your first note to the last farewell, I carry the
          logistics so you can be fully in the weekend. You make the decisions. I make sure it all holds together.
        </p>
      </section>

      {/* PLACES YOU WON'T FIND IN A SEARCH */}
      <section className="py-20 px-6 border-y border-black/[0.06] bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-6">Away from the crowds</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-8">Places you won't find in a search</h2>
          <p className="text-base text-[#5b6470] font-light leading-[1.9] mb-5">
            The spots I love most for these weddings aren't the ones that come up on the first page of a search, or the
            ones you have already seen a hundred times on Instagram. They are quieter than that. A high-country station at
            the end of a long gravel road. A lakeside clearing with no name on any map. A garden that belongs to someone
            who only opens it for people they trust.
          </p>
          <p className="text-base text-[#5b6470] font-light leading-[1.9] mb-5">
            Over sixteen years, I have built real relationships with the people who own and care for these places. That
            is part of what I bring you: not a venue list anyone can book, but a door that opens because of who I know
            and how I have treated them across the years.
          </p>
          <p className="text-base text-[#5b6470] font-light leading-[1.9]">
            It matters because of what it gives you on the day: privacy, space to breathe, and the particular kind of
            connection that only happens somewhere the rest of the world cannot casually wander into. Just you, your
            people, and a landscape that feels like it was kept aside for the occasion.
          </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">What's included</span>
        </div>
        <ul className="space-y-5">
          {INCLUDED.map((t, i) => (
            <li key={i} className="flex gap-4 items-start">
              <Check className="w-4 h-4 mt-1 shrink-0 text-[#997700]" strokeWidth={2} />
              <span className="text-sm sm:text-base text-[#5b6470] font-light leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* INVESTMENT */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto bg-black text-white p-10 sm:p-16 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-light block mb-6">Investment</span>
          <div className="font-serif text-4xl sm:text-5xl font-light mb-8">From NZD $8,800</div>
          <p className="text-sm text-white/75 font-light leading-relaxed max-w-xl mx-auto">
            Most couples invest between NZD $65,000 and $230,000 across vendors and the celebration itself. For reference,
            exclusive South Island wedding venues alone typically range from NZD $10,000 to $25,000 and up, depending on
            season and inclusions.
          </p>
        </div>
      </section>

      {/* A REAL MOMENT */}
      <section className="py-20 px-6 border-y border-black/[0.06] bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-8">A real moment</span>
          <p className="font-serif text-lg sm:text-xl italic text-black/80 font-light leading-[1.6]">
            "Rebecca planned a beautiful wedding that was beloved by our guests as well as us. Recurrent compliments have
            been on the food, she somehow found an incredible chef, plucked him from obscurity, and brought him to our
            wedding, the venue, which we would never have found on our own, and a boat adventure across a lake in Wānaka.
            We appreciated her versatility and her rapid responsiveness to changing weather."
          </p>
          <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-[#5b6470]">M &amp; S · Intimate Wedding, January 2025</div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="py-24 px-6 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto">
          <RevealHeading
            as="h2"
            className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-8"
            text="If this is the shape of what you want."
            amount={0.4}
          />
          <p className="text-sm sm:text-base text-white/85 font-light leading-[1.9] max-w-xl mx-auto mb-10">
            Send me a note from wherever you are in the world. I read every one myself, and we will find a time to talk
            that suits your time zone, not mine.
          </p>
          <button
            onClick={onEnquire}
            className="group inline-flex items-center justify-center gap-3 bg-[#f3eee2] text-[#412c00] px-8 py-4 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium shadow-xl shadow-black/25 hover:bg-white transition active:scale-[0.99] duration-300"
          >
            Begin a conversation about your intimate wedding
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
