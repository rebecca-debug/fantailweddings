import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { RevealHeading } from "./reveal";

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

// ── The checkout link the "Book your hour" buttons point to. ──────────────
// Replace the URL below with the checkout for the new $444 offer once it's set
// up. If you want the two add-ons (styling direction, second call) to appear as
// tick-boxes at checkout, that needs an order-bump checkout such as ThriveCart.
const CHECKOUT_URL = "https://buy.stripe.com/00wdR3cdB1hZbyE2Jm6oo01";

interface WeddingNavigatorProps {
  onNavigate: (path: string) => void;
  onEnquire: () => void;
}

const STEPS = [
  {
    n: "i",
    title: "The call",
    body:
      "One hour on Zoom. We talk through where you are, what's booked, what's nagging. You ask me anything. I've done this many times, and for that hour it's all yours, in plain terms."
  },
  {
    n: "ii",
    title: "Your plan, mapped",
    body:
      "Everything we cover, I load into a plan built around your wedding — your dates, your vendors, your order of the day. Not a template you fill in. One filled in with you."
  },
  {
    n: "iii",
    title: "A walkthrough you keep",
    body:
      "Then a short recorded video where I take you through it, so when you open it again in three weeks it still makes sense and you know exactly what's next."
  }
];

const FOR_YOU = [
  "You're underway — a venue, maybe a vendor or two, and a growing list you're not sure is complete.",
  "You want a sounding board who's done this before, not someone to take it over.",
  "You'd rather ask the awkward questions now than find the answer on the day.",
  "You're planning something warm for the people you love, and you want it to feel considered."
];

const NOT_YET = [
  "You haven't started, and you're looking for where to begin. We'd talk a little differently.",
  "You want me to plan and run the whole wedding. That's full planning — a different conversation, and one I'd love to have.",
  "You're after the cheapest possible answer. This isn't that."
];

const INCLUDED = [
  "One hour on Zoom, with me",
  "Your plan, mapped to your wedding",
  "A recorded walkthrough, yours to keep"
];

const BUMPS = [
  {
    title: "Styling direction",
    amt: "+ NZD $222",
    body:
      "A mood board and a hire list to point you in a clear direction, so the look feels like yours and you're not guessing. This is direction to run with yourself. If you'd like me designing it and running the day, that's my Design & Coordinate service — a different thing."
  },
  {
    title: "A second call",
    amt: "+ NZD $123",
    body:
      "One more hour, later in the process, for when the next wave of questions arrives. It usually does, and it's steadying to know there's a door."
  }
];

const FAQS = [
  {
    q: "Will an hour really be enough?",
    a:
      "For this, yes. You're not starting from nothing — you're checking a plan that's already well along. An hour of focused, experienced attention on the right questions moves you further than another week of second-guessing. And if you'd like more, there's a door for that."
  },
  {
    q: "Can't I find all this online?",
    a:
      "Some of it. The checklists are everywhere. What isn't online is someone looking at your wedding, your vendors and your contracts, and telling you plainly whether you're on track. That's the whole hour."
  },
  {
    q: "$444 — is it worth it?",
    a:
      "You're spending far more than that on a single day, and losing sleep over whether it'll hold together. This is a small amount to know that it will. If you only want the cheapest possible answer, I'm not it, and I'd rather say so now."
  },
  {
    q: "I don't want someone to take over.",
    a:
      "Good. Neither do I, not here. This is your wedding to plan. I'm the experienced voice in the room for an hour, telling you where you're right and where to look again."
  }
];

