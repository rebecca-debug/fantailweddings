import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import BentoGallery from "./BentoGallery";
import InteractiveSelector from "./InteractiveSelector";
import { RevealHeading } from "./reveal";

// Image sets compiled from user-provided slide archives and custom images
const SLIDER_ONE_IMAGES = [
  "/assets/images/slide_-01.jpg",
  "/assets/images/slide-02.jpg",
  "/assets/images/slide-02-1.jpg",
  "/assets/images/slide-03.jpg",
  "/assets/images/slide-04.jpg",
  "/assets/images/slide-05.jpg",
  "/assets/images/slide-06.jpg",
  "/assets/images/slide-07.jpg",
  "/assets/images/slide-08.jpg",
  "/assets/images/slide-09.jpg",
  "/assets/images/slide-10.jpg",
  "/assets/images/BONNIE_JENKINS_621-BJ_9149.jpg",
  "/assets/images/Alpine-Elopement-NZ.jpg",
  "/assets/images/intimate-weddings.jpg",
  "/assets/images/slide-11.jpg",
  "/assets/images/slide-12.jpg",
  "/assets/images/slide-13.jpg",
  "/assets/images/slide-14.jpg",
  "/assets/images/slide-15.jpg",
  "/assets/images/slide-16.jpg",
  "/assets/images/slide-17.jpg",
  "/assets/images/slide-18.jpg",
  "/assets/images/slide-19.jpg",
  "/assets/images/slide-20.jpg",
  "/assets/images/slide-21.jpg",
  "/assets/images/reshma-richard-wedding-259.jpg"
];

const SLIDER_TWO_IMAGES = [
  "/assets/images/10994068_692647977504658_6745400731444123953_n.jpg",
  "/assets/images/12794456_692647987504657_1333425036244180943_n.jpg",
  "/assets/images/171230_ML_WEB_442.jpg",
  "/assets/images/180303_Alix_and_Kwan29358.jpg",
  "/assets/images/180303_Alix_and_Kwan29376.jpg",
  "/assets/images/180303_Alix_and_Kwan29544.jpg",
  "/assets/images/190_BONNIE_JENKINS-WANAKA_WEDDING_6392.jpg",
  "/assets/images/230708_AM_WEB_326.jpg",
  "/assets/images/230708_AM_WEB_435.jpg",
  "/assets/images/565-DSC_4811.jpg",
  "/assets/images/A-J-713.jpg",
  "/assets/images/AIC-17.jpg",
  "/assets/images/AIC_NA__273_websize.jpg",
  "/assets/images/SaraMark_SPEdits-10_websize.jpg",
  "/assets/images/SaraMark_SPEdits-62.jpg",
  "/assets/images/SaraMark_SPEdits-63_websize.jpg",
  "/assets/images/Service-03.jpg",
  "/assets/images/WEB_447_BJ_0702.jpg",
  "/assets/images/Wanaka_Wedding_Criffel_Station_NewZealand_061.jpg",
  "/assets/images/guests-enjoying-lunch.jpg",
  "/assets/images/indian-culture.jpg",
  "/assets/images/reshma-richard-wedding-383.jpg",
  "/assets/images/your-guests.jpg"
];

interface InfiniteAutoplaySliderProps {
  images: string[];
  direction?: "left" | "right";
}

