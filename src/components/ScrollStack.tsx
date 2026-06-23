import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { SpotlightCard } from "./reveal";

// Scroll Stack (ReactBits-style): cards pin near the top and pile into a deck as you scroll,
// each one receding slightly (scale + a touch of shade) as the next stacks over it. Themed to
// Fantail's editorial palette. Driven by Motion scroll values for a smooth, GPU-friendly feel.

export interface ScrollStackItemData {
  id: string | number;
  step: string;
  image: string;
  title: string;
  description: string;
}

const STACK_TOP = 112; // px from viewport top where cards pin (clears the fixed header)
const ITEM_OFFSET = 18; // px each successive card sits lower, revealing the strip beneath

function StackCard({
  item,
  index,
  total,
  progress
}: {
  item: ScrollStackItemData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // The card recedes as the next one stacks over it; the final card stays full.
  const center = (index + 1) / total;
  const start = Math.max(0, center - 0.16);
  const end = Math.min(1, center + 0.02);
  const scale = useTransform(progress, [start, end], [1, 0.93], { clamp: true });
  const dim = useTransform(progress, [start, end], [0, 0.16], { clamp: true });

  return (
    <motion.div
      className="sticky"
      style={{ top: STACK_TOP + index * ITEM_OFFSET, zIndex: index + 1, scale, transformOrigin: "50% 0%" }}
    >
      <div className="relative overflow-hidden rounded-sm bg-[#fbfbf9] border border-black/[0.07] shadow-[0_22px_60px_-26px_rgba(0,0,0,0.45)]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <SpotlightCard className="relative aspect-[16/11] md:aspect-auto md:min-h-[400px] overflow-hidden bg-gray-100">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </SpotlightCard>

          {/* Text */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-serif text-4xl italic text-black/15 font-light leading-none">{item.step}</span>
              <span className="text-[9px] tracking-widest text-[#708090] font-mono">PHASE {item.step}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-black font-light italic tracking-tight mb-4 leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-[#708090] font-light leading-relaxed">{item.description}</p>
          </div>
        </div>

        {/* Recede shade for the cards behind the front of the deck */}
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: dim }} />
      </div>
    </motion.div>
  );
}

export default function ScrollStack({ items }: { items: ScrollStackItemData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-4xl">
      <div className="space-y-6 sm:space-y-8">
        {items.map((item, i) => (
          <StackCard key={item.id} item={item} index={i} total={items.length} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}
