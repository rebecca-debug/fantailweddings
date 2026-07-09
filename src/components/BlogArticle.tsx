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
  switch (block.type) {
    case "h":
      return (
        <h2 className="font-serif text-2xl sm:text-3xl text-black font-light tracking-tight mt-16 mb-5 leading-snug">
          {block.text}
        </h2>
      );
    case "lede":
      return <p className="text-lg sm:text-xl text-[#4a5360] font-light leading-[1.7] mb-7">{block.text}</p>;
    case "p":
      return block.html ? (
        <p
          className="text-[15px] sm:text-base text-[#5b6470] font-light leading-[1.85] mb-6"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      ) : (
        <p className="text-[15px] sm:text-base text-[#5b6470] font-light leading-[1.85] mb-6">{block.text}</p>
      );
    case "ul":
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
    case "statements":
      return (
        <ul className="my-8 space-y-5">
          {(block.items || []).map((it, i) => (
            <li key={i} className="relative pl-7 text-base sm:text-[17px] text-[#4a5360] font-light leading-[1.7]">
              <span className="absolute left-0 top-[0.7em] h-[1px] w-4 bg-[#997700]" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-[#997700]/40 pl-6 py-1 font-serif text-xl sm:text-2xl italic text-black/75 leading-relaxed">
          {block.text}
        </blockquote>
      );
    case "pullquote":
      return (
        <figure className="my-12 sm:my-14 text-center max-w-2xl mx-auto">
          <span className="block w-10 h-[1px] bg-[#997700]/50 mx-auto mb-6" />
          <blockquote className="font-serif text-2xl sm:text-3xl italic text-black/80 leading-snug">
            {block.text}
          </blockquote>
          <span className="block w-10 h-[1px] bg-[#997700]/50 mx-auto mt-6" />
        </figure>
      );
    case "callout":
      return (
        <aside className="my-10 bg-[#f3eee2]/60 border-l-2 border-[#997700] px-6 sm:px-8 py-6 sm:py-7">
          {block.label && (
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#997700] font-medium mb-3">{block.label}</div>
          )}
          <p className="font-serif text-lg sm:text-xl italic text-black/80 leading-relaxed">{block.text}</p>
        </aside>
      );
    case "steps":
      return (
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {(block.steps || []).map((st, i) => (
            <div key={i} className="bg-white border border-black/[0.07] p-6 sm:p-7 flex flex-col">
              <span className="font-serif text-2xl italic text-[#997700]/70 font-light leading-none mb-3">
                {st.n || (i + 1).toString().padStart(2, "0")}
              </span>
              <h4 className="font-serif text-lg text-black font-normal mb-2 leading-snug">{st.title}</h4>
              <p className="text-sm text-[#5b6470] font-light leading-relaxed">{st.body}</p>
            </div>
          ))}
        </div>
      );
    case "columns":
      return (
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {(block.columns || []).map((col, ci) => (
            <div key={ci} className="bg-white border border-black/[0.07] p-6 sm:p-8">
              <h4 className="font-serif text-lg sm:text-xl italic text-black font-normal mb-5">{col.title}</h4>
              <ul className="space-y-3.5">
                {col.items.map((it, i) => (
                  <li key={i} className="relative pl-6 text-sm sm:text-[15px] text-[#5b6470] font-light leading-relaxed">
                    <span className="absolute left-0 top-[0.55em] h-[5px] w-[5px] rounded-full bg-[#997700]/70" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "img":
      return block.src ? (
        <figure className="my-10 overflow-hidden rounded-sm bg-gray-100">
          <img src={block.src} alt={block.alt || ""} loading="lazy" referrerPolicy="no-referrer" className="w-full h-auto" />
        </figure>
      ) : null;
    default:
      return null;
  }
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

  // Real <a> link that routes client-side on plain click, but lets modifier-clicks open a new tab.
  const navClick = (path: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <article className="pt-16 md:pt-20 bg-[#f7f7f7]">
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <a
          href="/journal/"
          onClick={navClick("/journal/")}
          className="group text-[10px] tracking-[0.25em] uppercase text-[#5c6672] hover:text-black transition inline-flex items-center"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> The Journal
        </a>
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
        {post.subtitle && (
          <motion.p
            className="mt-6 font-serif text-lg sm:text-xl italic text-[#5c6672] font-light leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: LUX_EASE }}
          >
            {post.subtitle}
          </motion.p>
        )}
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
            <motion.img
              src={post.hero}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
              initial={{ scale: 1.04 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
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
          <a
            href={prev ? prev.path : undefined}
            onClick={prev ? navClick(prev.path) : undefined}
            aria-disabled={!prev}
            className={`group text-left px-6 sm:px-10 py-10 border-b sm:border-b-0 sm:border-r border-black/10 transition ${
              prev ? "hover:bg-[#f7f7f7]" : "opacity-30 pointer-events-none"
            }`}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#5c6672] block mb-2">&larr; Older</span>
            <span className="font-serif text-base sm:text-lg text-black font-light leading-snug line-clamp-2">
              {prev ? prev.title : "·"}
            </span>
          </a>
          <a
            href={next ? next.path : undefined}
            onClick={next ? navClick(next.path) : undefined}
            aria-disabled={!next}
            className={`group text-right px-6 sm:px-10 py-10 transition ${
              next ? "hover:bg-[#f7f7f7]" : "opacity-30 pointer-events-none"
            }`}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#5c6672] block mb-2">Newer &rarr;</span>
            <span className="font-serif text-base sm:text-lg text-black font-light leading-snug line-clamp-2">
              {next ? next.title : "·"}
            </span>
          </a>
        </div>
      </nav>
    </article>
  );
}
