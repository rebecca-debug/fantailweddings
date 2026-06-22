import React, { useEffect } from "react";
import { motion } from "motion/react";
import { RevealHeading } from "./reveal";
import { JOURNAL_ARTICLES, JournalPage } from "../journal";

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

interface JournalIndexProps {
  onOpenArticle: (page: JournalPage) => void;
}

export default function JournalIndex({ onOpenArticle }: JournalIndexProps) {
  useEffect(() => {
    const prev = document.title;
    document.title = "The Journal | Fantail Weddings | South Island Wedding Guides";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="pt-28 pb-12 bg-[#f7f7f7] min-h-[100dvh]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center lg:text-left">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#708090] font-light block mb-3">
          Field Notes from the South Island
        </span>
        <RevealHeading
          as="h2"
          className="font-serif text-4xl sm:text-5xl text-black font-light tracking-tight mb-4"
          text="The Journal"
        />
        <div className="h-[1px] bg-black/10 w-24 my-6 mx-auto lg:mx-0"></div>
        <p className="text-sm font-light text-[#708090] max-w-2xl leading-relaxed">
          Quiet guides to marrying across the South Island: the venues I love, how the seasons feel,
          and the logistics worth knowing before you arrive. More guides are on the way.
        </p>
      </div>

      {/* Article cards */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {JOURNAL_ARTICLES.map((article) => (
            <motion.button
              key={article.page}
              type="button"
              onClick={() => onOpenArticle(article.page)}
              className="group text-left"
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: LUX_EASE } }
              }}
              aria-label={`Read the ${article.navLabel} guide`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-6">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#708090] font-mono block mb-2">
                South Island Guide
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-black font-light tracking-tight mb-3">
                {article.navLabel}
              </h3>
              <p className="text-sm text-[#708090] font-light leading-relaxed max-w-md mb-4">
                {article.cardSummary}
              </p>
              <span className="text-[10px] tracking-[0.25em] uppercase text-black border-b border-black pb-1 inline-flex items-center font-light group-hover:opacity-70 transition">
                Read the guide
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </span>
            </motion.button>
          ))}

          {/* More coming */}
          <motion.div
            className="flex flex-col justify-center border border-dashed border-black/15 p-10 text-center"
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: LUX_EASE } }
            }}
          >
            <span className="font-serif text-xl italic text-black/50 mb-2">More guides, soon</span>
            <p className="text-xs text-[#708090] font-light leading-relaxed max-w-xs mx-auto">
              Elopement and venue guides for Lake Tekapo, Fiordland, the Mackenzie, and beyond are being
              written. The monthly letter shares them first.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
