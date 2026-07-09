import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X } from "lucide-react";

// Adapted from the 21st.dev "Video Thumbnail Player": a poster card with a play button
// that opens a modal lightbox playing an embedded Vimeo film. Behind the play button a
// muted, looping Vimeo preview autoplays (lazily, once in view) so the still comes alive
// and entices the click. Styled to Fantail's palette.

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

interface FilmCardProps {
  thumbnail: string;
  /** Vimeo numeric id */
  vimeoId: string;
  title: string;
  meta: string;
}

export default function FilmCard({ thumbnail, vimeoId, title, meta }: FilmCardProps) {
  const [open, setOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Honour reduced-motion: no autoplaying preview, just the still poster.
  const prefersReduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mount the muted background preview only once the card scrolls near view.
  useEffect(() => {
    if (prefersReduced || !cardRef.current) return;
    const el = cardRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "250px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReduced]);

  // Fail-safe reveal: only show the preview once Vimeo actually starts playing it.
  // If the embed is blocked, no play event arrives and the poster simply stays.
  useEffect(() => {
    if (!inView || prefersReduced) return;
    const onMsg = (e: MessageEvent) => {
      if (typeof e.origin === "string" && e.origin.indexOf("vimeo.com") === -1) return;
      let data: any = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (data && (data.event === "play" || data.event === "playing" || data.event === "bufferend")) {
        setPreviewReady(true);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [inView, prefersReduced]);

  // Subscribe to the player's play events once the preview iframe has loaded.
  const handlePreviewLoad = () => {
    const w = iframeRef.current?.contentWindow;
    if (!w) return;
    ["play", "playing", "bufferend"].forEach((ev) =>
      w.postMessage(JSON.stringify({ method: "addEventListener", value: ev }), "https://player.vimeo.com")
    );
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // background=1 gives a clean muted, looping, chrome-free autoplay loop for the preview.
  const previewUrl = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&dnt=1`;
  const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;

  return (
    <>
      <button
        ref={cardRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play the film: ${title}`}
        className="group relative block w-full overflow-hidden bg-[#f4f3ef] border border-black/[0.05] cursor-pointer text-left"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {/* Poster (instant, and the fallback while the preview loads) */}
          <img
            src={thumbnail}
            alt={`${title}, a Fantail Weddings film`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Muted, looping background preview - fades in over the poster once playing */}
          {inView && !prefersReduced && (
            <div
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
                previewReady ? "opacity-100" : "opacity-0"
              }`}
            >
              <iframe
                ref={iframeRef}
                src={previewUrl}
                title={`${title} preview`}
                tabIndex={-1}
                onLoad={handlePreviewLoad}
                className="pointer-events-none absolute inset-0 w-full h-full"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/5 transition-opacity duration-500 group-hover:from-black/65" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/60 bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25">
              <Play className="h-6 w-6 fill-white text-white ml-1" strokeWidth={1} />
            </span>
          </div>
          {/* Caption */}
          <div className="absolute left-0 bottom-0 p-6 text-white">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/80 font-light block mb-1.5">{meta}</span>
            <h4 className="font-serif text-2xl sm:text-3xl font-light leading-tight">{title}</h4>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} film`}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close film"
              className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: LUX_EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
