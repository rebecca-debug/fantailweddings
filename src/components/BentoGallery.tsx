import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// A single-row editorial filmstrip: frames share a uniform height and take their natural
// width, so portraits and landscapes both show in full — nothing is ever cropped. The row
// drags / scrolls sideways with the neighbouring frames peeking in. Click any frame to
// expand it. Styled to Fantail's palette.

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

interface BentoGalleryProps {
  images: string[];
}

export default function BentoGallery({ images }: BentoGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);

  // Drag-to-scroll with pointer capture (works alongside native touch / trackpad / scrollbar)
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false, id: -1 });

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false, id: e.pointerId };
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!drag.current.down || !el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (el && drag.current.id !== -1) {
      try {
        el.releasePointerCapture(drag.current.id);
      } catch {
        /* no-op */
      }
    }
    drag.current.down = false;
    drag.current.id = -1;
  };

  return (
    <>
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="overflow-x-auto overflow-y-hidden pb-3 cursor-grab active:cursor-grabbing select-none snap-x snap-proximity"
        style={{ scrollbarWidth: "thin", touchAction: "pan-x" }}
      >
        <motion.div
          className="flex gap-4 w-max items-stretch"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          animate="visible"
        >
          {images.map((src, index) => (
            <motion.button
              type="button"
              key={`${src}-${index}`}
              className="group relative shrink-0 snap-center overflow-hidden bg-[#f4f3ef] border border-black/[0.05] cursor-pointer h-[58vw] max-h-[420px] sm:h-[560px] min-w-[220px]"
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.97 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: LUX_EASE } }
              }}
              onClick={() => {
                if (!drag.current.moved) setSelected(src);
              }}
              aria-label={`View celebration frame ${index + 1}`}
            >
              <img
                src={src}
                alt={`Bespoke celebration frame ${index + 1}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                referrerPolicy="no-referrer"
                className="block h-full w-auto max-w-none object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.button>
          ))}
        </motion.div>
      </div>
      <p className="mt-2 text-[10px] tracking-[0.25em] uppercase font-mono text-[#708090]/70 select-none">
        Drag or scroll to explore more &rarr;
      </p>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded photograph"
          >
            <motion.img
              src={selected}
              alt="Expanded celebration photograph"
              referrerPolicy="no-referrer"
              initial={{ scale: 0.94, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ duration: 0.5, ease: LUX_EASE }}
              className="max-h-[90vh] max-w-[92vw] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelected(null)}
              aria-label="Close photograph"
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/85 hover:bg-white text-black transition"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
