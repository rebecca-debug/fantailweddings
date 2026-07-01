import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { RevealHeading, RevealImage } from "./reveal";
import { JournalArticleData } from "../journal";

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

const revealItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: LUX_EASE } }
};
const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } }
};

function Divider() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        className="h-[1px] bg-black/10 w-full origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: LUX_EASE }}
      />
    </div>
  );
}

interface JournalArticleProps {
  article: JournalArticleData;
  onEnquire: () => void;
  onBackToJournal: () => void;
}

export default function JournalArticle({ article, onEnquire, onBackToJournal }: JournalArticleProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Per-article SEO: title + description while this page is shown
  useEffect(() => {
    const prevTitle = document.title;
    document.title = article.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    meta?.setAttribute("content", article.metaDescription);
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, [article]);

  return (
    <article className="pt-16 md:pt-20">
      {/* Breadcrumb back to Journal */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <a
          href="/journal/"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            onBackToJournal();
          }}
          className="group text-[10px] tracking-[0.25em] uppercase text-[#708090] hover:text-black transition inline-flex items-center"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> The Journal
        </a>
      </div>

      {/* HERO */}
      <section className="relative py-8 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: LUX_EASE }}
          className="relative h-[58dvh] md:h-[72dvh] w-full overflow-hidden bg-gray-100 rounded-sm shadow-sm"
        >
          <motion.img
            src={article.heroImage}
            alt={article.title}
            className="object-cover w-full h-full"
            referrerPolicy="no-referrer"
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"></div>
          <div className="absolute left-6 md:left-14 bottom-[12%] md:bottom-[16%] max-w-2xl text-white space-y-3">
            <RevealHeading
              as="span"
              className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/90 font-light block"
              text={article.eyebrow}
              delay={0.6}
              stagger={0.04}
              amount={0.4}
            />
            <RevealHeading
              as="h1"
              className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white font-light leading-[1.1] tracking-tight"
              text={article.title}
              delay={0.85}
              amount={0.4}
            />
            <motion.span
              className="font-serif text-base md:text-lg italic text-white/85 font-light block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3, ease: LUX_EASE }}
            >
              {article.subtitle}
            </motion.span>
          </div>
        </motion.div>
      </section>

      <Divider />

      {/* INTRO */}
      <motion.section
        className="py-24 px-6 max-w-3xl mx-auto text-center"
        variants={revealItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <RevealHeading
          as="h2"
          className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight mb-8"
          text={article.intro.heading}
        />
        <p className="text-base text-[#708090] font-light leading-relaxed">{article.intro.body}</p>
      </motion.section>

      <Divider />

      {/* WHY (image + text) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="col-span-1 lg:col-span-6">
            <RevealImage
              src={article.why.image}
              alt={article.why.heading}
              wrapClassName="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 rounded-sm shadow-sm"
            />
          </div>
          <motion.div
            className="col-span-1 lg:col-span-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: LUX_EASE, delay: 0.1 }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
              {article.why.eyebrow}
            </span>
            <RevealHeading
              as="h2"
              className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight"
              text={article.why.heading}
            />
            <p className="text-sm text-[#708090] font-light leading-relaxed">{article.why.body}</p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SEASONS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16 max-w-2xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">The Year Here</span>
          <RevealHeading
            as="h2"
            className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight"
            text="Four seasons, four moods"
          />
          <p className="text-sm font-light text-[#708090] leading-relaxed">{article.seasons.intro}</p>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {article.seasons.items.map((s, i) => (
            <motion.div key={s.name} variants={revealItem} className="space-y-3 bg-white p-6 border border-black/[0.05]">
              <span className="font-serif text-3xl italic text-black/15 font-light block">{(i + 1).toString().padStart(2, "0")}</span>
              <h4 className="font-serif text-lg text-black font-normal italic">{s.name}</h4>
              <p className="text-xs text-[#708090] font-light leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-sm font-light text-[#708090] leading-relaxed max-w-3xl mt-12 italic">
          {article.seasons.outro}
        </p>
      </section>

      <Divider />

      {/* VENUES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16 max-w-2xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">{article.venues.eyebrow}</span>
          <RevealHeading
            as="h2"
            className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight"
            text={article.venues.heading}
          />
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10"
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          {article.venues.items.map((v, i) => (
            <motion.div key={v.name} variants={revealItem} className="flex gap-5 items-start border-b border-black/[0.06] pb-6">
              <span className="font-mono text-[10px] text-black/30 mt-1.5">{(i + 1).toString().padStart(2, "0")}</span>
              <div className="space-y-1.5">
                {v.url ? (
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/v inline-flex items-baseline gap-1.5 font-serif text-lg text-black font-normal hover:text-black/55 transition"
                  >
                    {v.name}
                    <span className="font-sans text-[11px] text-black/30 group-hover/v:text-black/55 transition" aria-hidden="true">&#8599;</span>
                  </a>
                ) : (
                  <h4 className="font-serif text-lg text-black font-normal">{v.name}</h4>
                )}
                <p className="text-xs text-[#708090] font-light leading-relaxed">{v.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Divider />

      {/* FAQ */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">Good to Know</span>
            <RevealHeading
              as="h2"
              className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight"
              text="Frequently asked"
            />
          </div>
          <motion.div
            className="lg:col-span-8 space-y-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {article.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  variants={revealItem}
                  className="bg-white border border-black/10 overflow-hidden transition duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-sm sm:text-base text-black font-normal pr-4">{faq.q}</span>
                    <span className="relative ml-4 w-4 h-4 shrink-0 flex items-center justify-center text-black/45" aria-hidden="true">
                      <Plus className={`absolute w-4 h-4 transition-all duration-300 ${isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} strokeWidth={1.5} />
                      <Minus className={`absolute w-4 h-4 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} strokeWidth={1.5} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        role="region"
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#708090] font-light leading-relaxed border-t border-black/[0.04]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* CLOSING CTA */}
      <motion.section
        className="py-28 px-6 max-w-3xl mx-auto text-center"
        variants={revealItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block mb-4">Begin Your Plans</span>
        <RevealHeading
          as="h2"
          className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight mb-6"
          text={article.closing.heading}
        />
        <p className="text-sm sm:text-base font-light text-[#708090] leading-relaxed max-w-xl mx-auto mb-10">
          {article.closing.body}
        </p>
        <button
          onClick={onEnquire}
          className="py-4 px-10 text-xs tracking-[0.25em] uppercase border border-black text-white bg-black hover:bg-neutral-900 transition active:scale-[0.98] cursor-pointer duration-300"
        >
          Enquire with Fantail Weddings &rarr;
        </button>
      </motion.section>
    </article>
  );
}
