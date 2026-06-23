import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { RevealHeading } from "./reveal";

const LUX_EASE = [0.16, 1, 0.3, 1] as const;
const STRIPE_URL = "https://buy.stripe.com/00wdR3cdB1hZbyE2Jm6oo01";
const EMAIL = "rebecca@fantailweddings.com";

interface WeddingNavigatorProps {
  onNavigate: (path: string) => void;
  onEnquire: () => void;
}

const CALLS = [
  {
    n: "Call 1",
    title: "Onboarding",
    dur: "30 minutes",
    body:
      "We start here. You tell me about your wedding: the date, the place, the feeling you're going for, and where you're feeling uncertain. I listen carefully. Within a week of this call, your personalised toolkit will arrive."
  },
  {
    n: "Call 2",
    title: "Three-Month Check-in",
    dur: "1 hour",
    body:
      "This is the call where couples usually wonder whether they've forgotten something. We go through where you are, what's done, what still needs attention, and I'll flag anything that needs to move faster."
  },
  {
    n: "Call 3",
    title: "Six-Week Check-in",
    dur: "1 hour",
    body:
      "The wee freak-out call, as I like to call it. It arrives on schedule for almost every couple. We'll make sure your day-of timeline is solid, your vendors are confirmed, and you know exactly what to do if something shifts."
  }
];

const TOOLKIT = [
  "A wedding timeline working backwards from your date, so you always know what should be happening now",
  "A vendor outreach sequence with the right questions to ask before you sign anything",
  "Styling aids matched to your venue and season",
  "A 12-week countdown checklist for the final stretch, when everything converges at once"
];

const RIGHT_FOR_YOU = [
  "You're planning your own wedding in New Zealand and want expert guidance without handing over full control",
  "You like making your own decisions, but want someone experienced to check your thinking",
  "You want a clear roadmap, not a pile of blog posts and Pinterest boards that may or may not apply to you",
  "You're 9 to 14 months out from your date (though it works with 18 months or 6)"
];

const STEPS = [
  "Click the button below and complete your Stripe payment (50% today)",
  "You'll receive a welcome email from Rebecca within two working days, with a link to book your onboarding call",
  "We have our first call, 30 minutes, relaxed, your questions welcome",
  "Your personalised toolkit arrives within 7 days",
  "Check-in calls at 3 months and 6 weeks out, we stay in step with your planning rhythm"
];

// Answers drawn from the page's own copy (the Notion source listed the questions only).
const FAQS = [
  {
    q: "How is The Wedding Navigator different from full planning?",
    a: "Full planning hands the whole show to me. The Navigator hands you the map instead: three live calls and a personalised toolkit so you keep control of your own wedding, with someone who's done this a hundred times checking your thinking along the way."
  },
  {
    q: "How far in advance should I book?",
    a: "It's at its best when you're 9 to 14 months out from your date, though it works just as well at 18 months, or even 6."
  },
  {
    q: "Is this available nationwide?",
    a: "Yes. The toolkit travels well anywhere in New Zealand and North Island weddings are very welcome. My vendor knowledge is deepest in the South Island, so vendor recommendations are simply lighter the further from it you are."
  },
  {
    q: "What if I decide I want full planning after all?",
    a: "If you start with the Navigator and decide within the first month that you'd like to move to full-service planning instead, your Navigator fee credits across. No money lost, just a change of shape."
  },
  {
    q: "Will I actually talk to Rebecca, or is there a team?",
    a: "You talk to Rebecca. I work with a small number of couples each year, not out of false scarcity, but because I want to give each one my all."
  }
];

