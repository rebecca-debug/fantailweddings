import React, { useEffect } from "react";
import { motion } from "motion/react";
import { RevealHeading } from "./reveal";
import { JournalPost, PostBlock, getPostNeighbours } from "../journalPosts";

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

interface BlogArticleProps {
  post: JournalPost;
  onNavigate: (path: string) => void;
  onEnquire: () => void;
}

function Block({ block }: { block: PostBlock }) {
  if (block.type === "h") {
    return (
      <h2 className="font-serif text-2xl sm:text-3xl text-black font-light tracking-tight mt-14 mb-5 leading-snug">
        {block.text}
      </h2>
    );
  }
  if (block.type === "p") {
    return (
      <p
        className="text-[15px] sm:text-base text-[#5b6470] font-light leading-[1.85] mb-6"
        dangerouslySetInnerHTML={{ __html: block.html || "" }}
      />
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="mb-6 space-y-3">
        {(block.items || []).map((it, i) => (
          <li key={i} className="relative pl-6 text-[15px] sm:text-base text-[#5b6470] font-light leading-[1.8]">
            <span className="absolute left-0 top-[0.7em] h-[5px] w-[5px] rounded-full bg-[#997700]" />
            {it}
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="my-10 border-l-2 border-[#997700]/40 pl-6 py-1 font-serif text-xl sm:text-2xl italic text-black/75 leading-relaxed">
        {block.text}
      </blockquote>
    );
  }
  if (block.type === "img" && block.src) {
    return (
      <figure className="my-10 overflow-hidden rounded-sm bg-gray-100">
        <img src={block.src} alt={block.alt || ""} loading="lazy" referrerPolicy="no-referrer" className="w-full h-auto" />
      </figure>
    );
  }
  return null;
}

export default function BlogArticle({ post, onNavigate, onEnquire }: BlogArticleProps) {
  const { prev, next } = getPostNeighbours(post.path);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${post.title} | Fantail Weddings`;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    if (post.excerpt) meta?.setAttribute("content", post.excerpt);
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, [post]);

  // Intercept internal links inside the rendered prose so they route within the SPA.
  const onProseClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.startsWith("/")) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <article className="pt-16 md:pt-20 bg-[#f7f7f7]">
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <button
          onClick={() => onNavigate("/journal/")}
          className="group text-[10px] tracking-[0.25em] uppercase text-[#708090] hover:text-black transition inline-flex items-center"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> The Journal
        </button>
      </div>

      {/* Title block */}
      <header className="max-w-3xl mx-auto px-6 pt-8 pb-10 text-center">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#997700] font-light block mb-5">
          {post.category} &middot; {post.dateDisplay}
        </span>
        <RevealHeading
          as="h1"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black font-light tracking-tight leading-[1.15]"
          text={post.title}
          amount={0.4}
        />
      </header>

      {/* Hero */}
      {post.hero && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: LUX_EASE }}
          className="max-w-5xl mx-auto px-6"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-gray-100 shadow-sm">
            <img src={post.hero} alt={post.title} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </motion.div>
      )}

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-16" onClick={onProseClick}>
        {post.blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>

      {/* Enquire CTA */}
      <div className="max-w-3xl mx-auto px-6 pb-16 text-center">
        <div className="border-t border-black/10 pt-12">
          <p className="font-serif text-xl sm:text-2xl italic text-black/80 font-light mb-6 leading-relaxed">
            Planning a South Island wedding of your own?
          </p>
          <button
            onClick={onEnquire}
            className="py-4 px-10 text-xs tracking-[0.25em] uppercase border border-black text-white bg-black hover:bg-neutral-900 transition active:scale-[0.98] cursor-pointer duration-300"
          >
            Enquire with Fantail Weddings &rarr;
          </button>
        </div>
      </div>

      {/* Prev / Next */}
      <nav className="border-t border-black/10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2">
          <button
            onClick={() => prev && onNavigate(prev.path)}
            disabled={!prev}
            className="group text-left px-6 sm:px-10 py-10 border-b sm:border-b-0 sm:border-r border-black/10 hover:bg-[#f7f7f7] transition disabled:opacity-30 disabled:pointer-events-none"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#708090] block mb-2">&larr; Older</span>
            <span className="font-serif text-base sm:text-lg text-black font-light leading-snug line-clamp-2">
              {prev ? prev.title : "—"}
            </span>
          </button>
          <button
            onClick={() => next && onNavigate(next.path)}
            disabled={!next}
            className="group text-right px-6 sm:px-10 py-10 hover:bg-[#f7f7f7] transition disabled:opacity-30 disabled:pointer-events-none"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#708090] block mb-2">Newer &rarr;</span>
            <span className="font-serif text-base sm:text-lg text-black font-light leading-snug line-clamp-2">
              {next ? next.title : "—"}
            </span>
          </button>
        </div>
      </nav>
    </article>
  );
}
