import React, { useEffect, useMemo, useState } from "react";
import { RevealHeading } from "./reveal";
import { JOURNAL_ARTICLES, JournalPage } from "../journal";
import { JOURNAL_POSTS } from "../journalPosts";

interface JournalIndexProps {
  onOpenArticle: (page: JournalPage) => void;
  onOpenPost: (path: string) => void;
  hrefFor: (pageOrPath: string) => string;
}

// Real <a> link that routes client-side on plain click but lets modifier-clicks open a new tab.
const spaNav = (e: React.MouseEvent, run: () => void) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  run();
};

export default function JournalIndex({ onOpenArticle, onOpenPost, hrefFor }: JournalIndexProps) {
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    const prev = document.title;
    document.title = "The Journal | Fantail Weddings | South Island Wedding Guides";
    return () => {
      document.title = prev;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    JOURNAL_POSTS.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const posts = useMemo(
    () => (filter === "All" ? JOURNAL_POSTS : JOURNAL_POSTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="pt-28 pb-12 bg-[#f7f7f7] min-h-[100dvh]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-14 text-center lg:text-left">
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
          Quiet guides to marrying across the South Island: the venues I love, how the seasons feel, and the
          logistics worth knowing before you arrive.
        </p>
      </div>

      {/* Featured location guides */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light block mb-7">
          Featured Location Guides
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {JOURNAL_ARTICLES.map((article) => (
            <a
              key={article.page}
              href={hrefFor(article.page)}
              onClick={(e) => spaNav(e, () => onOpenArticle(article.page))}
              className="group text-left block"
              aria-label={`Read the ${article.navLabel} guide`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 mb-5">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[9px] tracking-[0.25em] uppercase text-black">
                  Guide
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-black font-light tracking-tight mb-2">
                {article.navLabel}
              </h3>
              <p className="text-sm text-[#708090] font-light leading-relaxed max-w-md mb-3">{article.cardSummary}</p>
              <span className="text-[10px] tracking-[0.25em] uppercase text-black border-b border-black pb-1 inline-flex items-center font-light group-hover:opacity-70 transition">
                Read the guide
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* All articles */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8 border-t border-black/10 pt-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#997700] font-light">All Articles</span>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase border transition ${
                  filter === c
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-[#708090] border-black/15 hover:border-black/40 hover:text-black"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((p) => (
            <a
              key={p.path}
              href={hrefFor(p.path)}
              onClick={(e) => spaNav(e, () => onOpenPost(p.path))}
              className="group text-left flex flex-col"
              aria-label={`Read: ${p.title}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-4">
                {p.hero && (
                  <img
                    src={p.hero}
                    alt={p.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                )}
              </div>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#997700] font-light block mb-2">
                {p.category} &middot; {p.dateDisplay}
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-black font-normal tracking-tight leading-snug mb-2 group-hover:text-black/70 transition">
                {p.title}
              </h3>
              <p className="text-xs text-[#708090] font-light leading-relaxed line-clamp-3">{p.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