export function InfiniteAutoplaySlider({ images, direction = "left" }: InfiniteAutoplaySliderProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic responsive viewport sizing
  useEffect(() => {
    const updateVisibleCount = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 768) {
        setVisibleCount(2);
      } else if (width < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    const observer = new ResizeObserver(updateVisibleCount);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
      observer.disconnect();
    };
  }, []);

  // Triple the array to create absolute seamless infinite loops in both directions
  const displayImages = [...images, ...images, ...images];
  const offsetIndex = images.length + currentIndex;

  // Autoplay moves strictly in the designated direction, transitioning every 2.2 seconds!
  // Pauses while the viewer is hovering or focused inside the slider.
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      if (direction === "left") {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex((prev) => prev - 1);
      }
    }, 2200);

    return () => clearInterval(timer);
  }, [direction, isPaused]);

  // When transition completes, snap instantly back to snap coordinates without animation
  const handleTransitionEnd = () => {
    if (currentIndex >= images.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - images.length);
    } else if (currentIndex <= -images.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + images.length);
    }
  };

  const slideLeft = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const slideRight = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full group overflow-hidden py-2 select-none"
      id="continuous-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Slider View Glass Frame */}
      <div className="overflow-hidden w-full relative" id="slider-view-viewport">
        <div
          className="flex"
          style={{
            transform: `translateX(-${(offsetIndex * 100) / visibleCount}%)`,
            transition: isTransitioning
              ? "transform 800ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
          id="slider-moving-track"
        >
          {displayImages.map((imgSrc, idx) => {
            const originalIndex = idx % images.length;
            return (
              <div
                key={`${imgSrc}-${idx}`}
                className="px-2 md:px-3 shrink-0"
                style={{ width: `${100 / visibleCount}%` }}
                id={`slider-item-card-${idx}`}
              >
                {/* Elegant subtle stone/warm background color setup to pad mixed formats beautifully */}
                <div
                  className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] w-full bg-[#f4f3ef] border border-black/[0.04] shadow-sm hover:shadow-md hover:scale-[1.02] transition duration-500 flex items-center justify-center overflow-hidden"
                  id={`image-frame-${idx}`}
                >
                  <img
                    src={imgSrc}
                    alt={`Bespoke Celebration Frame ${originalIndex + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-2 select-none pointer-events-none"
                    loading="lazy"
                  />
                  {/* Premium minimal elegant identifier tag */}
                  <span className="absolute bottom-2 right-3 font-mono text-[8px] tracking-widest text-[#708090]/80">
                    FR-{(originalIndex + 1).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Control Overlays on Hover */}
      <button
        onClick={slideLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white text-black rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
        aria-label="Previous Slide Frame"
        id="btn-prev-slide"
      >
        ←
      </button>
      <button
        onClick={slideRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white text-black rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
        aria-label="Next Slide Frame"
        id="btn-next-slide"
      >
        →
      </button>
    </div>
  );
}

interface PortfolioViewProps {
  onBackToHome: (targetSection: string) => void;
}

export default function PortfolioView({ onBackToHome }: PortfolioViewProps) {
  return (
    <div className="pt-28 pb-12 bg-[#f7f7f7] min-h-screen" id="portfolio-view-surface">
      {/* Editorial Page Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center lg:text-left transition" id="portfolio-page-header">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#708090] font-light block mb-3">
          Curated South Island Memoirs
        </span>
        <RevealHeading as="h2" className="font-serif text-4xl sm:text-5xl text-black font-light tracking-tight mb-4" text="The Portfolio" />
        <div className="h-[1px] bg-black/10 w-24 my-6 mx-auto lg:mx-0"></div>
        <p className="text-sm font-light text-[#708090] max-w-2xl leading-relaxed">
          I plan, curate and produce weddings for couples who want their celebration to feel like a beautiful, honest conversation. Below are two archives representing the quiet craftsmanship of recent celebrations across a country I love.
        </p>
      </div>

      {/* PORTFOLIO SECTION ONE: SLIDER ONE */}
      <section className="max-w-7xl mx-auto px-6 mb-24" id="portfolio-archive-one">
        <div className="space-y-8" id="portfolio-archive-one-content">
          {/* Header block adjusted to match wide canvas */}
          <div className="max-w-3xl text-left space-y-4" id="portfolio-archive-one-intro">
            <div>
              <span className="text-[10px] tracking-[5px] uppercase font-mono text-[#708090] block mb-2">
                ARCHIVE ONE
              </span>
              <RevealHeading as="h3" className="font-serif text-2xl sm:text-3xl text-black font-normal leading-tight" text="Intimate Gatherings & Elopements" />
              <p className="text-[11px] tracking-widest font-mono uppercase text-black/50 mt-1">
                South Island Love Stories
              </p>
            </div>
            
            <p className="text-xs sm:text-sm font-light text-[#708090] leading-relaxed max-w-2xl">
              Quiet details, honest laughter, and couples that romantically put themselves and their guests first. These celebrations are small, capacity-limited, and deeply felt.
            </p>
          </div>

          {/* Interactive bento gallery - click any frame to expand */}
          <div className="w-full-canvas pt-2" id="portfolio-slider-one-wrapper">
            <BentoGallery images={SLIDER_ONE_IMAGES} />
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION TWO: SLIDER TWO */}
      <section className="max-w-7xl mx-auto px-6 mb-24" id="portfolio-archive-two">
        <div className="space-y-8" id="portfolio-archive-two-content">
          {/* Header block adjusted to match wide canvas */}
          <div className="max-w-3xl text-left space-y-4" id="portfolio-archive-two-intro">
            <div>
              <span className="text-[10px] tracking-[5px] uppercase font-mono text-[#708090] block mb-2">
                ARCHIVE TWO
              </span>
              <RevealHeading as="h3" className="font-serif text-2xl sm:text-3xl text-black font-normal leading-tight" text="Details, Details & Details" />
              <p className="text-[11px] tracking-widest font-mono uppercase text-black/50 mt-1">
                All the touches to make it personal
              </p>
            </div>
            
            <p className="text-xs sm:text-sm font-light text-[#708090] leading-relaxed max-w-2xl">
              A record of moments that come together after refinement in a planning process, etched in love. These represent the essence of deep presence, rooted in a country I love.
            </p>
          </div>

          {/* Interactive selector - hover or tap a strip to expand it */}
          <div className="w-full-canvas pt-2" id="portfolio-slider-two-wrapper">
            <InteractiveSelector images={SLIDER_TWO_IMAGES} />
          </div>
        </div>
      </section>

      {/* Back to main home CTA section */}
      <div className="text-center pt-12 pb-8 border-t border-black/[0.05] max-w-7xl mx-auto px-6" id="portfolio-back-cta-wrapper">
        <button
          onClick={() => onBackToHome("services")}
          className="text-xs tracking-[0.25em] uppercase text-black font-light border border-black px-8 py-4 hover:bg-black hover:text-white transition cursor-pointer"
          id="btn-back-to-planning"
        >
          View Planning Services
        </button>
      </div>
    </div>
  );
}

