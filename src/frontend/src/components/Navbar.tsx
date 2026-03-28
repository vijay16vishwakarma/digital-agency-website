import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Briefcase,
  Info,
  Mail,
  Menu,
  MessageSquare,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  {
    label: "About",
    href: "#about",
    id: "about",
    icon: Info,
    color: "oklch(0.62 0.19 198)",
  },
  {
    label: "Services",
    href: "#services",
    id: "services",
    icon: Wrench,
    color: "oklch(0.72 0.22 142)",
  },
  {
    label: "Portfolio",
    href: "#portfolio",
    id: "portfolio",
    icon: Briefcase,
    color: "oklch(0.65 0.2 215)",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
    id: "testimonials",
    icon: MessageSquare,
    color: "oklch(0.68 0.2 170)",
  },
  {
    label: "Blog",
    href: "#blog",
    id: "blog",
    icon: BookOpen,
    color: "oklch(0.72 0.22 142)",
  },
  {
    label: "Contact",
    href: "#contact",
    id: "contact",
    icon: Mail,
    color: "oklch(0.62 0.19 198)",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          }
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_30px_oklch(0_0_0/0.4)]"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-[2px] origin-left transition-all duration-75"
        style={{
          width: `${scrollProgress}%`,
          background:
            "linear-gradient(90deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
        }}
      />

      <nav className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Animated Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative">
            {/* Outer wide glow ring */}
            <motion.div
              className="absolute rounded-2xl pointer-events-none"
              style={{
                inset: "-12px",
                background:
                  "radial-gradient(ellipse at center, oklch(0.62 0.19 198 / 0.6) 0%, oklch(0.72 0.22 142 / 0.25) 55%, transparent 100%)",
                filter: "blur(16px)",
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Rotating color sweep */}
            <motion.div
              className="absolute rounded-2xl pointer-events-none"
              style={{
                inset: "-8px",
                background:
                  "conic-gradient(from 0deg, oklch(0.62 0.19 198 / 0.7), oklch(0.72 0.22 142 / 0.7), oklch(0.65 0.22 270 / 0.4), oklch(0.62 0.19 198 / 0.7))",
                filter: "blur(10px)",
              }}
              animate={{
                rotate: [0, 360],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                rotate: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                opacity: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            />

            {/* Inner bright core pulse */}
            <motion.div
              className="absolute rounded-xl pointer-events-none"
              style={{
                inset: "-4px",
                background:
                  "radial-gradient(ellipse at 40% 40%, oklch(0.72 0.22 142 / 0.8) 0%, oklch(0.62 0.19 198 / 0.5) 50%, transparent 80%)",
                filter: "blur(6px)",
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [0.95, 1.1, 0.95],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />

            {/* Floating logo image */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              {/* Shimmer overlay on hover */}
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    className="absolute inset-0 z-20 rounded-lg pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                        width: "200%",
                        left: "-100%",
                      }}
                      animate={{ left: ["-100%", "100%"] }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <img
                src="/assets/uploads/edma-removebg-preview-019d268b-702a-721c-afe0-d5826f1d758c-1.png"
                alt="EDMA"
                className="h-14 w-auto object-contain relative z-10"
              />
            </motion.div>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const Icon = link.icon;
            const isHovered = hoveredLink === link.href;
            const isActive = activeSection === link.id && !isHovered;
            const isLit = isHovered || isActive;
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.06 * i,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <a
                  href={link.href}
                  className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 group border"
                  style={{
                    borderColor: isLit
                      ? isActive
                        ? "oklch(0.72 0.22 142 / 0.55)"
                        : "oklch(0.62 0.19 198 / 0.4)"
                      : "transparent",
                    backgroundColor: isLit
                      ? isActive
                        ? "oklch(0.72 0.22 142 / 0.12)"
                        : "oklch(0.62 0.19 198 / 0.08)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 0 22px oklch(0.72 0.22 142 / 0.45), 0 0 8px oklch(0.62 0.19 198 / 0.3), inset 0 0 8px oklch(0.72 0.22 142 / 0.1)"
                      : isHovered
                        ? "0 0 18px oklch(0.62 0.19 198 / 0.35), 0 0 6px oklch(0.72 0.22 142 / 0.2)"
                        : undefined,
                  }}
                  data-ocid="nav.link"
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {/* Active indicator dot */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        style={{ background: "oklch(0.72 0.22 142)" }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <motion.span
                    animate={
                      isHovered
                        ? { scale: 1.2, rotate: 8 }
                        : isActive
                          ? { scale: 1.15, rotate: 0 }
                          : { scale: 1, rotate: 0 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="flex-shrink-0"
                    style={{
                      color: isLit ? link.color : "oklch(0.62 0.19 198 / 0.7)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </motion.span>

                  {/* Label with gradient when lit */}
                  <span
                    className="relative transition-all duration-300"
                    style={{
                      color: isLit ? "transparent" : "oklch(0.78 0.05 220)",
                      backgroundClip: isLit ? "text" : undefined,
                      WebkitBackgroundClip: isLit ? "text" : undefined,
                      backgroundImage: isLit
                        ? "linear-gradient(90deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))"
                        : undefined,
                    }}
                  >
                    {link.label}
                  </span>

                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full origin-left"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
                    }}
                    animate={{ scaleX: isLit ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />

                  {/* Glow particle */}
                  <AnimatePresence>
                    {isLit && (
                      <motion.span
                        className="absolute inset-0 rounded-full pointer-events-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                          background: isActive
                            ? "radial-gradient(ellipse at center, oklch(0.72 0.22 142 / 0.15) 0%, transparent 70%)"
                            : "radial-gradient(ellipse at center, oklch(0.62 0.19 198 / 0.12) 0%, transparent 70%)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              </motion.li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact">
            <Button
              size="sm"
              className="relative overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shimmer"
              data-ocid="nav.primary_button"
            >
              Get In Touch
            </Button>
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-md border-b border-border"
          >
            <ul className="px-4 py-4 pb-4 flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 border group"
                      style={{
                        color: isActive
                          ? "transparent"
                          : "oklch(0.78 0.05 220)",
                        backgroundClip: isActive ? "text" : undefined,
                        WebkitBackgroundClip: isActive ? "text" : undefined,
                        backgroundImage: isActive
                          ? "linear-gradient(90deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))"
                          : undefined,
                        borderColor: isActive
                          ? "oklch(0.72 0.22 142 / 0.4)"
                          : "transparent",
                        backgroundColor: isActive
                          ? "oklch(0.72 0.22 142 / 0.08)"
                          : "transparent",
                        boxShadow: isActive
                          ? "0 0 16px oklch(0.72 0.22 142 / 0.25)"
                          : undefined,
                      }}
                      data-ocid="nav.link"
                    >
                      <span
                        className="flex items-center justify-center w-8 h-8 rounded-lg"
                        style={{
                          background: `${link.color.replace(")", isActive ? " / 0.25)" : " / 0.15)")}`,
                          color: link.color,
                          boxShadow: isActive
                            ? `0 0 10px ${link.color.replace(")", " / 0.5)")}`
                            : undefined,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span
                        style={{
                          color: isActive ? "transparent" : undefined,
                          backgroundClip: isActive ? "text" : undefined,
                          WebkitBackgroundClip: isActive ? "text" : undefined,
                          backgroundImage: isActive
                            ? "linear-gradient(90deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))"
                            : undefined,
                        }}
                        className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-lime-400 transition-all duration-200"
                      >
                        {link.label}
                      </span>
                      <motion.span
                        className="ml-auto transition-opacity"
                        style={{ color: link.color, opacity: isActive ? 1 : 0 }}
                        animate={{ opacity: isActive ? 1 : 0 }}
                      >
                        ●
                      </motion.span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
