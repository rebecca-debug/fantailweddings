import React, { useRef } from "react";
import { motion } from "motion/react";

// Based on the 21st.dev "Blur Fade" / Digital Serenity reveal aesthetic (blur + fade + upward stagger).
const LUX_EASE = [0.16, 1, 0.3, 1] as const;

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface RevealHeadingProps {
  text: string;
  className?: string;
  as?: HeadingTag;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
  /** "blur" (default) rises + unblurs; "slide" glides in from the side, no blur. */
  effect?: "blur" | "slide";
}

/**
 * RevealHeading - word-by-word blur + fade + rise, staggered on scroll into view.
 * Screen readers read the whole heading once (aria-label), words are aria-hidden.
 */
export function RevealHeading({
  text,
  className,
  as = "h2",
  delay = 0,
  stagger = 0.09,
  once = true,
  amount = 0.5,
  effect = "blur"
}: RevealHeadingProps) {
  const words = text.split(" ");
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } }
  };
  const word =
    effect === "slide"
      ? {
          hidden: { opacity: 0, x: 28 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.9, ease: LUX_EASE }
          }
        }
      : {
          hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: LUX_EASE }
          }
        };
  const MotionTag = (motion as any)[as];
  // aria-label is only valid on headings; on a span/p it is prohibited ARIA.
  const isHeading = /^h[1-6]$/.test(as);
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      aria-label={isHeading ? text : undefined}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
          aria-hidden={isHeading ? true : undefined}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

// ---- Spotlight (ReactBits-style): a soft radial glow that tracks the cursor across a card ----
// Driven by CSS custom properties set on the element directly, so no React re-render per move.
export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };
  return { ref, onMouseMove };
}

export function SpotlightGlow({
  color = "rgba(255,255,255,0.22)",
  radius = 340
}: {
  color?: string;
  radius?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color} 0%, transparent 65%)`
      }}
    />
  );
}

/** Wraps arbitrary content (e.g. a plain <img>) in a spotlight card. */
export function SpotlightCard({
  className = "",
  children,
  spotColor,
  radius
}: {
  className?: string;
  children: React.ReactNode;
  spotColor?: string;
  radius?: number;
}) {
  const { ref, onMouseMove } = useSpotlight();
  return (
    <div ref={ref} onMouseMove={onMouseMove} className={`group ${className}`}>
      {children}
      <SpotlightGlow color={spotColor} radius={radius} />
    </div>
  );
}

interface RevealImageProps {
  src: string;
  alt: string;
  id?: string;
  wrapClassName: string;
  parallax?: boolean;
  spotlight?: boolean;
  children?: React.ReactNode;
}

/**
 * RevealImage - a luxurious one-time entrance: the image rises, settles its scale,
 * and unblurs as it scrolls into view. Transform + opacity + filter only.
 * With `spotlight`, a cursor-following glow plays over the image on hover.
 */
export function RevealImage({
  src,
  alt,
  id,
  wrapClassName,
  spotlight,
  children
}: RevealImageProps) {
  const { ref, onMouseMove } = useSpotlight();
  return (
    <div
      className={`${wrapClassName}${spotlight ? " group" : ""}`}
      ref={spotlight ? ref : undefined}
      onMouseMove={spotlight ? onMouseMove : undefined}
    >
      <motion.img
        src={src}
        alt={alt}
        id={id}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.08, y: 24, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1.2, ease: LUX_EASE }}
      />
      {children}
      {spotlight && <SpotlightGlow />}
    </div>
  );
}
