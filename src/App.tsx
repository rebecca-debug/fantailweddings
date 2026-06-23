/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Award, Plus, Minus, Menu, X } from "lucide-react";
import { RevealHeading } from "./components/reveal";
import { RevealImage } from "./components/reveal";
import {
  SERVICES_DATA,
  TIMELINE_DATA,
  ABOUT_FACTS,
  FAQ_DATA,
  Service,
  TimelinePoint,
  FAQ
} from "./data";
import PortfolioView from "./components/PortfolioView";
import JournalArticle from "./components/JournalArticle";
import JournalIndex from "./components/JournalIndex";
import { JOURNAL_ARTICLES, getArticleByPage, JournalPage } from "./journal";
import { JOURNAL_POSTS, POST_PATHS, getPostByPath } from "./journalPosts";
import BlogArticle from "./components/BlogArticle";
import WeddingNavigator from "./components/WeddingNavigator";

// ---- Shared motion vocabulary (one calm easing + slow, small-travel reveals) ----
const LUX_EASE = [0.16, 1, 0.3, 1] as const;

const revealItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: LUX_EASE } }
};

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } }
};

// Reveal a single block as it scrolls into view (auto-disabled under reduced motion via MotionConfig)
function Reveal({
  children,
  className = "",
  amount = 0.25
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={revealItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

// A thin divider that draws itself in from the left as it enters view
function DrawDivider() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        className="h-[1px] bg-black/10 w-full origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: LUX_EASE }}
      />
    </div>
  );
}

// A portrait image with a subtle scroll parallax. The image is slightly oversized so the
// vertical drift never exposes an edge.
function ParallaxImage({
  src,
  alt,
  wrapClassName,
  id,
  children
}: {
  src: string;
  alt: string;
  wrapClassName: string;
  id?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return (
    <div ref={ref} className={wrapClassName}>
      <motion.img
        src={src}
        alt={alt}
        id={id}
        style={{ y }}
        className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover"
        referrerPolicy="no-referrer"
      />
      {children}
    </div>
  );
}

export default function App() {
  // SEO and Headings setup
  useEffect(() => {
    document.title = "Fantail Weddings | Boutique Wedding Planning | South Island NZ";

    // Set meta tags dynamically
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Elopements, intimate weddings to 60 guests, and an online consultancy for couples planning their own wedding. Boutique, capacity-limited wedding planning in Aotearoa New Zealand."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Elopements, intimate weddings to 60 guests, and an online consultancy for couples planning their own wedding. Boutique, capacity-limited wedding planning in Aotearoa New Zealand.";
      document.head.appendChild(meta);
    }

    // Set keywords
    const metaKeywords = document.createElement("meta");
    metaKeywords.name = "keywords";
    metaKeywords.content =
      "destination wedding New Zealand, South Island wedding planner, Wanaka wedding planner, Queenstown wedding planner, intimate wedding New Zealand, boutique wedding planner, NZ elopement planner, online wedding planner New Zealand, wedding planning consultant NZ, concierge wedding planning";
    document.head.appendChild(metaKeywords);

    // Set LocalBusiness JSON-LD schema
    const schemaId = "local-business-jsonld";
    let schemaScript = document.getElementById(schemaId) as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = schemaId;
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Fantail Weddings",
      "image": "https://fantailweddings.co.nz/assets/images/slide_-01.jpg",
      "@id": "https://fantailweddings.co.nz/#localbusiness",
      "url": "https://fantailweddings.co.nz",
      "telephone": "+64274672126",
      "email": "rebecca@fantailweddings.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Wanaka",
        "addressRegion": "Otago / wider South Island",
        "addressCountry": "NZ"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -44.7032,
        "longitude": 169.1321
      },
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "South Island, New Zealand"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Wanaka"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Queenstown"
        }
      ],
      "description": "Bespoke wedding planning, curated elopements, intimate celebrations up to 60 guests, and online consultancy services across the scenic South Island of New Zealand.",
      "sameAs": [
        "https://www.instagram.com/fantail_weddings/",
        "https://www.facebook.com/FantailWeddings",
        "https://nz.pinterest.com/fantailwed/",
        "https://www.youtube.com/@Fantailweddings"
      ]
    });
  }, []);

  // Form states
  const [formData, setFormData] = useState({
    names: "",
    email: "",
    location: "",
    helpType: "",
    dateTiming: "",
    guestCount: "",
    regionDrawn: "",
    story: "",
    source: ""
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // FAQ states - open one at a time (Showit style accordion)
  const [openFaqId, setOpenFaqId] = useState<string | null>("fq-01");

  // Track active navigation section
  const [activeSection, setActiveSection] = useState("hero");

  // Navigation page views & custom modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const contactFormRef = useRef<HTMLDivElement>(null);

  // ---- Lightweight URL router: real paths that mirror the previous website's slugs ----
  const PAGE_PATHS: Record<string, string> = {
    home: "/",
    portfolio: "/portfolio/",
    "journal-index": "/journal/",
    "wedding-navigator": "/the-wedding-navigator/",
    "journal-queenstown": "/queenstown-wedding-planner/",
    "journal-wanaka": "/nz-wanaka-wedding-planner/"
  };
  const pathForPage = (page: string): string =>
    PAGE_PATHS[page] || (page.startsWith("/") ? page : "/");
  const pageForPath = (pathname: string): string => {
    let p = pathname || "/";
    if (p.length > 1 && !p.endsWith("/")) p += "/";
    const hit = Object.keys(PAGE_PATHS).find((k) => PAGE_PATHS[k] === p);
    if (hit) return hit;
    if (POST_PATHS.includes(p)) return p;
    return "home";
  };

  const [currentPage, setCurrentPage] = useState<string>(() =>
    typeof window !== "undefined" ? pageForPath(window.location.pathname) : "home"
  );

  // Old standalone pages from the previous site that are now just sections on the home page.
  const SECTION_REDIRECTS: Record<string, string> = {
    "/connect/": "contact",
    "/contact/": "contact",
    "/investment/": "services"
  };
  const normPath = (p: string): string => {
    let s = (p || "/").split("#")[0].split("?")[0];
    if (s.length > 1 && !s.endsWith("/")) s += "/";
    return s;
  };
  const redirectSectionFor = (target: string): string | null => {
    if (target.includes("/cdn-cgi/l/email-protection")) return "contact";
    return SECTION_REDIRECTS[normPath(target)] || null;
  };

  // Navigate to a page id or URL path; pushes real history so the address bar matches the old slugs.
  const navigate = (target: string) => {
    // Old pages that became home-page sections → go home and smooth-scroll there.
    if (target.startsWith("/")) {
      const section = redirectSectionFor(target);
      if (section) {
        navigateTo(section);
        return;
      }
    }
    const page = target.startsWith("/") ? pageForPath(target) : target;
    const path = pathForPage(page);
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Keep the page in sync with browser back/forward.
  useEffect(() => {
    const onPop = () => setCurrentPage(pageForPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Direct visits to old standalone pages (e.g. /connect/, /investment/) land on the
  // matching home-page section, preserving old inbound links and SEO.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = redirectSectionFor(window.location.pathname);
    if (!section) return;
    window.history.replaceState({}, "", "/");
    setCurrentPage("home");
    const t = setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }, 280);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth in-page section navigation (home sections)
  const navigateTo = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (currentPage !== "home") {
      navigate("home");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 160);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToPage = (page: string) => navigate(page);
  const openJournalIndex = () => navigate("journal-index");
  const openArticle = (page: string) => navigate(page);
  const isJournalPage =
    currentPage === "journal-index" ||
    currentPage === "journal-queenstown" ||
    currentPage === "journal-wanaka" ||
    POST_PATHS.includes(currentPage);

  // Highlight the active nav item via IntersectionObserver (no scroll listener, no layout reads)
  useEffect(() => {
    if (currentPage !== "home") {
      setActiveSection("");
      return;
    }
    const sections = ["hero", "story", "services", "timeline", "faq", "contact"];
    const els = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        // First section (in DOM order) crossing the upper-third band wins
        const active = sections.find((id) => inView.has(id));
        if (active) setActiveSection(active);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentPage]);

  // On first load, honour a #hash in the URL once the page has actually rendered
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
      }, 120);
      return () => window.clearTimeout(t);
    }
  }, []);

  // Accessibility for modals: Esc closes, background scroll locks, focus stays inside and returns on close
  useEffect(() => {
    if (!isLoginOpen && !isJournalOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const closeAll = () => {
      setIsLoginOpen(false);
      setIsJournalOpen(false);
      setLoginError(null);
    };

    const getFocusables = () => {
      const modal = document.querySelector('[data-modal="true"]') as HTMLElement | null;
      if (!modal) return [] as HTMLElement[];
      return Array.from(
        modal.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeAll();
        return;
      }
      if (e.key === "Tab") {
        const f = getFocusables();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => getFocusables()[0]?.focus(), 60);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, [isLoginOpen, isJournalOpen]);

  // Handle service CTA clicks - scroll, select, and highlight
  const handleServiceCTA = (serviceId: string) => {
    // The Wedding Navigator has its own landing/booking page rather than the contact form.
    if (serviceId === "navigator") {
      navigate("wedding-navigator");
      return;
    }
    let helpTypeValue = "";
    if (serviceId === "elopement") {
      helpTypeValue = "Elopement";
    } else if (serviceId === "intimate") {
      helpTypeValue = "Intimate Wedding (up to 60 guests)";
    } else if (serviceId === "navigator") {
      helpTypeValue = "The Wedding Navigator";
    } else if (serviceId === "design") {
      helpTypeValue = "Design, Coordination & Day-of Management";
    }

    setFormData((prev) => ({
      ...prev,
      helpType: helpTypeValue
    }));

    // Scroll to contact form
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.names.trim()) {
      errors.names = "Please share your names.";
    }
    if (!formData.email.trim()) {
      errors.email = "Please share a coordinate to write back to.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please provide an email in the shape of name@domain.com";
    }
    if (!formData.helpType) {
      errors.helpType = "Please select a shape of help.";
    }
    if (!formData.story.trim()) {
      errors.story = "Please share a little of your story.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission
  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    // Simulate real server route post /api/contact or delay
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      // Clean form on success
      setFormData({
        names: "",
        email: "",
        location: "",
        helpType: "",
        dateTiming: "",
        guestCount: "",
        regionDrawn: "",
        story: "",
        source: ""
      });
    }, 1200);
  };

  // Newsletter submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      return;
    }
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-[100dvh] bg-[#f7f7f7] text-[#708090] selection:bg-[#a57d02]/10 selection:text-black">
      
      {/* 1. SLIM MINIMAL FIXED NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f7f7]/95 backdrop-blur-sm border-b border-black/[0.08] transition duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - Wordmark only, Serif, no icon */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              navigate("home");
            }}
            className="font-serif text-[13px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-black font-semibold hover:opacity-80 transition-opacity whitespace-nowrap"
            id="logo-link"
          >
            FANTAIL WEDDINGS
          </a>

          {/* Nav Links - Right aligned, small, capitalized, widely spaced (desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => navigateTo("story")}
              className={`relative pb-1 text-[10px] tracking-[0.25em] uppercase font-light transition cursor-pointer ${
                currentPage === "home" && activeSection === "story" ? "text-black" : "text-[#708090] hover:text-black"
              }`}
              id="nav-story"
            >
              Story
              {currentPage === "home" && activeSection === "story" && (
                <motion.span layoutId="nav-underline" className="absolute left-0 right-0 bottom-0 h-px bg-black/40" />
              )}
            </button>
            <button
              onClick={() => navigateTo("services")}
              className={`relative pb-1 text-[10px] tracking-[0.25em] uppercase font-light transition cursor-pointer ${
                currentPage === "home" && activeSection === "services" ? "text-black" : "text-[#708090] hover:text-black"
              }`}
              id="nav-services"
            >
              Services
              {currentPage === "home" && activeSection === "services" && (
                <motion.span layoutId="nav-underline" className="absolute left-0 right-0 bottom-0 h-px bg-black/40" />
              )}
            </button>
            <button
              onClick={() => navigate("wedding-navigator")}
              className={`relative pb-1 text-[10px] tracking-[0.25em] uppercase font-light transition cursor-pointer ${
                currentPage === "wedding-navigator" ? "text-black" : "text-[#708090] hover:text-black"
              }`}
              id="nav-wedding-navigator"
            >
              The Wedding Navigator
              {currentPage === "wedding-navigator" && (
                <motion.span layoutId="nav-underline" className="absolute left-0 right-0 bottom-0 h-px bg-black/40" />
              )}
            </button>
            <button
              onClick={() => goToPage("portfolio")}
              className={`relative pb-1 text-[10px] tracking-[0.25em] uppercase font-light transition cursor-pointer ${
                currentPage === "portfolio" ? "text-black" : "text-[#708090] hover:text-black"
              }`}
              id="nav-portfolio"
            >
              Portfolio
              {currentPage === "portfolio" && (
                <motion.span layoutId="nav-underline" className="absolute left-0 right-0 bottom-0 h-px bg-black/40" />
              )}
            </button>
            <button
              onClick={() => navigateTo("faq")}
              className={`relative pb-1 text-[10px] tracking-[0.25em] uppercase font-light transition cursor-pointer ${
                currentPage === "home" && activeSection === "faq" ? "text-black" : "text-[#708090] hover:text-black"
              }`}
              id="nav-faq"
            >
              FAQ
              {currentPage === "home" && activeSection === "faq" && (
                <motion.span layoutId="nav-underline" className="absolute left-0 right-0 bottom-0 h-px bg-black/40" />
              )}
            </button>
            {/* Journal dropdown */}
            <div className="relative group/journal">
              <button
                onClick={openJournalIndex}
                className={`relative pb-1 text-[10px] tracking-[0.25em] uppercase font-light transition cursor-pointer ${
                  isJournalPage ? "text-black" : "text-[#708090] hover:text-black"
                }`}
                id="nav-journal"
              >
                Journal
                {isJournalPage && (
                  <motion.span layoutId="nav-underline" className="absolute left-0 right-0 bottom-0 h-px bg-black/40" />
                )}
              </button>
              <div className="absolute right-0 top-full pt-4 opacity-0 invisible translate-y-1 group-hover/journal:opacity-100 group-hover/journal:visible group-hover/journal:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white border border-black/10 shadow-xl py-3 min-w-[210px]">
                  {JOURNAL_ARTICLES.map((a) => (
                    <button
                      key={a.page}
                      onClick={() => openArticle(a.page)}
                      className="block w-full text-left px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase text-black/75 hover:text-black hover:bg-black/[0.04] transition"
                    >
                      {a.navLabel}
                    </button>
                  ))}
                  <div className="h-px bg-black/10 mx-5 my-2"></div>
                  <button
                    onClick={openJournalIndex}
                    className="block w-full text-left px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase text-black/75 hover:text-black hover:bg-black/[0.04] transition"
                  >
                    All Posts
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-[10px] tracking-[0.25em] uppercase font-light transition cursor-pointer text-[#708090] hover:text-black"
              id="nav-client-login"
            >
              Client Login
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="lg:hidden -mr-1 p-2 text-black"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: LUX_EASE }}
              className="lg:hidden overflow-hidden border-t border-black/[0.06] bg-[#f7f7f7]"
            >
              <div className="px-6 py-3 flex flex-col max-h-[75dvh] overflow-y-auto">
                {[
                  { label: "Story", fn: () => navigateTo("story") },
                  { label: "Services", fn: () => navigateTo("services") },
                  { label: "The Wedding Navigator", fn: () => navigate("wedding-navigator") },
                  { label: "Portfolio", fn: () => goToPage("portfolio") },
                  { label: "FAQ", fn: () => navigateTo("faq") },
                  { label: "Journal", fn: () => openJournalIndex() }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.fn}
                    className="text-left py-3 border-b border-black/[0.06] text-[11px] tracking-[0.25em] uppercase text-black/75 hover:text-black transition"
                  >
                    {item.label}
                  </button>
                ))}
                {JOURNAL_ARTICLES.map((a) => (
                  <button
                    key={a.page}
                    onClick={() => openArticle(a.page)}
                    className="text-left py-2.5 pl-4 border-b border-black/[0.06] text-[10px] tracking-[0.2em] uppercase text-black/50 hover:text-black transition"
                  >
                    {a.navLabel}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="text-left py-3 text-[11px] tracking-[0.25em] uppercase text-black/75 hover:text-black transition"
                >
                  Client Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SPACE FOR FIXED NAV */}
      <div className="h-10" id="hero"></div>

      {currentPage === "home" ? (
        <>
          {/* 2. HERO SECTION */}
          <section className="relative py-12 px-6 max-w-7xl mx-auto">
        {/* Full Frame Beautiful Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[70dvh] md:h-[82dvh] w-full overflow-hidden bg-gray-100 rounded-sm shadow-sm"
        >
          <motion.img
            src="/assets/images/Welcome-Hero.jpg"
            alt="Hands on an open notebook with soft New Zealand afternoon light cascading through a window"
            className="object-cover w-full h-full"
            referrerPolicy="no-referrer"
            id="hero-img"
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          {/* Transparent gradient dark overlay for high contrast readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"></div>

          {/* Left aligned text overlay, 2/3rd of the way down of the image - Digital Serenity reveal */}
          <div className="absolute left-6 md:left-14 bottom-[12%] md:bottom-[18%] max-w-2xl text-white space-y-3">
            <RevealHeading
              as="span"
              className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/90 font-light block"
              text="South Island, New Zealand"
              delay={0.7}
              stagger={0.04}
              amount={0.4}
            />
            <RevealHeading
              as="h1"
              className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white font-light leading-[1.1] tracking-tight"
              text="Hello, and Welcome"
              delay={0.95}
              amount={0.4}
            />
          </div>
        </motion.div>

        {/* Copy Paragraph and CTA Sitting Below the Full Frame Image */}
        <div className="mt-8 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-12">
          <div className="lg:col-span-8 space-y-6 text-sm text-[#708090] leading-relaxed font-light font-sans">
            <p className="text-base sm:text-lg text-[#556270] leading-relaxed">
              I plan a small number of weddings each year on the South Island of Aotearoa, New Zealand.
              Elopements. Intimate weddings of up to 60 guests. And for couples planning their own wedding
              here, an online consultancy that hands you the map instead of running the journey for you.
            </p>
            <p className="text-black/85 font-normal tracking-wide">
              Three different shapes of help. One person. Real care.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right lg:pt-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => {
                  if (contactFormRef.current) {
                    contactFormRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group text-[11px] tracking-[0.25em] uppercase text-black border-b border-black pb-1.5 inline-flex items-center hover:opacity-70 transition font-light"
                id="hero-cta"
              >
                Begin a Conversation <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2.5 AWARD FEATURE SECTION */}
      <section className="py-6 px-6 max-w-7xl mx-auto" id="awards">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#fbfbf9] border border-black/[0.05] py-8 px-8 sm:px-12 md:px-16 overflow-hidden rounded-sm group shadow-sm hover:shadow-md transition-shadow duration-500 max-w-5xl mx-auto"
          id="award-card-block"
        >
          {/* Subtle warm luxury gold vertical line on the left, exactly matching the award screenshot */}
          <div className="absolute left-0 inset-y-0 w-[4px] bg-[#ab8e61]" id="award-accent-bar"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative z-10" id="award-horizontal-layout">
            
            {/* Left Portion: Crest & Award details */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left" id="award-left-content">
              {/* Official Global Wedding Awards badge */}
              <motion.div
                className="shrink-0 flex items-center justify-center"
                id="award-crest-container"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <img
                  src="/assets/images/global-wedding-awards-logo.png"
                  alt="LUXlife Magazine Global Wedding Awards 2026 winner"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                  loading="lazy"
                />
              </motion.div>

              {/* Award Description details */}
              <div className="space-y-1.5" id="award-texts-container">
                <span className="text-[9px] tracking-[0.35em] uppercase text-[#708090] font-mono block">
                  LUXlife Magazine Global Wedding Awards
                </span>
                <h3 className="font-serif text-[15px] sm:text-base md:text-lg text-[#ab8e61] font-normal leading-relaxed max-w-xl">
                  Luxury Destination Wedding Planning Specialists of the Year 2026, New Zealand
                </h3>
              </div>
            </div>

            {/* Right Portion: Elegant text CTA matching other links on the site */}
            <div className="shrink-0 pt-2 md:pt-0" id="award-cta-container">
              <a
                href="https://lux-life.digital/winners/fantail-weddings-2/"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-[10px] tracking-[0.25em] uppercase text-black border-b border-black/40 pb-1 inline-flex items-center gap-1.5 hover:text-black hover:border-black transition active:scale-[0.98] font-light"
                id="award-external-link"
              >
                View Award Publication <span className="group-hover:translate-x-1 transition-transform duration-300 font-normal">&rarr;</span>
              </a>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Thin black border divider */}
      <DrawDivider />

      {/* 3. STORY SECTION (#story) */}
      <motion.section
        className="py-24 px-6 max-w-7xl mx-auto id-target"
        id="story"
        variants={revealItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Header left */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
              The Philosophy
            </span>
            <RevealHeading as="h2" className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight leading-snug" text="Story" />
            <p className="text-[11px] tracking-widest font-light uppercase text-[#708090]">
              how i got here & how we work
            </p>
          </div>

          {/* Copy right */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Part 1: How I got here */}
            <div className="space-y-6">
              <RevealHeading as="h3" className="font-serif text-2xl text-black font-normal italic" text="How I got here" amount={0.6} />
              <div className="space-y-6 text-sm text-[#708090] font-light leading-relaxed">
                <p>
                  I built this work the way I want to live my life. Small. Considered. Deeply present. Rooted in a country I love.
                </p>
                <p>
                  The road here was not a straight one. Thirty years across hospitality in around the world, film production in Auckland, commercial floristry under one of the best florists in New Zealand, event work in Las Vegas, and three years running a converted woolshed venue near Wānaka. Couples who book me get a planner who understands deeply how their day will be remembered, photographed, and felt by their guests.
                </p>
                <p>
                  I plan weddings in the South Island for couples who want their celebration to feel like the most beautiful version of their real life. Not a performance. Not a Pinterest re-creation. The real, slightly imperfect, deeply loved thing.
                </p>
              </div>
            </div>

            {/* Part 2: How I work */}
            <div className="space-y-6 border-t border-black/10 pt-12">
              <RevealHeading as="h3" className="font-serif text-2xl text-black font-normal italic" text="How I work" amount={0.6} />
              <div className="space-y-6 text-sm text-[#708090] font-light leading-relaxed">
                <p>
                  A small handful of weddings each year. Not because of false scarcity. Because I am one human, and I want to give you all of me when your turn comes.
                </p>
                <p>
                  When you email, Rebecca writes back. When you call, Rebecca answers. The exception is my 2IC, Meghan, who is my work wife, my secret weapon, more of a perfectionist than I am, and the only other person you might hear from.
                </p>
                <p>
                  The planning months lean heavily on voice notes and Loom videos. Not endless emails. Mine sounds like a cup of tea with a friend.
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Thin black border divider */}
      <DrawDivider />

      {/* 4. SERVICES SECTION (#services) */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="services">
        
        {/* Intro */}
        <div className="space-y-4 mb-16 max-w-2xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
            Shapes of Help
          </span>
          <RevealHeading as="h2" className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight" text="Four ways I can help" />
          <p className="text-sm font-light text-[#708090] leading-relaxed">
            Each one is its own shape of help. The right one depends on where you are coming from, how many 
            people are coming with you, and most of all, how you want the day to feel.
          </p>
        </div>

        {/* Desktop Side-by-Side summaries (as requested: "On desktop, consider three columns side by side at the top of this section, with a one-line summary in each, before the longer prose below") */}
        <div className="hidden lg:grid grid-cols-2 gap-x-12 gap-y-10 mb-24 border-b border-black/10 pb-16">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="space-y-4 pr-4">
              <button
                type="button"
                onClick={() => document.getElementById(`service-${service.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="flex items-center gap-3 text-left group/jump cursor-pointer"
                aria-label={`Jump to ${service.title}`}
              >
                <span className="font-serif text-xs italic text-black/50">{service.number}</span>
                <h4 className="font-serif text-sm tracking-widest text-black font-medium border-b border-transparent group-hover/jump:border-black/40 transition-colors pb-0.5">
                  {service.title}
                </h4>
              </button>
              <p className="text-xs text-[#708090] font-light leading-relaxed italic border-l border-black/15 pl-4 py-2">
                {service.subtitle}
              </p>
              <button
                onClick={() => handleServiceCTA(service.id)}
                className="text-[10px] tracking-widest uppercase text-black font-medium hover:opacity-75 transition text-left block"
              >
                {service.id === "navigator" ? "Book The Wedding Navigator Consultation" : "Inquire now"} →
              </button>
            </div>
          ))}
        </div>

        {/* Detailed services - Long vertical stack, beautifully framed */}
        <div className="space-y-32">
          {SERVICES_DATA.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center scroll-mt-28`}
                id={`service-${service.id}`}
              >

                {/* Visual Image container (portrait layout, 3:4 aspect, luxurious scroll reveal) */}
                <div className={`col-span-1 lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <RevealImage
                    src={service.image}
                    alt={service.title}
                    id={`service-image-${service.id}`}
                    wrapClassName="relative aspect-[3/4] w-full overflow-hidden bg-gray-100"
                  />
                </div>

                {/* Content description column */}
                <motion.div
                  className={`col-span-1 lg:col-span-6 space-y-10 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, ease: LUX_EASE, delay: 0.1 }}
                >
                  
                  {/* Title & subtitle */}
                  <div className="space-y-3">
                    <span className="font-serif text-xs italic text-black/60 block">service {service.number}</span>
                    <RevealHeading as="h3" className="font-serif text-2xl lg:text-3xl text-black tracking-tight font-light uppercase" text={service.title} amount={0.6} />
                    <p className="font-serif text-md italic text-black/80 font-light leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Body description */}
                  <p className="text-sm font-sans font-light text-[#708090] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Client love note / testimonial */}
                  {service.loveNote && (
                    <div className="border-l-2 border-black/15 pl-6 py-2 italic font-serif text-sm text-black/75 leading-relaxed bg-black/[0.01]">
                      {service.loveNote}
                    </div>
                  )}

                  {/* Small special cap notes */}
                  {service.id === "intimate" && (
                    <div className="bg-[#f2f2f2] p-6 border-l-2 border-black/20 text-xs text-[#708090] space-y-2 font-light leading-relaxed">
                      <p className="text-black/80 font-medium font-serif italic text-sm">A small note on guest counts.</p>
                      <p>
                        My intimate wedding service caps at 60, on purpose. Above 60, a celebration shifts from 
                        a weekend gathering into a production, and that is not the kind of planning I do best. 
                        If you are imagining 100, 150, 200 guests, I am genuinely not the right home for your celebration.
                      </p>
                    </div>
                  )}

                  {service.id === "navigator" && (
                    <div className="bg-[#f2f2f2] p-6 border-l-2 border-black/20 text-xs text-[#708090] space-y-2 font-light leading-relaxed">
                      <p className="text-black/80 font-medium font-serif italic text-sm">An honest note about where I can help most.</p>
                      <p>
                        My vendor knowledge is strongest in the South Island, particularly Central Otago, Wānaka, 
                        Queenstown, the Mackenzie Country, Marlborough, and Banks Peninsula. North Island weddings are 
                        welcome, and the toolkit travels well, but vendor recommendations will be lighter the further 
                        from the South Island you are.
                      </p>
                    </div>
                  )}

                  {/* Included items */}
                  <div className="space-y-4 border-t border-black/10 pt-8">
                    <h5 className="text-[10px] tracking-[0.25em] uppercase text-black font-semibold">
                      What is included
                    </h5>
                    <ul className="space-y-3 text-xs text-[#708090] font-light leading-relaxed pl-1">
                      {service.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex gap-3 align-top">
                          <span className="text-black/40 font-mono mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Investment */}
                  <div className="space-y-2 border-t border-black/10 pt-8">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-black font-semibold block">
                      Investment
                    </span>
                    <p className="text-xs text-black/80 italic font-serif leading-relaxed">
                      {service.investment}
                    </p>
                  </div>

                  {/* Plain Link CTA button with underline */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleServiceCTA(service.id)}
                      className="group text-[10px] tracking-[0.25em] uppercase text-black border-b border-black pb-1 inline-flex items-center hover:opacity-75 transition text-left font-light"
                      id={`cta-button-${service.id}`}
                    >
                      {service.id === "navigator" ? "Book The Wedding Navigator Consultation" : service.ctaText} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>

                </motion.div>

              </div>
            );
          })}
        </div>

      </section>

      {/* Thin black border divider */}
      <DrawDivider />

      {/* 5. TIMELINE SECTION: HOW THE PLANNING YEAR LOOKS (#timeline) */}
      <section className="py-24 px-6 max-w-7xl mx-auto id-target" id="timeline">
        <div className="space-y-4 mb-16 max-w-2xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
            The Journey
          </span>
          <RevealHeading as="h2" className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight" text="How the planning year looks" />
          <p className="text-sm font-light text-[#708090] leading-relaxed">
            Applies to elopements and intimate weddings. The Wedding Navigator has its own structure of live calls 
            and follow-up milestones we lay out together.
          </p>
        </div>

        {/* Soft horizontal/vertical line timeline layout with 5 points and photos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 relative"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Timeline background join line (desktop only) - draws across as the row enters */}
          <motion.div
            className="hidden md:block absolute top-[120px] left-8 right-8 h-[1px] bg-black/10 -z-10 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: LUX_EASE }}
          />

          {TIMELINE_DATA.map((point) => (
            <motion.div key={point.id} variants={revealItem} className="space-y-6 bg-white p-6 border border-black/[0.05] flex flex-col justify-between">

              <div className="space-y-4">
                {/* Step indicator */}
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl italic text-black/15 font-light">
                    {point.step}
                  </span>
                  <span className="text-[9px] tracking-widest text-[#708090] font-mono">
                    PHASE {point.step}
                  </span>
                </div>

                {/* Supporting Portrait Aspect photograph */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
                  <img
                    src={point.image}
                    alt={point.title}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                    id={`timeline-img-${point.id}`}
                  />
                </div>

                <h4 className="font-serif text-base text-black font-normal italic">
                  {point.title}
                </h4>

                <p className="text-xs text-[#708090] font-light leading-relaxed">
                  {point.description}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Thin black border divider */}
      <DrawDivider />

      {/* 6. A FEW THINGS ABOUT ME / HUMAN TOUCH PROFILE SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column - Detailed list of facts */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
                The Planner
              </span>
              <RevealHeading as="h2" className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight pb-2 border-b border-black/10 m-0" text="A few things you might want to know about me" />
              <p className="text-xs italic text-[#708090] font-serif font-light">
                A short list-as-portrait, to trace the real human on the other side of your plans.
              </p>
            </div>

            <motion.div
              className="space-y-6"
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {ABOUT_FACTS.map((fact, index) => {
                const parts = fact.split(". ");
                const highlight = parts[0];
                const rest = parts.slice(1).join(". ");
                return (
                  <motion.div key={index} variants={revealItem} className="flex gap-4 items-start py-2 border-b border-black/[0.04]">
                    <span className="font-mono text-[10px] text-black/30 mt-1">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <p className="text-xs text-[#708090] font-light leading-relaxed">
                      <strong className="text-black font-normal text-sm font-serif block sm:inline mr-1">
                        {highlight}.
                      </strong>
                      <span>{rest}</span>
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column - Beautiful portraits of Rebecca (The Planner) and Jasper */}
          <div className="lg:col-span-5 space-y-6">
            <RevealImage
              src="/assets/images/Rebecca-founder.jpg"
              alt="Rebecca - Creator and Planner"
              wrapClassName="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 rounded-sm shadow-sm"
              id="about-founder-img"
            />
            <RevealImage
              src="/assets/images/Jasper_and_Rebecca.jpg"
              alt="Jasper & Rebecca"
              wrapClassName="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 rounded-sm shadow-sm"
              id="about-jasper-rebecca-img"
            />
          </div>

        </div>
      </section>

      {/* Thin black border divider */}
      <DrawDivider />

      {/* 7. FREQUENTLY ASKED QUESTIONS SECTION (#faq) */}
      <section className="py-24 px-6 max-w-7xl mx-auto id-target" id="faq">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Header column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
              Inquire Deeper
            </span>
            <RevealHeading as="h2" className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight" text="Frequently Asked Questions" />
            <p className="text-xs font-light text-[#708090] leading-relaxed">
              The questions couples ask me most about planning a wedding in Aotearoa New Zealand.
            </p>
            <div className="pt-6 hidden lg:block">
              <p className="text-[10px] tracking-widest uppercase text-black font-light">
                * marked with SEO-Page markup schema
              </p>
            </div>
          </div>

          {/* Accordion list */}
          <motion.div
            className="lg:col-span-8 space-y-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {FAQ_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  variants={revealItem}
                  className="bg-white border border-black/10 overflow-hidden transition duration-300"
                  id={`faq-item-${faq.id}`}
                >
                  {/* Accordion Row Header */}
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                    id={`faq-trigger-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                  >
                    <span className="font-serif text-sm sm:text-base text-black font-normal flex items-center gap-4">
                      <span className="text-black/30 font-mono text-xs">{faq.id.replace("fq-", "Q")}</span>
                      <span>{faq.question}</span>
                    </span>
                    <span className="relative ml-4 w-4 h-4 shrink-0 flex items-center justify-center text-black/45" aria-hidden="true">
                      <Plus
                        className={`absolute w-4 h-4 transition-all duration-300 ${isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
                        strokeWidth={1.5}
                      />
                      <Minus
                        className={`absolute w-4 h-4 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
                        strokeWidth={1.5}
                      />
                    </span>
                  </button>

                  {/* Accordion Row Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${faq.id}`}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#708090] font-light leading-relaxed font-sans border-t border-black/[0.04]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* Dynamic FAQ Page Structured Data Script Injection for actual SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQ_DATA.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </section>

      {/* Thin black border divider */}
      <DrawDivider />

      {/* 8. CONTACT FORM (#contact) */}
      <motion.section
        ref={contactFormRef}
        className="py-24 px-6 max-w-4xl mx-auto id-target"
        id="contact"
        variants={revealItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="space-y-12">
          
          {/* Header block */}
          <div className="space-y-4 text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
              Begin your plans
            </span>
            <RevealHeading as="h2" className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight" text="Shall we begin?" />
            <p className="text-xs sm:text-sm font-light text-[#708090] leading-relaxed max-w-lg mx-auto">
              Tell me a little about the two of you. Where you are in the planning. What feels most uncertain 
              right now. I read every enquiry myself. There is no script. Just a conversation.
            </p>
          </div>

          {/* Actual Contact Form container with quiet styles */}
          <div className="bg-white border border-black/10 p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmitContactForm}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                  id="actual-contact-form"
                >
                  
                  {/* Row 1: Names */}
                  <div className="space-y-2">
                    <label htmlFor="names" className="block text-[11px] tracking-widest font-semibold text-black uppercase">
                      01. Your names *
                    </label>
                    <p className="text-[10px] text-[#708090] font-light italic">
                      Yours and your partner's first names.
                    </p>
                    <input
                      type="text"
                      id="names"
                      name="names"
                      required
                      value={formData.names}
                      onChange={handleInputChange}
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none"
                      placeholder="e.g. Sarah & Michael"
                    />
                    {formErrors.names && (
                      <p role="alert" className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.names}</p>
                    )}
                  </div>

                  {/* Row 2: Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-[11px] tracking-widest font-semibold text-black uppercase">
                      02. The best email to reach you *
                    </label>
                    <p className="text-[10px] text-[#708090] font-light italic">
                      I will write back personally within two working days.
                    </p>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none"
                      placeholder="name@domain.com"
                    />
                    {formErrors.email && (
                      <p role="alert" className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Row 3: Where in global space */}
                  <div className="space-y-2">
                    <label htmlFor="location" className="block text-[11px] tracking-widest font-semibold text-black uppercase">
                      03. Where in the world are you?
                    </label>
                    <p className="text-[10px] text-[#708090] font-light italic">
                      City and country is plenty. It helps me know the time zone we are working with.
                    </p>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none"
                      placeholder="e.g. London, United Kingdom"
                    />
                  </div>

                  {/* Row 4: Help Category (Crucial Pre-fill wired block) */}
                  <div className="space-y-2" id="service-select-node">
                    <label htmlFor="helpType" className="block text-[11px] tracking-widest font-semibold text-black uppercase">
                      04. Which kind of help are you imagining? *
                    </label>
                    <select
                      id="helpType"
                      name="helpType"
                      required
                      value={formData.helpType}
                      onChange={handleInputChange}
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none appearance-none cursor-pointer"
                    >
                      <option value="">-- Please select a shape --</option>
                      <option value="Elopement">Elopement</option>
                      <option value="Intimate Wedding (up to 60 guests)">Intimate Wedding (up to 60 guests)</option>
                      <option value="The Wedding Navigator">The Wedding Navigator</option>
                      <option value="Design, Coordination & Day-of Management">Design, Coordination & Day-of Management</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                    {formErrors.helpType && (
                      <p role="alert" className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.helpType}</p>
                    )}
                  </div>

                  {/* Row 5: Date */}
                  <div className="space-y-2">
                    <label htmlFor="dateTiming" className="block text-[11px] tracking-widest font-semibold text-black uppercase">
                      05. Your date, or rough timing
                    </label>
                    <p className="text-[10px] text-[#708090] font-light italic">
                      A specific date, a season, or "not yet." All are fine.
                    </p>
                    <input
                      type="text"
                      id="dateTiming"
                      name="dateTiming"
                      value={formData.dateTiming}
                      onChange={handleInputChange}
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none"
                      placeholder="e.g. Autumn 2027"
                    />
                  </div>

                  {/* Row 6: Guest Counts */}
                  <div className="space-y-2">
                    <label htmlFor="guestCount" className="block text-[11px] tracking-widest font-semibold text-black uppercase">
                      06. Roughly how many guests?
                    </label>
                    <p className="text-[10px] text-[#708090] font-light italic">
                      A number, a range, or "we have no idea." Every answer is welcome.
                    </p>
                    <input
                      type="text"
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none"
                      placeholder="e.g. We are imagining around 30 close friends"
                    />
                  </div>

                  {/* Row 7: Region Drawn */}
                  <div className="space-y-2">
                    <label htmlFor="regionDrawn" className="block text-[11px] tracking-widest font-semibold text-black uppercase">
                      07. Where in Aotearoa are you drawn to?
                    </label>
                    <p className="text-[10px] text-[#708090] font-light italic">
                      A South Island region, a specific landscape, or "help me decide."
                    </p>
                    <input
                      type="text"
                      id="regionDrawn"
                      name="regionDrawn"
                      value={formData.regionDrawn}
                      onChange={handleInputChange}
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none"
                      placeholder="e.g. Lake Wānaka in late autumn"
                    />
                  </div>

                  {/* Row 8: Story Statement */}
                  <div className="space-y-2">
                    <label htmlFor="story" className="block text-[11px] tracking-widest font-semibold text-black uppercase">
                      08. Tell me your story, the parts you want me to know *
                    </label>
                    <p className="text-[10px] text-[#708090] font-light italic leading-relaxed">
                      How you met. Why Aotearoa. What made you start thinking about a wedding here. Take your 
                      time. There is no word limit.
                    </p>
                    <textarea
                      id="story"
                      name="story"
                      required
                      rows={5}
                      value={formData.story}
                      onChange={handleInputChange}
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none"
                      placeholder="Share your dream workspace or celebration feel..."
                    />
                    {formErrors.story && (
                      <p role="alert" className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.story}</p>
                    )}
                  </div>

                  {/* Row 9: Source info */}
                  <div className="space-y-2">
                    <label htmlFor="source" className="block text-[11px] tracking-widest font-semibold text-black uppercase">
                      09. How did you hear about Fantail?
                    </label>
                    <p className="text-[10px] text-[#708090] font-light italic">
                      A friend? Pinterest? Instagram? Just curious.
                    </p>
                    <input
                      type="text"
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none"
                    />
                  </div>

                  {/* Actions Submit */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 text-xs tracking-[0.25em] uppercase border border-black text-black font-light bg-black text-white hover:bg-neutral-900 transition active:scale-[0.98] cursor-pointer text-center duration-300"
                      id="submit-contact"
                    >
                      {submitting ? "Sending details personally..." : "Send →"}
                    </button>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="post-submit-block"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8 text-center py-6"
                  id="thank-you-screen"
                >
                  <div className="space-y-4">
                    <span className="font-serif text-3xl italic text-[#a57d02] font-light font-serif">
                      Thank you. Truly.
                    </span>
                    <h3 className="font-serif text-2xl text-black font-light">
                      Your note is sitting in my inbox now.
                    </h3>
                    <p className="text-xs sm:text-sm font-light text-[#708090] leading-relaxed max-w-lg mx-auto">
                      I will read it personally, probably tomorrow morning, with a cup of tea before the day gets 
                      busy. I will write back within two working days.
                    </p>
                    <p className="text-xs font-light text-[#708090] leading-relaxed max-w-lg mx-auto">
                      In the meantime, you might enjoy a wander through my Pinterest, where I keep my favourite 
                      South Island moments.
                    </p>
                  </div>

                  <div className="pt-4">
                    <a
                      href="https://nz.pinterest.com/fantailwed/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] tracking-widest uppercase text-black border-b border-black pb-1 inline-flex items-center hover:opacity-75 transition active:scale-[0.98]"
                      id="pinterest-btn"
                    >
                      Visit Pinterest →
                    </a>
                  </div>

                  <div className="pt-10 border-t border-black/10">
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-[9px] tracking-widest text-[#708090] uppercase hover:text-black font-mono transition"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.section>

      {/* Thin black border divider */}
      <DrawDivider />

      {/* 9. OTHER WAYS TO STAY IN TOUCH SECTION */}
      <motion.section
        className="py-24 px-6 max-w-7xl mx-auto bg-white border-y border-black/[0.06]"
        variants={revealItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Column A: Instagram */}
          <div className="space-y-4 md:border-r border-black/10 md:pr-8 last:border-none">
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#708090]">Instagram</span>
            <RevealHeading as="h4" className="font-serif text-lg text-black italic" text="On Instagram" amount={0.6} />
            <p className="text-xs font-light text-[#708090] leading-relaxed">
              @fantail_weddings, behind-the-scenes from the planning desk, vendor love, and the slow build-up of 
              every Fantail celebration.
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/fantail_weddings/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-black font-semibold border-b border-black pb-0.5"
              >
                @fantail_weddings →
              </a>
            </div>
          </div>

          {/* Column B: Pinterest */}
          <div className="space-y-4 md:border-r border-black/10 md:px-8 last:border-none">
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#708090]">Pinterest</span>
            <RevealHeading as="h4" className="font-serif text-lg text-black italic" text="On Pinterest" amount={0.6} />
            <p className="text-xs font-light text-[#708090] leading-relaxed">
              @fantailwed, with South Island wedding inspiration sorted by region, season, and feeling.
            </p>
            <div className="pt-2">
              <a
                href="https://nz.pinterest.com/fantailwed/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-black font-semibold border-b border-black pb-0.5"
              >
                @fantailwed →
              </a>
            </div>
          </div>

          {/* Column C: Inbox Newsletter Subscription */}
          <div className="space-y-4 md:pl-8 last:border-none">
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#708090]">Newsletter</span>
            <RevealHeading as="h4" className="font-serif text-lg text-black italic" text="In your inbox" amount={0.6} />
            <p className="text-xs font-light text-[#708090] leading-relaxed">
              The Fantail Letter, a quiet email I send once a month. A piece of writing, a vendor I am loving, 
              and the thing I am thinking about most. No sales. No pressure.
            </p>

            <AnimatePresence mode="wait">
              {!newsletterSubscribed ? (
                <motion.form
                  key="newsletter-sub-form"
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col gap-2 pt-2"
                >
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="your email coordinate"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-[#f7f7f7] text-black border border-black/10 focus:border-black px-3 py-2 text-xs font-light flex-1 rounded-none outline-none"
                    />
                    <button
                      type="submit"
                      className="text-[10px] tracking-widest uppercase font-mono bg-black text-white px-4 hover:bg-neutral-800 transition rounded-none"
                    >
                      Join
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.p
                  key="newsletter-success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-light text-[#a57d02] font-serif italic"
                >
                  Thank you. You have joined the monthly letter.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.section>
        </>
      ) : currentPage === "portfolio" ? (
        <PortfolioView onBackToHome={navigateTo} />
      ) : currentPage === "wedding-navigator" ? (
        <WeddingNavigator onNavigate={navigate} onEnquire={() => navigateTo("contact")} />
      ) : currentPage === "journal-index" ? (
        <JournalIndex onOpenArticle={openArticle} onOpenPost={navigate} />
      ) : POST_PATHS.includes(currentPage) ? (
        <BlogArticle
          post={getPostByPath(currentPage)!}
          onNavigate={navigate}
          onEnquire={() => navigateTo("contact")}
        />
      ) : (
        <JournalArticle
          article={getArticleByPage(currentPage as JournalPage)!}
          onEnquire={() => navigateTo("contact")}
          onBackToJournal={openJournalIndex}
        />
      )}

      {/* 10. FOOTER ACCORDING TO SPECS */}
      <motion.footer
        className="bg-white border-t border-black/10 py-16 px-6 font-sans"
        variants={revealItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-center md:text-left transition">
          
          {/* Column 1: Copyright/Identifier */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-black font-semibold">
              Fantail Weddings
            </h3>
            <p className="text-[11px] tracking-widest text-[#708090] font-light uppercase leading-relaxed">
              Boutique Wedding Planning & Online Wedding Planning Consultation
            </p>
            <p className="text-[10px] text-[#708090]/80 font-light">
              South Island, Aotearoa New Zealand
            </p>
          </div>

          {/* Column 2: Navigation Guide */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-black font-medium">
              Navigation Guide
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-light text-[#708090]">
              <button onClick={() => navigateTo("story")} className="hover:text-black transition text-left cursor-pointer">
                Story
              </button>
              <button onClick={() => navigateTo("services")} className="hover:text-black transition text-left cursor-pointer">
                Services
              </button>
              <button
                onClick={() => navigate("portfolio")}
                className="hover:text-black transition text-left cursor-pointer"
              >
                Portfolio
              </button>
              <button onClick={() => navigate("wedding-navigator")} className="hover:text-black transition text-left cursor-pointer">
                The Wedding Navigator
              </button>
              <button onClick={() => navigateTo("faq")} className="hover:text-black transition text-left cursor-pointer">
                FAQ
              </button>
              <button onClick={() => setIsLoginOpen(true)} className="hover:text-black transition text-left cursor-pointer">
                Client Login
              </button>
              <button onClick={openJournalIndex} className="hover:text-black transition text-left cursor-pointer">
                Journal
              </button>
              <button onClick={() => navigateTo("contact")} className="hover:text-black transition text-left cursor-pointer">
                Contact
              </button>
            </div>
          </div>

          {/* Column 3: Socials & Contacts */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-black font-medium">
              Coordinates
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-light text-[#708090]">
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 sm:gap-4 md:gap-2 lg:gap-4 justify-center md:justify-start">
                <a href="mailto:rebecca@fantailweddings.com" className="hover:text-black transition underline-offset-4 hover:underline">
                  rebecca@fantailweddings.com
                </a>
                <span className="hidden lg:inline text-black/10">|</span>
                <a href="tel:+64274672126" className="hover:text-black transition underline-offset-4 hover:underline font-light text-black/90">
                  +64 274 672 126
                </a>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1.5 border-t border-black/[0.04] mt-1">
                <a href="https://www.instagram.com/fantail_weddings/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition underline-offset-4 hover:underline">
                  Instagram
                </a>
                <span className="text-black/10">·</span>
                <a href="https://www.facebook.com/FantailWeddings" target="_blank" rel="noopener noreferrer" className="hover:text-black transition underline-offset-4 hover:underline">
                  Facebook
                </a>
                <span className="text-black/10">·</span>
                <a href="https://nz.pinterest.com/fantailwed/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition underline-offset-4 hover:underline">
                  Pinterest
                </a>
                <span className="text-black/10">·</span>
                <a href="https://www.youtube.com/@Fantailweddings" target="_blank" rel="noopener noreferrer" className="hover:text-black transition underline-offset-4 hover:underline">
                  YouTube
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Small lovely sign-off */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-black/[0.04] text-center">
          <p className="font-serif italic text-xs text-black/60 tracking-wider">
            "All are welcome here. Every kind of love belongs at a Fantail wedding. Creating beauty for love."
          </p>
        </div>
      </motion.footer>

      {/* 11. MODALS & OVERLAYS */}
      {/* Client Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsLoginOpen(false);
                setLoginError(null);
              }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm shadow-inner"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white w-full max-w-sm p-8 sm:p-10 border border-black/10 shadow-xl z-[55] space-y-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="login-modal-title"
              data-modal="true"
            >
              <button
                onClick={() => {
                  setIsLoginOpen(false);
                  setLoginError(null);
                }}
                aria-label="Close client login"
                className="absolute top-4 right-4 text-black/40 hover:text-black transition"
              >
                ✕
              </button>

              <div className="space-y-2 text-center font-sans">
                <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
                  BESPOKE PORTALS
                </span>
                <h3 id="login-modal-title" className="font-serif text-2xl text-black font-light">
                  Client Workspace
                </h3>
                <p className="text-xs font-light text-[#708090] leading-relaxed">
                  Welcome back. Please access your designated workspace via Bloom or enter your unique local access code below.
                </p>
              </div>

              <div className="space-y-5 pt-2 font-sans">
                <a
                  href="https://fantailweddings.bloom.io/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 text-xs tracking-[0.25em] uppercase border border-black text-white bg-black hover:bg-neutral-900 transition cursor-pointer text-center duration-300 block font-medium shadow-sm hover:shadow"
                  id="bloom-login-btn"
                >
                  Access Your Bloom Portal &rarr;
                </a>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-black/10"></div>
                  <span className="flex-shrink mx-4 text-[9px] tracking-widest font-mono uppercase text-[#708090]">
                    or enter access code
                  </span>
                  <div className="flex-grow border-t border-black/10"></div>
                </div>

                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    setLoginError("This bespoke client access code was not recognized. Please write to Rebecca directly to secure or reset your code."); 
                  }} 
                  className="space-y-4"
                >
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] tracking-widest uppercase font-semibold text-black">
                      Your Personal Access Code
                    </label>
                    <input
                      type="password"
                      placeholder="e.g. FT-2026-X"
                      required
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition rounded-none"
                    />
                    {loginError && (
                      <p className="text-[10px] text-red-500 font-mono mt-2 leading-normal">
                        {loginError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 text-xs tracking-[0.25em] uppercase border border-black text-white bg-black hover:bg-neutral-900 transition cursor-pointer text-center duration-300"
                  >
                    Enter Portal →
                  </button>
                </form>
              </div>
              
              <div className="text-center pt-2 font-sans">
                <p className="text-[9px] font-mono uppercase text-[#708090]">
                  powered by 8twenty creative
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Journal Modal */}
      <AnimatePresence>
        {isJournalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJournalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white w-full max-w-sm p-8 sm:p-10 border border-black/10 shadow-xl z-[55] space-y-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="journal-modal-title"
              data-modal="true"
            >
              <button
                onClick={() => setIsJournalOpen(false)}
                aria-label="Close journal"
                className="absolute top-4 right-4 text-black/40 hover:text-black transition"
              >
                ✕
              </button>

              <div className="space-y-2 text-center font-sans">
                <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
                  THE FANTAIL JOURNAL
                </span>
                <h3 id="journal-modal-title" className="font-serif text-2xl text-black font-light">
                  Journal Reflections
                </h3>
                <p className="text-xs font-light text-[#708090] leading-relaxed font-sans">
                  Quiet reflections, wedding field notes, and landscape features from around the South Island are launching in late 2026.
                </p>
              </div>

              <div className="p-4 bg-[#eaeaea]/40 rounded-sm border-l-2 border-[#a57d02]/30 space-y-2 text-left font-sans">
                <p className="text-xs italic text-black/70">
                  "The monthly letter is where I share these entries early. It goes out once a month on the full moon. No sales, just paper thoughts."
                </p>
                <p className="text-[10px] uppercase font-mono tracking-wider text-[#a57d02]/85 text-right">
                  Rebecca
                </p>
              </div>

              <div className="pt-4 text-center font-sans">
                <button
                  onClick={() => {
                    setIsJournalOpen(false);
                    navigateTo("contact");
                  }}
                  className="w-full py-3 text-xs tracking-[0.15em] uppercase border border-black text-black bg-transparent hover:bg-black hover:text-white transition cursor-pointer text-center duration-300"
                >
                  Join the Monthly Letter →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
