import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { RevealHeading } from "./reveal";

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

interface OnTheDayCoordinationProps {
  onEnquire: () => void;
}

const STEPS = [
  "It begins with an onboarding meeting and a simple onboarding form, so I have every detail of what you have built.",
  "I confirm all of your vendors: arrival times, what they need from you, and what they have promised.",
  "I manage your rehearsal, if you are having one.",
  "On the day, I am with you for fifteen hours: setup to your plan, keeping the day running to time, and solving the problems you never need to know happened.",
  "I handle packdown and returns at the end, so your last memory of the night is not loading a car in the dark."
];

export default function OnTheDayCoordination({ onEnquire }: OnTheDayCoordinationProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "On-the-Day Coordination | Fantail Weddings";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    meta?.setAttribute(
      "content",
      "On-the-day wedding coordination across the South Island of New Zealand. For couples who have planned their own wedding and want a calm, experienced coordinator to run the day itself. With Rebecca of Fantail Weddings."
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
          src="/assets/images/Service-04.webp"
          alt="A styled wedding place setting with a hand-illustrated menu card and folded linen napkin."
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: LUX_EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 py-14 text-center text-white" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.55)" }}>
          <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/85 font-light block mb-5">On-the-Day Coordination</span>
          <RevealHeading
            as="h1"
            className="font-serif text-3xl sm:text-5xl font-light leading-[1.12] tracking-tight mb-6"
            text="You've planned it. Let me be the one who runs it."
            amount={0.3}
          />
          <p className="text-sm sm:text-base font-light text-white/90 leading-[1.85] max-w-xl mx-auto mb-9">
            For couples who have the details handled but want a calm, experienced pair of hands to manage the logistics
            and run the wedding day itself, so you can simply be in it. Across the South Island of Aotearoa New Zealand.
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
          By the time your wedding day arrives, you have made a thousand decisions. The last thing you want is to spend
          the day itself chasing vendors, watching the clock, and fielding questions while you are trying to get married.
        </p>
        <p className="text-base text-[#5b6470] font-light leading-[1.9]">
          That is my job here. Not to plan your wedding, you have done that, but to take the whole run of the day off your
          hands: the setup, the timing, the vendors, and the small fires that flare up and get quietly put out before you
          ever hear about them. You get to be a guest at your own wedding. Your people get to relax, because someone
          steady is clearly in charge.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 border-y border-black/[0.06] bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">How it works</span>
          </div>
          <ul className="space-y-5">
            {STEPS.map((t, i) => (
              <li key={i} className="flex gap-4 items-start">
                <Check className="w-4 h-4 mt-1 shrink-0 text-[#997700]" strokeWidth={2} />
                <span className="text-sm sm:text-base text-[#5b6470] font-light leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto bg-black text-white p-10 sm:p-16 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-light block mb-6">Investment</span>
          <div className="font-serif text-4xl sm:text-5xl font-light mb-4">NZD $1,800</div>
          <p className="text-sm text-white/75 font-light leading-relaxed max-w-md mx-auto">
            On its own. Or NZD $1,200 as an add-on to The Wedding Navigator, if you would like a steady hand both while
            you plan and on the day.
          </p>
        </div>
      </section>

      {/* CLOSE */}
      <section className="py-24 px-6 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto">
          <RevealHeading
            as="h2"
            className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-8"
            text="Hand the day to someone calm."
            amount={0.4}
          />
          <p className="text-sm sm:text-base text-white/85 font-light leading-[1.9] max-w-xl mx-auto mb-10">
            If you have done the work and just want to be in your own wedding, send me a note.
          </p>
          <button
            onClick={onEnquire}
            className="group inline-flex items-center justify-center gap-3 bg-[#f3eee2] text-[#412c00] px-8 py-4 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium shadow-xl shadow-black/25 hover:bg-white transition active:scale-[0.99] duration-300"
          >
            Begin a conversation about coordination
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
