import React, { useState } from "react";

// Adapted from the 21st.dev "Interactive Image Accordion / Selector": a row of image
// panels where the active panel expands and the others collapse to slim strips.
// Hover (desktop) or tap (touch) to select. Styled to Fantail's quiet palette.

interface InteractiveSelectorProps {
  images: string[];
  /** Max panels to show as strips (the row stays elegant with a curated few). */
  max?: number;
}

export default function InteractiveSelector({ images, max = 7 }: InteractiveSelectorProps) {
  const panels = images.slice(0, max);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex flex-row items-stretch justify-start md:justify-center gap-2 min-w-min">
        {panels.map((src, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              type="button"
              key={`${src}-${index}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show detail frame ${index + 1}`}
              aria-pressed={isActive}
              className={`relative h-[340px] sm:h-[440px] shrink-0 overflow-hidden bg-[#f4f3ef] border border-black/[0.05] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? "w-[260px] sm:w-[400px]" : "w-[48px] sm:w-[64px]"
              }`}
            >
              <img
                src={src}
                alt={`Wedding detail frame ${index + 1}`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive ? "bg-black/10" : "bg-black/30"
                }`}
              />
              <span
                className={`absolute font-mono uppercase tracking-widest text-white text-[10px] transition-all duration-500 ${
                  isActive
                    ? "bottom-4 left-1/2 -translate-x-1/2 rotate-0"
                    : "bottom-16 left-1/2 -translate-x-1/2 rotate-90 whitespace-nowrap"
                }`}
              >
                FR-{(index + 1).toString().padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
