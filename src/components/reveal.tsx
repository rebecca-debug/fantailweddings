import React from "react";
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
  amount = 0.5
}: RevealHeadingProps) {
  const words = text.split(" ");
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } }
  };
  const word = {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: LUX_EASE }
    }
  };
  const MotionTag = (motion as any)[as];
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
          aria-hidden="true"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

interface RevealImageProps {
  src: string;
  alt: string;
  id?: string;
  wrapClassName: string;
  parallax?: boolean;
  children?: React.ReactNode;
}

/**
 * RevealImage - a luxurious one-time entrance: the image rises, settles its scale,
 * and unblurs as it scrolls into view. Transform + opacity + filter only.
 */
export function RevealImage({
  src,
  alt,
  id,
  wrapClassName,
  children
}: RevealImageProps) {
  return (
    <div className={wrapClassName}>
      <motion.img
        src={src}
        alt={alt}
        id={id}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.08, y: 24, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1.2, ease: LUX_EASE }}
      />
      {children}
    </div>
  );
}