function PrimaryCTA({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 bg-[#f3eee2] text-[#412c00] px-8 py-4 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium shadow-xl shadow-black/25 hover:bg-white transition active:scale-[0.99] duration-300 ${className}`}
    >
      Book your hour — NZD $444
      <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
    </a>
  );
}

export default function WeddingNavigator({ onNavigate, onEnquire }: WeddingNavigatorProps) {
  void onNavigate;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "The Wedding Navigator | Fantail Weddings";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    meta?.setAttribute(
      "content",
      "The Wedding Navigator by Fantail Weddings: one hour on Zoom with Rebecca and a plan mapped to your own New Zealand wedding, for couples already underway who want an experienced read on it."
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
            The Wedding Navigator
          </span>
          <RevealHeading
            as="h1"
            className="font-serif text-3xl sm:text-5xl font-light leading-[1.12] tracking-tight mb-6"
            text="You've booked the big things. It's the small ones that wake you at 2am."
            amount={0.3}
          />
          <p className="text-sm sm:text-base font-light text-white/90 leading-[1.85] max-w-xl mx-auto mb-3">
            You're well underway. A venue held, a caterer signed, a photographer you already love. And still there's
            a quiet voice asking whether you've missed something that only shows up on the day.
          </p>
          <p className="text-sm sm:text-base font-light text-white/90 leading-[1.85] max-w-xl mx-auto mb-9">
            An hour with me, and a plan mapped to your actual wedding, is how that voice goes quiet.
          </p>
          <PrimaryCTA />
          <div className="mt-4 text-[10px] sm:text-xs tracking-[0.22em] uppercase text-white/70 font-light">
            One hour on Zoom · NZD $444
          </div>
        </div>
      </section>

      {/* THE REAL PROBLEM */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-6">The real problem</span>
        <RevealHeading
          as="h2"
          className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-8"
          text="You don't need another blank spreadsheet."
        />
        <p className="text-base text-[#5b6470] font-light leading-[1.9] mb-5">
          You've read the checklists. You've downloaded the template that promised to hold it all, and it sat there
          empty, asking you to already know the answers.
        </p>
        <p className="text-base text-[#5b6470] font-light leading-[1.9] mb-5">
          That's the gap. Generic advice can't tell you whether your timeline leaves enough room to get into your gown
          without rushing, or whether the contract from your caterer covers what you're picturing on the night. It
          doesn't know your wedding.
        </p>
        <p className="text-base text-[#5b6470] font-light leading-[1.9]">I will, an hour in.</p>

        <figure className="mt-14 border-t border-black/10 pt-12">
          <blockquote className="font-serif text-xl sm:text-2xl italic text-black/80 font-light leading-relaxed">
            "OMG, the budget now makes sense. Thank you very much for those tips."
          </blockquote>
          <figcaption className="mt-5 text-[10px] tracking-[0.3em] uppercase text-[#997700]">
            B &amp; S, Online Wedding Consultation, January 2026
          </figcaption>
        </figure>
      </section>

      {/* HOW THE HOUR WORKS */}
      <section className="py-20 px-6 border-y border-black/[0.06] bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">How the hour works</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight leading-snug">
              An hour, and everything it surfaces, written down and handed back to you.
            </h2>
          </div>
          <ol className="space-y-0">
            {STEPS.map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 sm:gap-8 items-start border-t border-black/[0.08] py-8 last:border-b">
                <span className="font-serif text-3xl text-[#997700] font-light leading-none w-8 shrink-0">{s.n}</span>
                <div>
                  <h3 className="font-serif text-xl text-black font-normal mb-2">{s.title}</h3>
                  <p className="text-sm sm:text-base text-[#5b6470] font-light leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHETHER THIS IS YOURS */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">Whether this is yours</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-black font-medium mb-7">This is for you if</h3>
            <ul className="space-y-5">
              {FOR_YOU.map((t, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-[#997700]" strokeWidth={2} />
                  <span className="text-sm sm:text-base text-[#5b6470] font-light leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l border-black/10 md:pl-16">
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-black/50 font-medium mb-7">Not yet, if</h3>
            <ul className="space-y-5">
              {NOT_YET.map((t, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/20 shrink-0" />
                  <span className="text-sm sm:text-base text-black/45 font-light leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* THE OFFER */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto bg-black text-white p-10 sm:p-16 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-light block mb-6">The Wedding Navigator</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight leading-snug mb-6">
            An hour, and a plan with your name on it.
          </h2>
          <p className="text-sm text-white/70 font-light leading-relaxed max-w-xl mx-auto mb-10">
            My full planning runs to several thousand. This is the way in for couples who mostly have it handled and
            want an experienced read on it, before the day arrives.
          </p>
          <div className="font-serif text-5xl sm:text-6xl font-light mb-10">NZD $444</div>
          <ul className="max-w-sm mx-auto space-y-4 border-t border-white/15 pt-8 mb-10 text-left">
            {INCLUDED.map((t, i) => (
              <li key={i} className="flex gap-4 items-start">
                <Check className="w-4 h-4 mt-1 shrink-0 text-[#c9a24b]" strokeWidth={2} />
                <span className="text-sm text-white/85 font-light">{t}</span>
              </li>
            ))}
          </ul>
          <PrimaryCTA className="mx-auto" />
        </div>
      </section>

      {/* IF IT WOULD HELP — ADD-ONS */}
      <section className="py-20 px-6 bg-white border-y border-black/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">If it would help</span>
            <p className="text-sm sm:text-base text-[#5b6470] font-light leading-relaxed max-w-xl mx-auto">
              Two things some couples add. Neither is needed for the hour to be worth it — take them only if they'd
              genuinely make your life easier.
            </p>
          </div>
          <div className="space-y-0">
            {BUMPS.map((b, i) => (
              <div key={i} className="border-t border-black/[0.08] py-8 last:border-b">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-3">
                  <h3 className="font-serif text-2xl text-black font-light">{b.title}</h3>
                  <span className="text-xs tracking-[0.12em] uppercase font-medium text-[#997700] whitespace-nowrap">{b.amt}</span>
                </div>
                <p className="text-sm sm:text-base text-[#5b6470] font-light leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A QUIET EXAMPLE — SARA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-8">A quiet example</span>
          <p className="font-serif text-xl sm:text-2xl italic text-black/80 font-light leading-[1.6]">
            When Sara came to me, she'd booked beautifully and was quietly certain she'd overlooked something. What she
            didn't have was a feel for time — how long it actually takes to get into a gown without rushing, where a
            first look sits, how those few minutes shape the whole afternoon. We mapped it together. On the day, it
            flowed, and she got to be in it rather than watching the clock.
          </p>
          <div className="mt-7 text-[10px] tracking-[0.3em] uppercase text-[#5b6470]">Sara &amp; Mark · married in January</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white border-t border-black/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">Before you ask</span>
          </div>
          <div className="space-y-8">
            {FAQS.map((f, i) => (
              <div key={i} className="border-b border-black/10 pb-8">
                <h3 className="font-serif text-lg sm:text-xl text-black font-normal mb-3">{f.q}</h3>
                <p className="text-sm sm:text-base text-[#5b6470] font-light leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="py-24 px-6 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-light block mb-6">One last thing</span>
          <RevealHeading
            as="h2"
            className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-8"
            text="Come and talk it through."
            amount={0.4}
          />
          <p className="text-sm sm:text-base text-white/85 font-light leading-[1.9] max-w-xl mx-auto mb-10">
            If you've read this far, some quiet part of you is already wondering what you've missed. An hour is usually
            all it takes to answer that. Bring your questions, your half-finished list, the contract you've read four
            times and still aren't sure about. I'll put the kettle on — Earl Grey, if you're having one — and we'll get
            you clear.
          </p>
          <PrimaryCTA className="mx-auto mb-8" />
          <p className="text-sm text-white/70 font-light mb-2">Or if you'd rather ask a question first:</p>
          <button
            onClick={onEnquire}
            className="font-serif text-lg italic text-white hover:text-white/70 transition underline-offset-4 hover:underline"
          >
            Send me a note
          </button>
          <p className="text-xs text-white/45 font-light leading-relaxed mt-8 max-w-md mx-auto">
            Jasper may make an appearance. He is deeply supportive and completely unhelpful.
          </p>
        </div>
      </section>
    </div>
  );
}