function PrimaryCTA({ className = "" }: { className?: string }) {
  return (
    <a
      href={STRIPE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 bg-[#f3eee2] text-[#412c00] px-8 py-4 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium shadow-xl shadow-black/25 hover:bg-white transition active:scale-[0.99] duration-300 ${className}`}
    >
      Click Here To Book The Wedding Navigator - NZD $425 Today for the deposit
      <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
    </a>
  );
}

export default function WeddingNavigator({ onNavigate, onEnquire }: WeddingNavigatorProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "The Wedding Navigator | Fantail Weddings";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    meta?.setAttribute(
      "content",
      "The Wedding Navigator by Fantail Weddings: three live calls with Rebecca and a personalised toolkit for couples planning their own New Zealand wedding."
    );
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="bg-[#f7f7f7] text-black">
      {/* HERO */}
      <section className="relative h-[64vh] sm:h-[72vh] min-h-[540px] max-h-[760px] flex items-center justify-center overflow-hidden">
        <motion.img
          src="/assets/images/wedding-navigator-hero.webp"
          alt="A couple holding hands on their wedding day"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: LUX_EASE }}
        />
        {/* Base wash + focused vignette behind the text for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 72% 62% at 50% 46%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 56%, rgba(0,0,0,0) 100%)"
          }}
        />
        <div
          className="relative z-10 max-w-2xl mx-auto px-6 py-14 text-center text-white"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.55)" }}
        >
          <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/85 font-light block mb-5">
            The Wedding Navigator by Fantail Weddings
          </span>
          <RevealHeading
            as="h1"
            className="font-serif text-3xl sm:text-5xl font-light leading-[1.12] tracking-tight mb-6"
            text="You just don't want to get it wrong."
            amount={0.3}
          />
          <p className="text-sm sm:text-base font-light text-white/90 leading-[1.85] max-w-xl mx-auto mb-3">
            You're organised. You've done the research. You actually enjoy the planning, mostly. You don't need
            someone to run the whole show for you.
          </p>
          <p className="text-sm sm:text-base font-light text-white/90 leading-[1.85] max-w-xl mx-auto mb-9">
            What you need is someone who's done this a hundred times to hand you the map, stand beside you for a
            moment, and send you on your way with everything you need.
          </p>
          <PrimaryCTA />
        </div>
      </section>

      {/* PITCH + TESTIMONIAL */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <RevealHeading
          as="h2"
          className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-8"
          text="That's The Wedding Navigator."
        />
        <figure className="mt-10 border-t border-black/10 pt-10">
          <blockquote className="font-serif text-xl sm:text-2xl italic text-black/80 font-light leading-relaxed">
            "OMG, the budget now makes sense. Thank you very much for those tips."
          </blockquote>
          <figcaption className="mt-5 text-[10px] tracking-[0.3em] uppercase text-[#997700]">
            B &amp; S, Online Wedding Consultation, January 2026
          </figcaption>
        </figure>
      </section>

      {/* WHAT'S INCLUDED — THREE CALLS */}
      <section className="py-20 px-6 bg-white border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">What's included</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight leading-snug">
              Three live calls with Rebecca, built around the moments that matter most.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {CALLS.map((c) => (
              <div key={c.n} className="bg-[#f7f7f7] border border-black/[0.06] p-8 flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#997700] mb-4">{c.n}</span>
                <h3 className="font-serif text-xl text-black font-normal mb-1">{c.title}</h3>
                <span className="font-serif text-sm italic text-black/45 mb-5">{c.dur}</span>
                <p className="text-sm text-[#5b6470] font-light leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          {/* Toolkit */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <h3 className="font-serif text-2xl text-black font-light mb-3">Your Personalised Toolkit</h3>
              <p className="text-sm italic font-serif text-black/55 mb-4">delivered within 7 days of Call 1</p>
              <p className="text-sm text-[#5b6470] font-light leading-relaxed">
                Built around your wedding. Not a template. Built from fifteen years of full-service planning,
                compressed into a shape that suits a couple doing the work themselves.
              </p>
            </div>
            <ul className="lg:col-span-7 space-y-5">
              {TOOLKIT.map((t, i) => (
                <li key={i} className="flex gap-4 items-start border-b border-black/[0.06] pb-5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-[#997700]" strokeWidth={2} />
                  <span className="text-sm text-[#5b6470] font-light leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="bg-black text-white p-10 sm:p-14 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-light block mb-5">The investment</span>
            <div className="font-serif text-4xl sm:text-5xl font-light mb-2">NZD $850 <span className="text-2xl text-white/60">+ GST</span></div>
            <p className="text-sm text-white/70 font-light mb-8">Paid in two parts.</p>
            <div className="space-y-4 mb-10">
              <div className="border-l-2 border-[#997700] pl-4">
                <div className="text-sm font-normal">50% at booking</div>
                <div className="text-xs text-white/60 font-light">secures your date and gets us started</div>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <div className="text-sm font-normal">50% before your second call</div>
                <div className="text-xs text-white/60 font-light">once your toolkit is in your hands and you've had time to work with it</div>
              </div>
            </div>
            <PrimaryCTA className="w-full text-center" />
          </div>
          <div className="bg-white border border-black/[0.06] p-10 sm:p-14 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-5">A note worth knowing</span>
            <p className="font-serif text-xl sm:text-2xl font-light text-black/85 leading-relaxed">
              If you start with The Wedding Navigator and decide within the first month that you'd like to move to
              full-service planning instead, your Navigator fee credits across.
            </p>
            <p className="text-sm text-[#5b6470] font-light leading-relaxed mt-5">No money lost. Just a change of shape.</p>
          </div>
        </div>
      </section>

      {/* RIGHT FOR YOU + WHERE I HELP */}
      <section className="py-20 px-6 bg-white border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-6">This offer is right for you if…</span>
            <ul className="space-y-6">
              {RIGHT_FOR_YOU.map((t, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-[#997700]" strokeWidth={2} />
                  <span className="text-base text-[#5b6470] font-light leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:border-l border-black/10 lg:pl-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-6">Where I can help most</span>
            <p className="text-sm text-[#5b6470] font-light leading-relaxed mb-4">
              My vendor knowledge is deepest in the South Island: Central Otago, Wānaka, Queenstown, the Mackenzie
              Country, Marlborough, and Banks Peninsula.
            </p>
            <p className="text-sm text-[#5b6470] font-light leading-relaxed">
              North Island weddings are very welcome, and the toolkit travels well anywhere in New Zealand. Vendor
              recommendations will simply be lighter the further from the South Island you are.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">How it works</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight">Five simple steps</h2>
        </div>
        <ol className="space-y-10">
          {STEPS.map((s, i) => (
            <li key={i} className="flex gap-6 sm:gap-8 items-start">
              <span className="font-serif text-3xl sm:text-4xl text-black/15 font-light leading-none w-12 shrink-0">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <p className="text-base text-[#5b6470] font-light leading-relaxed pt-1">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* READY / CTA */}
      <section className="py-24 px-6 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto">
          <RevealHeading as="h2" className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-8" text="Ready?" amount={0.4} />
          <PrimaryCTA className="mx-auto mb-10" />
          <p className="text-sm text-white/70 font-light mb-2">Or if you'd prefer to ask a question first:</p>
          <a href={`mailto:${EMAIL}`} className="font-serif text-lg italic text-white hover:text-white/70 transition underline-offset-4 hover:underline">
            {EMAIL}
          </a>
          <p className="text-xs text-white/50 font-light leading-relaxed mt-6 max-w-md mx-auto">
            I read every email myself, usually with a cup of Earl Grey before the day gets busy. You'll hear back
            within two working days.
          </p>
        </div>
      </section>

      {/* ABOUT REBECCA */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 rounded-sm shadow-sm">
              <img src="/assets/images/Rebecca-founder.jpg" alt="Rebecca, founder of Fantail Weddings" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-5">A few things about me</span>
            <p className="text-base text-[#5b6470] font-light leading-[1.9] mb-6">
              Thirty years across hospitality that includes 15 years of wedding planning for destination couples,
              film production in Auckland, commercial floristry, event work in Las Vegas, and three years running a
              converted woolshed venue near Wānaka. I understand how a wedding day is remembered, photographed, and
              felt by the people in the room.
            </p>
            <p className="text-base text-[#5b6470] font-light leading-[1.9] mb-8">
              I work with a small number of couples each year, not out of false scarcity, but because I want to give
              each one my all.
            </p>
            <p className="font-serif text-2xl italic text-black/80 font-light">Every kind of love belongs here.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white border-t border-black/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">Questions couples often ask</span>
          </div>
          <div className="space-y-8">
            {FAQS.map((f, i) => (
              <div key={i} className="border-b border-black/10 pb-8">
                <h3 className="font-serif text-lg sm:text-xl text-black font-normal mb-3">{f.q}</h3>
                <p className="text-sm text-[#5b6470] font-light leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-serif text-xl italic text-black/70 font-light mt-16">
            All are welcome here. Every kind of love belongs at a Fantail wedding.
          </p>
        </div>
      </section>
    </div>
  );
}
