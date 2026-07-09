import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// A single-row editorial filmstrip: frames share a uniform height and take their natural
// width, so portraits and landscapes both show in full - nothing is ever cropped. The row
// drags / scrolls sideways with the neighbouring frames peeking in. Click any frame to
// expand it. Styled to Fantail's palette.

const LUX_EASE = [0.16, 1, 0.3, 1] as const;

interface BentoGalleryProps {
  images: string[];
}

export default function BentoGallery({ images }: BentoGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);

  // Drag-to-scroll (works alongside native touch / trackpad / scrollbar)
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

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

  // Mouse drag-to-scroll. pointerdown on the strip, but move/up listen on window so the
  // drag keeps tracking even when the cursor leaves the strip. Touch is left to native
  // scrolling. A dominant vertical wheel scrolls the strip horizontally for mouse users.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.down) return;
      const dx = e.clientX - drag.current.startX;
      if (Math.abs(dx) > 3) drag.current.moved = true;
      el.scrollLeft = drag.current.startLeft - dx;
    };
    const onUp = () => {
      if (!drag.current.down) return;
      drag.current.down = false;
      el.style.cursor = "";
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return; // let the page scroll at the ends
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <>
      <div
        ref={scrollerRef}
        className="overflow-x-auto overflow-y-hidden pb-3 cursor-grab active:cursor-grabbing select-none"
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
      <p className="mt-2 text-[10px] tracking-[0.25em] uppercase font-mono text-[#5c6672]/70 select-none">
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
