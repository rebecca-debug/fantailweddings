import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { RevealHeading } from "./reveal";

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

// ── The checkout link the "Book your Planning Session" buttons point to. ──
// Replace the URL below with the Stripe checkout for the $890 + GST offer.
// (The old $444 link and the two add-on products are no longer used.)
const CHECKOUT_URL = "https://buy.stripe.com/eVq6oB4L92m35agabO6oo02";

interface WeddingNavigatorProps {
  onNavigate: (path: string) => void;
  onEnquire: () => void;
}

const STEPS = [
  {
    n: "1",
    title: "The Planning Session",
    body:
      "One hour, online. We talk through all of it: what you're picturing, what's already booked, and what's keeping you up at night. You leave with clarity, and with your own copy of The Planning Home, a space where your guest list, RSVPs, catering and budget finally live in one place instead of across forty tabs. Not a template or a download you fill in alone, but the actual working space I use for the weddings I plan myself."
  },
  {
    n: "2",
    title: "Your Next Steps video",
    body:
      "Within 48 hours, a short recorded walkthrough made just for you: exactly what to do next, in what order, and who I would trust to fill any gaps."
  },
  {
    n: "3",
    title: "Two check-ins while you plan",
    body:
      "For the moments you're stuck on a decision and want a second, experienced opinion before you commit. Book it in when you need it most."
  },
  {
    n: "4",
    title: "The Timeline Build",
    body:
      "Around eight weeks before the day, we build your wedding day timeline together, live, vendor by vendor. This is the step that quietly earns its keep. It's where I find what's missing before the day does: the clarity to see you through, calm and relaxed."
  },
  {
    n: "5",
    title: "Your Day Card",
    body:
      "A considered A5 run sheet for the people helping you on the day, with a QR code to the full timeline. So the ones who matter most always know what happens next."
  }
];

const INCLUDED = [
  "The Planning Session, online, and your copy of The Planning Home",
  "Your Next Steps video, within 48 hours",
  "Two check-ins while you plan, booked when you need them",
  "The Timeline Build, around eight weeks out",
  "Your Day Card, to share with the guests and vendors who matter on the day"
];

