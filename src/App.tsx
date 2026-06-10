/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const [currentPage, setCurrentPage] = useState<"home" | "portfolio">("home");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  const contactFormRef = useRef<HTMLDivElement>(null);

  // Smooth multi-page section navigation helper
  const navigateTo = (sectionId: string) => {
    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Watch scroll positions to update active section in header
  useEffect(() => {
    const handleScroll = () => {
      if (currentPage !== "home") {
        setActiveSection("");
        return;
      }
      const sections = ["hero", "story", "services", "timeline", "faq", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle service CTA clicks - scroll, select, and highlight
  const handleServiceCTA = (serviceId: string) => {
    let helpTypeValue = "";
    if (serviceId === "elopement") {
      helpTypeValue = "Elopement";
    } else if (serviceId === "intimate") {
      helpTypeValue = "Intimate Wedding (up to 60 guests)";
    } else if (serviceId === "navigator") {
      helpTypeValue = "The Wedding Navigator";
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
    <div className="min-h-screen bg-[#f7f7f7] text-[#708090] selection:bg-[#a57d02]/10 selection:text-black">
      
      {/* 1. SLIM MINIMAL FIXED NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f7f7]/95 backdrop-blur-sm border-b border-black/[0.08] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - Wordmark only, Serif, no icon */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-sm tracking-[0.25em] text-black font-semibold hover:opacity-80 transition-opacity"
            id="logo-link"
          >
            FANTAIL WEDDINGS
          </a>

          {/* Nav Links - Right aligned, small, capitalized, widely spaced */}
          <nav className="flex items-center gap-6 md:gap-10">
            <button
              onClick={() => navigateTo("story")}
              className={`text-[10px] tracking-[0.25em] uppercase font-light transition-all cursor-pointer ${
                currentPage === "home" && activeSection === "story" ? "text-black border-b border-black/30 pb-1" : "text-[#708090] hover:text-black"
              }`}
              id="nav-story"
            >
              Story
            </button>
            <button
              onClick={() => navigateTo("services")}
              className={`text-[10px] tracking-[0.25em] uppercase font-light transition-all cursor-pointer ${
                currentPage === "home" && activeSection === "services" ? "text-black border-b border-black/30 pb-1" : "text-[#708090] hover:text-black"
              }`}
              id="nav-services"
            >
              Services
            </button>
            <button
              onClick={() => {
                setCurrentPage("portfolio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-[10px] tracking-[0.25em] uppercase font-light transition-all cursor-pointer ${
                currentPage === "portfolio" ? "text-black border-b border-black/30 pb-1" : "text-[#708090] hover:text-black"
              }`}
              id="nav-portfolio"
            >
              Portfolio
            </button>
            <button
              onClick={() => navigateTo("faq")}
              className={`text-[10px] tracking-[0.25em] uppercase font-light transition-all cursor-pointer ${
                currentPage === "home" && activeSection === "faq" ? "text-black border-b border-black/30 pb-1" : "text-[#708090] hover:text-black"
              }`}
              id="nav-faq"
            >
              FAQ
            </button>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-[10px] tracking-[0.25em] uppercase font-light transition-all cursor-pointer text-[#708090] hover:text-black"
              id="nav-client-login"
            >
              Client Login
            </button>
          </nav>
        </div>
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
          className="relative h-[70vh] md:h-[82vh] w-full overflow-hidden bg-gray-100 rounded-sm shadow-sm"
        >
          <img
            src="/assets/images/Welcome-Hero.jpg"
            alt="Hands on an open notebook with soft New Zealand afternoon light cascading through a window"
            className="object-cover w-full h-full transition-transform duration-1000 hover:scale-105"
            referrerPolicy="no-referrer"
            id="hero-img"
          />
          {/* Transparent gradient dark overlay for high contrast readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"></div>

          {/* Left aligned text overlay, 2/3rd of the way down of the image */}
          <div className="absolute left-6 md:left-14 bottom-[12%] md:bottom-[18%] max-w-2xl text-white space-y-3">
            <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/90 font-light block">
              South Island, New Zealand
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white font-light leading-[1.1] tracking-tight">
              Hello, and Welcome
            </h1>
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
                className="group text-[11px] tracking-[0.25em] uppercase text-black border-b border-black pb-1.5 inline-flex items-center hover:opacity-70 transition-all font-light"
                id="hero-cta"
              >
                Begin a Conversation <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Thin black border divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] bg-black/10 w-full"></div>
      </div>

      {/* 3. STORY SECTION (#story) */}
      <section className="py-24 px-6 max-w-7xl mx-auto id-target" id="story">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Header left */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight leading-snug">
              Story
            </h2>
            <p className="text-[11px] tracking-widest font-light uppercase text-[#708090]">
              how i got here & how we work
            </p>
          </div>

          {/* Copy right */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Part 1: How I got here */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-black font-normal italic">
                How I got here
              </h3>
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
              <h3 className="font-serif text-2xl text-black font-normal italic">
                How I work
              </h3>
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
      </section>

      {/* Thin black border divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] bg-black/10 w-full"></div>
      </div>

      {/* 4. SERVICES SECTION (#services) */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="services">
        
        {/* Intro */}
        <div className="space-y-4 mb-16 max-w-2xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
            Shapes of Help
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight">
            Three ways I can help
          </h2>
          <p className="text-sm font-light text-[#708090] leading-relaxed">
            Each one is its own shape of help. The right one depends on where you are coming from, how many 
            people are coming with you, and most of all, how you want the day to feel.
          </p>
        </div>

        {/* Desktop Side-by-Side summaries (as requested: "On desktop, consider three columns side by side at the top of this section, with a one-line summary in each, before the longer prose below") */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-24 border-b border-black/10 pb-16">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="space-y-4 pr-4">
              <div className="flex items-center gap-3">
                <span className="font-serif text-xs italic text-black/50">{service.number}</span>
                <h4 className="font-serif text-sm tracking-widest text-black font-medium">{service.title}</h4>
              </div>
              <p className="text-xs text-[#708090] font-light leading-relaxed italic border-l border-black/15 pl-4 py-2">
                {service.subtitle}
              </p>
              <button
                onClick={() => handleServiceCTA(service.id)}
                className="text-[10px] tracking-widest uppercase text-black font-medium hover:opacity-75 transition-all text-left block"
              >
                Inquire now →
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
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center`}
                id={`service-${service.id}`}
              >
                
                {/* Visual Image container (portrait layout, 3:4 aspect, full bleed style) */}
                <div className={`col-span-1 lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover w-full h-full hover:scale-[1.03] transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                      id={`service-image-${service.id}`}
                    />
                    <div className="absolute top-4 left-4 bg-[#f7f7f7] px-3 py-1 border border-black/10 text-[10px] tracking-widest uppercase font-light text-black">
                      {service.number}
                    </div>
                  </div>
                </div>

                {/* Content description column */}
                <div className={`col-span-1 lg:col-span-6 space-y-10 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  
                  {/* Title & subtitle */}
                  <div className="space-y-3">
                    <span className="font-serif text-xs italic text-black/60 block">service {service.number}</span>
                    <h3 className="font-serif text-2xl lg:text-3xl text-black tracking-tight font-light uppercase">
                      {service.title}
                    </h3>
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
                      className="group text-[10px] tracking-[0.25em] uppercase text-black border-b border-black pb-1 inline-flex items-center hover:opacity-75 transition-all text-left font-light"
                      id={`cta-button-${service.id}`}
                    >
                      {service.ctaText} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* Thin black border divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] bg-black/10 w-full"></div>
      </div>

      {/* 5. TIMELINE SECTION: HOW THE PLANNING YEAR LOOKS (#timeline) */}
      <section className="py-24 px-6 max-w-7xl mx-auto id-target" id="timeline">
        <div className="space-y-4 mb-16 max-w-2xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
            The Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight">
            How the planning year looks
          </h2>
          <p className="text-sm font-light text-[#708090] leading-relaxed">
            Applies to elopements and intimate weddings. The Wedding Navigator has its own structure of live calls 
            and follow-up milestones we lay out together.
          </p>
        </div>

        {/* Soft horizontal/vertical line timeline layout with 5 points and photos */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 relative">
          {/* Timeline background join line (desktop only) */}
          <div className="hidden md:block absolute top-[120px] left-8 right-8 h-[1px] bg-black/10 -z-10"></div>

          {TIMELINE_DATA.map((point) => (
            <div key={point.id} className="space-y-6 bg-white p-6 border border-black/[0.05] flex flex-col justify-between">
              
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
                    className="object-cover w-full h-full transition-transform duration-1000 hover:scale-105"
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

            </div>
          ))}
        </div>
      </section>

      {/* Thin black border divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] bg-black/10 w-full"></div>
      </div>

      {/* 6. A FEW THINGS ABOUT ME / HUMAN TOUCH PROFILE SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column - Detailed list of facts */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
                The Planner
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight pb-2 border-b border-black/10 m-0">
                A few things you might want to know about me
              </h2>
              <p className="text-xs italic text-[#708090] font-serif font-light">
                A short list-as-portrait, to trace the real human on the other side of your plans.
              </p>
            </div>

            <div className="space-y-6">
              {ABOUT_FACTS.map((fact, index) => {
                const parts = fact.split(". ");
                const highlight = parts[0];
                const rest = parts.slice(1).join(". ");
                return (
                  <div key={index} className="flex gap-4 items-start py-2 border-b border-black/[0.04]">
                    <span className="font-mono text-[10px] text-black/30 mt-1">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <p className="text-xs text-[#708090] font-light leading-relaxed">
                      <strong className="text-black font-normal text-sm font-serif block sm:inline mr-1">
                        {highlight}.
                      </strong>
                      <span>{rest}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Beautiful portraits of Rebecca (The Planner) and Jasper */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 rounded-sm shadow-sm">
              <img
                src="/assets/images/Rebecca-founder.jpg"
                alt="Rebecca - Creator and Planner"
                className="object-cover w-full h-full transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
                id="about-founder-img"
              />
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 rounded-sm shadow-sm">
              <img
                src="/assets/images/Jasper_and_Rebecca.jpg"
                alt="Jasper & Rebecca"
                className="object-cover w-full h-full transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
                id="about-jasper-rebecca-img"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Thin black border divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] bg-black/10 w-full"></div>
      </div>

      {/* 7. FREQUENTLY ASKED QUESTIONS SECTION (#faq) */}
      <section className="py-24 px-6 max-w-7xl mx-auto id-target" id="faq">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Header column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
              Inquire Deeper
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight">
              Frequently Asked Questions
            </h2>
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
          <div className="lg:col-span-8 space-y-3">
            {FAQ_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-black/10 overflow-hidden transition-all duration-300"
                  id={`faq-item-${faq.id}`}
                >
                  {/* Accordion Row Header */}
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    id={`faq-trigger-${faq.id}`}
                  >
                    <span className="font-serif text-sm sm:text-base text-black font-normal flex items-center gap-4">
                      <span className="text-black/30 font-mono text-xs">{faq.id.replace("fq-", "Q")}</span>
                      <span>{faq.question}</span>
                    </span>
                    <span className="font-mono text-xs text-black/40 pl-4">
                      {isOpen ? "✕" : "＋"}
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
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#708090] font-light leading-relaxed font-sans border-t border-black/[0.04]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

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
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] bg-black/10 w-full"></div>
      </div>

      {/* 8. CONTACT FORM (#contact) */}
      <section
        ref={contactFormRef}
        className="py-24 px-6 max-w-4xl mx-auto id-target"
        id="contact"
      >
        <div className="space-y-12">
          
          {/* Header block */}
          <div className="space-y-4 text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
              Begin your plans
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-light tracking-tight">
              Shall we begin?
            </h2>
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none"
                      placeholder="e.g. Sarah & Michael"
                    />
                    {formErrors.names && (
                      <p className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.names}</p>
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none"
                      placeholder="name@domain.com"
                    />
                    {formErrors.email && (
                      <p className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.email}</p>
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none"
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none appearance-none cursor-pointer"
                    >
                      <option value="">-- Please select a shape --</option>
                      <option value="Elopement">Elopement</option>
                      <option value="Intimate Wedding (up to 60 guests)">Intimate Wedding (up to 60 guests)</option>
                      <option value="The Wedding Navigator">The Wedding Navigator</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                    {formErrors.helpType && (
                      <p className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.helpType}</p>
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none"
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none"
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none"
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none"
                      placeholder="Share your dream workspace or celebration feel..."
                    />
                    {formErrors.story && (
                      <p className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.story}</p>
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none"
                    />
                  </div>

                  {/* Actions Submit */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 text-xs tracking-[0.25em] uppercase border border-black text-black font-light bg-black text-white hover:bg-neutral-900 transition-colors cursor-pointer text-center duration-300"
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
                      className="text-[11px] tracking-widest uppercase text-black border-b border-black pb-1 inline-flex items-center hover:opacity-75 transition-all"
                      id="pinterest-btn"
                    >
                      Visit Pinterest →
                    </a>
                  </div>

                  <div className="pt-10 border-t border-black/10">
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-[9px] tracking-widest text-[#708090] uppercase hover:text-black font-mono transition-colors"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Thin black border divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] bg-black/10 w-full"></div>
      </div>

      {/* 9. OTHER WAYS TO STAY IN TOUCH SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white border-y border-black/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Column A: Instagram */}
          <div className="space-y-4 md:border-r border-black/10 md:pr-8 last:border-none">
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#708090]">Instagram</span>
            <h4 className="font-serif text-lg text-black italic">On Instagram</h4>
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
            <h4 className="font-serif text-lg text-black italic">On Pinterest</h4>
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
            <h4 className="font-serif text-lg text-black italic">In your inbox</h4>
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
                      className="text-[10px] tracking-widest uppercase font-mono bg-black text-white px-4 hover:bg-neutral-800 transition-colors rounded-none"
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
      </section>
        </>
      ) : (
        <PortfolioView onBackToHome={navigateTo} />
      )}

      {/* 10. FOOTER ACCORDING TO SPECS */}
      <footer className="bg-white border-t border-black/10 py-16 px-6 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-center md:text-left transition-all">
          
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
              <button onClick={() => navigateTo("story")} className="hover:text-black transition-colors text-left cursor-pointer">
                Story
              </button>
              <button onClick={() => navigateTo("services")} className="hover:text-black transition-colors text-left cursor-pointer">
                Services
              </button>
              <button 
                onClick={() => {
                  setCurrentPage("portfolio");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                className="hover:text-black transition-colors text-left cursor-pointer"
              >
                Portfolio
              </button>
              <button onClick={() => navigateTo("faq")} className="hover:text-black transition-colors text-left cursor-pointer">
                FAQ
              </button>
              <button onClick={() => setIsLoginOpen(true)} className="hover:text-black transition-colors text-left cursor-pointer">
                Client Login
              </button>
              <button onClick={() => setIsJournalOpen(true)} className="hover:text-black transition-colors text-left cursor-pointer">
                Journal
              </button>
              <button onClick={() => navigateTo("contact")} className="hover:text-black transition-colors text-left cursor-pointer">
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
                <a href="mailto:rebecca@fantailweddings.com" className="hover:text-black transition-colors underline-offset-4 hover:underline">
                  rebecca@fantailweddings.com
                </a>
                <span className="hidden lg:inline text-black/10">|</span>
                <a href="tel:+64274672126" className="hover:text-black transition-colors underline-offset-4 hover:underline font-light text-black/90">
                  +64.274.672.126
                </a>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1.5 border-t border-black/[0.04] mt-1">
                <a href="https://www.instagram.com/fantail_weddings/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline-offset-4 hover:underline">
                  Instagram
                </a>
                <span className="text-black/10">·</span>
                <a href="https://www.facebook.com/FantailWeddings" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline-offset-4 hover:underline">
                  Facebook
                </a>
                <span className="text-black/10">·</span>
                <a href="https://nz.pinterest.com/fantailwed/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline-offset-4 hover:underline">
                  Pinterest
                </a>
                <span className="text-black/10">·</span>
                <a href="https://www.youtube.com/@Fantailweddings" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline-offset-4 hover:underline">
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
      </footer>

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
              className="relative bg-white w-full max-w-sm p-8 sm:p-10 border border-black/10 shadow-xl z-55 space-y-6"
            >
              <button
                onClick={() => {
                  setIsLoginOpen(false);
                  setLoginError(null);
                }}
                className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors"
              >
                ✕
              </button>
              
              <div className="space-y-2 text-center font-sans">
                <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
                  BESPOKE PORTALS
                </span>
                <h3 className="font-serif text-2xl text-black font-light">
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
                  className="w-full py-4 text-xs tracking-[0.25em] uppercase border border-black text-white bg-black hover:bg-neutral-900 transition-all cursor-pointer text-center duration-300 block font-medium shadow-sm hover:shadow"
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
                      className="w-full bg-[#fcfcfc] border border-black/10 focus:border-black px-4 py-3 text-sm text-black font-light outline-none transition-all rounded-none"
                    />
                    {loginError && (
                      <p className="text-[10px] text-red-500 font-mono mt-2 leading-normal">
                        {loginError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 text-xs tracking-[0.25em] uppercase border border-black text-white bg-black hover:bg-neutral-900 transition-colors cursor-pointer text-center duration-300"
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
              className="relative bg-white w-full max-w-sm p-8 sm:p-10 border border-black/10 shadow-xl z-55 space-y-6"
            >
              <button
                onClick={() => setIsJournalOpen(false)}
                className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors"
              >
                ✕
              </button>
              
              <div className="space-y-2 text-center font-sans">
                <span className="text-[10px] tracking-[0.3em] uppercase text-black font-light block">
                  THE FANTAIL JOURNAL
                </span>
                <h3 className="font-serif text-2xl text-black font-light">
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
                  — Rebecca
                </p>
              </div>

              <div className="pt-4 text-center font-sans">
                <button
                  onClick={() => {
                    setIsJournalOpen(false);
                    navigateTo("contact");
                  }}
                  className="w-full py-3 text-xs tracking-[0.15em] uppercase border border-black text-black bg-transparent hover:bg-black hover:text-white transition-all cursor-pointer text-center duration-300"
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