const FAQS = [
  {
    q: "Isn't this just a spreadsheet I could find online?",
    a:
      "You can find a hundred blank ones. What you can't download is someone building it around your wedding in real time, then telling you plainly what's missing. The tool matters. The eye on it matters more."
  },
  {
    q: "$890 feels like a lot when I'm already watching every dollar.",
    a:
      "I understand. You're also spending far more than that on a single day, and losing sleep over whether it will hold together. Much of what I do here is help you spend the rest of your budget well: where it's worth it, where it isn't, and where the quiet \u2018wedding tax\u2019 is creeping in. It tends to pay for itself."
  },
  {
    q: "We don't want someone taking over our wedding.",
    a:
      "Good. Neither do I. This is your wedding to plan. I'm the experienced voice beside you for the decisions that matter, not a set of hands taking the pen."
  },
  {
    q: "Everyone in my family has an opinion. Can you help with that?",
    a:
      "More than you'd think. A lot of what keeps couples up at night isn't the logistics, it's the noise around them. Part of my job is helping you hold on to the wedding you actually want, kindly and clearly, when the advice is coming from every direction."
  },
  {
    q: "What do I actually walk away with?",
    a:
      "A plan built around your wedding, in one place. A recorded walkthrough of exactly what to do next. Two check-ins for when you're stuck. A timeline built with you, vendor by vendor. A Day Card so the people helping always know what's next. And the quiet that comes with it all."
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
      Book your Planning Session
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
      "The Wedding Navigator by Fantail Weddings: done-with-you planning for couples planning their own New Zealand wedding. A planning session, your own planning space, a next-steps video, two check-ins, and a live timeline build. $890 + GST."
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
          alt="A couple on their wedding day"
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
            text="You've done the research. Now let's make it a plan."
            amount={0.3}
          />
          <p className="text-sm sm:text-base font-light text-white/90 leading-[1.85] max-w-xl mx-auto mb-3">
            The Wedding Navigator supports couples planning their own wedding, from someone who has spent sixteen years
            producing New Zealand weddings.
          </p>
          <p className="text-sm sm:text-base font-light text-white/90 leading-[1.85] max-w-xl mx-auto mb-9">
            You make every decision. I make sure nothing falls through the gaps.
          </p>
          <PrimaryCTA />
          <div className="mt-4 text-[10px] sm:text-xs tracking-[0.22em] uppercase text-white/70 font-light">
            $890 + GST
          </div>
        </div>
      </section>

      {/* SOUND FAMILIAR - the problem */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-6">The reality</span>
        <RevealHeading
          as="h2"
          className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-8"
          text="Sound familiar?"
        />
        <p className="text-base text-[#5b6470] font-light leading-[1.9] mb-5">
          Forty tabs open, a group chat full of screenshots, and a nagging feeling you've missed something. Your
          photographer has asked for a timeline, and you're not sure what one looks like. Your inbox holds three quotes
          that all say something different. Everyone has an opinion.
        </p>
        <p className="text-base text-[#5b6470] font-light leading-[1.9]">
          You are doing the job of a wedding planner, at night, after your actual job, without the shortcuts that only
          come from having done it many times before.
        </p>
      </section>

      {/* THE SHIFT */}
      <section className="py-20 px-6 border-y border-black/[0.06] bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-6">The middle ground</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight leading-snug mb-8">
            You don't need someone to take over. You need someone who has seen it a hundred times.
          </h2>
          <p className="text-base text-[#5b6470] font-light leading-[1.9]">
            There is a middle ground between planning it all alone and handing the whole thing to a planner. That middle
            ground is where I sit. You keep your wedding: your taste, your budget, your calls. I bring sixteen years of
            knowing what tends to get forgotten, what a realistic timeline actually looks like, and which question to ask
            a vendor before you sign. You stay in charge. You just stop guessing.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-4">How it works</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight leading-snug">
              Five steps, from the first conversation to the morning of.
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

      {/* WHAT THIS ISN'T */}
      <section className="py-20 px-6 border-y border-black/[0.06] bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-6">To be clear</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-8">What this isn't</h2>
          <p className="text-base text-[#5b6470] font-light leading-[1.9]">
            I do not contact your vendors, and I am not there on the day. This is not me quietly running your wedding
            from the wings. You stay in charge of every choice, from the celebrant to the canapés. What changes is that
            you make those choices with someone experienced beside you, rather than alone at midnight ready to pack it in
            and elope.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-6">Whether this is yours</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-8">This is for you if</h2>
        <p className="text-base text-[#5b6470] font-light leading-[1.9]">
          You've booked a thing or two, you've got opinions coming at you from every direction, and you'd rather ask the
          awkward questions now than discover the answer on the day. You are not after a bigger wedding. You are after a
          calmer one, and the quiet confidence that comes from knowing nothing is slipping through, simply because you
          didn't know to look for it.
        </p>
      </section>

      {/* A QUIET EXAMPLE - SARA */}
      <section className="py-20 px-6 border-y border-black/[0.06] bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-8">A quiet example</span>
          <p className="font-serif text-xl sm:text-2xl italic text-black/80 font-light leading-[1.6]">
            When Sara came to me, she had booked beautifully and was quietly certain she'd overlooked something. What she
            didn't have was a feel for time: how long it actually takes to get into a gown without rushing, where a first
            look sits, how those few minutes shape the whole afternoon. We mapped it together. On the day, it flowed, and
            she got to be in it, rather than watching the clock.
          </p>
          <div className="mt-7 text-[10px] tracking-[0.3em] uppercase text-[#5b6470]">Sara and Mark · married in January</div>
        </div>
      </section>

      {/* THE OFFER */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto bg-black text-white p-10 sm:p-16 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-light block mb-6">The Wedding Navigator</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight leading-snug mb-10">
            Everything, from the first conversation to the morning of.
          </h2>
          <ul className="max-w-md mx-auto space-y-4 text-left mb-10">
            {INCLUDED.map((t, i) => (
              <li key={i} className="flex gap-4 items-start">
                <Check className="w-4 h-4 mt-1 shrink-0 text-[#c9a24b]" strokeWidth={2} />
                <span className="text-sm sm:text-base text-white/85 font-light">{t}</span>
              </li>
            ))}
          </ul>
          <div className="font-serif text-5xl sm:text-6xl font-light mb-3">$890</div>
          <div className="text-[11px] tracking-[0.22em] uppercase text-white/55 font-light mb-8">+ GST</div>
          <p className="text-sm text-white/70 font-light leading-relaxed max-w-xl mx-auto mb-10">
            My full planning has always run to several thousand for clients. This is the way in for couples who want that
            experience and that eye, kept to the parts they actually need.
          </p>
          <PrimaryCTA className="mx-auto" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white border-y border-black/[0.06]">
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
            text="Come and make it a plan."
            amount={0.4}
          />
          <p className="text-sm sm:text-base text-white/85 font-light leading-[1.9] max-w-xl mx-auto mb-10">
            If you've read this far, some quiet part of you already knows the research phase is over. The next step isn't
            another checklist. It's one hour, and a plan that finally holds everything in one place. Bring your questions,
            your half-finished list, the quotes you can't make sense of. I'll have the kettle on. Earl Grey, if you're having one.
          </p>
          <PrimaryCTA className="mx-auto mb-8" />
          <p className="text-sm text-white/70 font-light mb-2">Or if you'd rather ask a question first:</p>
          <button
            onClick={onEnquire}
            className="font-serif text-lg italic text-white hover:text-white/70 transition underline-offset-4 hover:underline"
          >
            Send me a note
          </button>
        </div>
      </section>
    </div>
  );
}
