import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const typingPhrases = [
  "ROI-Driven Marketing",
  "Brand Transformation",
  "SEO Domination",
  "Web & App Mastery",
  "Creative Excellence",
  "Growth That Scales",
];

function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = typingPhrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < phrase.length) {
      timeout = setTimeout(
        () => setDisplayed(phrase.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!isDeleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="gradient-text">{displayed}</span>
      <span
        className="inline-block w-0.5 h-7 md:h-9 bg-primary ml-0.5"
        style={{ animation: "blink 1s step-end infinite" }}
      />
    </span>
  );
}

// --- Particle system ---
type ParticleType = "dot" | "diamond" | "circle";
interface Particle {
  id: string;
  type: ParticleType;
  size: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
}

const particles: Particle[] = [
  {
    id: "p1",
    type: "dot",
    size: 5,
    left: "8%",
    delay: "0s",
    duration: "9s",
    color: "oklch(0.62 0.19 198 / 0.6)",
  },
  {
    id: "p2",
    type: "diamond",
    size: 7,
    left: "18%",
    delay: "2s",
    duration: "11s",
    color: "oklch(0.72 0.22 142 / 0.5)",
  },
  {
    id: "p3",
    type: "circle",
    size: 10,
    left: "30%",
    delay: "5s",
    duration: "8s",
    color: "oklch(0.65 0.22 340 / 0.4)",
  },
  {
    id: "p4",
    type: "dot",
    size: 4,
    left: "42%",
    delay: "1s",
    duration: "10s",
    color: "oklch(0.62 0.22 60 / 0.5)",
  },
  {
    id: "p5",
    type: "diamond",
    size: 6,
    left: "55%",
    delay: "3.5s",
    duration: "12s",
    color: "oklch(0.62 0.19 198 / 0.5)",
  },
  {
    id: "p6",
    type: "circle",
    size: 8,
    left: "68%",
    delay: "6s",
    duration: "9s",
    color: "oklch(0.55 0.22 290 / 0.4)",
  },
  {
    id: "p7",
    type: "dot",
    size: 5,
    left: "78%",
    delay: "0.5s",
    duration: "7s",
    color: "oklch(0.72 0.22 142 / 0.5)",
  },
  {
    id: "p8",
    type: "diamond",
    size: 4,
    left: "88%",
    delay: "4s",
    duration: "10s",
    color: "oklch(0.65 0.22 340 / 0.5)",
  },
  {
    id: "p9",
    type: "circle",
    size: 9,
    left: "22%",
    delay: "7s",
    duration: "8s",
    color: "oklch(0.62 0.22 60 / 0.4)",
  },
  {
    id: "p10",
    type: "dot",
    size: 3,
    left: "63%",
    delay: "2.5s",
    duration: "13s",
    color: "oklch(0.55 0.22 290 / 0.5)",
  },
  {
    id: "p11",
    type: "diamond",
    size: 5,
    left: "48%",
    delay: "8s",
    duration: "9s",
    color: "oklch(0.62 0.19 198 / 0.4)",
  },
  {
    id: "p12",
    type: "circle",
    size: 6,
    left: "93%",
    delay: "1.5s",
    duration: "11s",
    color: "oklch(0.72 0.22 142 / 0.4)",
  },
];

function ParticleEl({ p }: { p: Particle }) {
  const shapeStyle: React.CSSProperties =
    p.type === "diamond"
      ? { transform: "rotate(45deg)", borderRadius: "2px" }
      : p.type === "circle"
        ? { borderRadius: "50%", boxShadow: `0 0 ${p.size * 2}px ${p.color}` }
        : { borderRadius: "50%" };

  return (
    <div
      className="absolute bottom-0"
      style={{
        width: p.size,
        height: p.size,
        left: p.left,
        background: p.color,
        animation: `particle-rise ${p.duration} linear ${p.delay} infinite`,
        ...shapeStyle,
      }}
    />
  );
}

// --- Stat counter ---
const stats = [
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "★", label: "Avg. Rating" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

function StatCounter({
  value,
  suffix,
  label,
}: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col items-center px-5 py-3 rounded-xl border border-primary/10 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default"
      style={{ minWidth: 80 }}
    >
      <span className="text-2xl md:text-3xl font-bold font-display gradient-text group-hover:drop-shadow-[0_0_12px_oklch(0.62_0.19_198_/_0.7)] transition-all duration-300">
        {count}
        {suffix}
      </span>
      <span className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
        {label}
      </span>
    </motion.div>
  );
}

const chevronDelays = [
  { id: "chev-1", delay: 0, opacity: 0.4 },
  { id: "chev-2", delay: 0.18, opacity: 0.6 },
  { id: "chev-3", delay: 0.36, opacity: 0.8 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 3D mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 30,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* === BACKGROUND SYSTEM === */}
      <div className="absolute inset-0 bg-background" />

      {/* Rotating conic gradient mesh */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ animation: "conic-spin 30s linear infinite" }}
      >
        <div
          className="absolute inset-[-50%]"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, oklch(0.62 0.19 198 / 0.4), oklch(0.72 0.22 142 / 0.3), oklch(0.55 0.22 290 / 0.3), oklch(0.65 0.22 340 / 0.2), oklch(0.62 0.22 60 / 0.2), oklch(0.62 0.19 198 / 0.4))",
          }}
        />
      </div>

      {/* Aurora blobs */}
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[100px] opacity-25 pointer-events-none"
        style={{
          background: "oklch(0.62 0.19 198)",
          animation: "aurora-drift-1 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{
          background: "oklch(0.55 0.18 195)",
          animation: "aurora-drift-2 22s ease-in-out 2s infinite",
          transform: "translate(-50%,-50%)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[80px] opacity-20 pointer-events-none"
        style={{
          background: "oklch(0.72 0.22 142)",
          animation: "aurora-drift-3 16s ease-in-out 1s infinite",
        }}
      />
      <div
        className="absolute top-20 right-1/4 w-[350px] h-[350px] rounded-full blur-[80px] opacity-15 pointer-events-none"
        style={{
          background: "oklch(0.65 0.22 340)",
          animation: "aurora-drift-1 14s ease-in-out 3s infinite reverse",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[70px] opacity-12 pointer-events-none"
        style={{
          background: "oklch(0.55 0.22 290)",
          animation: "aurora-drift-2 20s ease-in-out 5s infinite reverse",
        }}
      />

      {/* Animated dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.62 0.19 198 / 0.18) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "dot-pulse 5s ease-in-out infinite",
        }}
      />

      {/* Shooting stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute h-px w-32 top-[18%] left-[-10%] opacity-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.62 0.19 198), transparent)",
            animation: "shoot 8s ease-in-out 1s infinite",
          }}
        />
        <div
          className="absolute h-px w-48 top-[35%] left-[-10%] opacity-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.22 142), transparent)",
            animation: "shoot 8s ease-in-out 3.5s infinite",
          }}
        />
        <div
          className="absolute h-px w-24 top-[60%] left-[-10%] opacity-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.65 0.22 340), transparent)",
            animation: "shoot 8s ease-in-out 6s infinite",
          }}
        />
        <div
          className="absolute h-px w-40 top-[78%] left-[-10%] opacity-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.55 0.22 290), transparent)",
            animation: "shoot 8s ease-in-out 2s infinite",
          }}
        />
      </div>

      {/* Spinning rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-primary/5 pointer-events-none"
        style={{ animation: "spin-slow 25s linear infinite" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-accent/5 pointer-events-none"
        style={{ animation: "spin-slow 18s linear reverse infinite" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-primary/8 pointer-events-none"
        style={{ animation: "spin-slow 12s linear infinite" }}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <ParticleEl key={p.id} p={p} />
        ))}
      </div>

      {/* === CONTENT (3D tilt wrapper) === */}
      <motion.div
        ref={contentRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 container mx-auto px-4 md:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-xs font-medium tracking-widest uppercase mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Award-Winning Digital Agency • Since 2014
        </motion.div>

        {/* Headline — word by word with unique animations */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
          <span className="inline-flex flex-wrap justify-center gap-x-4 gap-y-1">
            {/* Word 1: slide from left + blur */}
            <motion.span
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="inline-block"
            >
              We
            </motion.span>
            {/* Word 2: spring scale from below */}
            <motion.span
              initial={{ opacity: 0, y: 60, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.45,
                ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
              }}
              className="inline-block"
            >
              Build
            </motion.span>
            {/* Word 3: zoom from large blur — gradient */}
            <motion.span
              initial={{ opacity: 0, filter: "blur(20px)", scale: 1.3 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="inline-block gradient-text"
              style={{ textShadow: "0 0 60px oklch(0.62 0.19 198 / 0.6)" }}
            >
              Digital
            </motion.span>
            {/* Word 4: drop + skew — italic */}
            <motion.span
              initial={{ opacity: 0, y: -40, skewX: 15 }}
              animate={{ opacity: 1, y: 0, skewX: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="inline-block font-normal text-foreground/80"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              Experiences
            </motion.span>
          </span>
        </h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
          className="text-lg md:text-2xl font-display font-semibold mb-5 h-10 flex items-center justify-center gap-2"
        >
          <TypewriterText />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.15, ease: "easeOut" }}
          className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Partner with EDMA to transform your brand into a digital powerhouse.
          From stunning websites to data-driven campaigns — we deliver results
          that move the needle.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 1.3,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
        >
          {/* Primary CTA — radar ping */}
          <a href="#portfolio" className="relative group">
            <span className="absolute inset-0 rounded-lg pointer-events-none">
              <span
                className="absolute inset-0 rounded-lg border border-primary/60"
                style={{ animation: "radar-ping 2s ease-out 0s infinite" }}
              />
              <span
                className="absolute inset-0 rounded-lg border border-primary/40"
                style={{ animation: "radar-ping 2s ease-out 0.5s infinite" }}
              />
            </span>
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 px-8 gap-2 shimmer"
              style={{
                boxShadow:
                  "0 0 40px oklch(0.62 0.19 198 / 0.5), 0 0 80px oklch(0.62 0.19 198 / 0.2)",
              }}
              data-ocid="hero.primary_button"
            >
              See Our Work <ArrowRight className="w-4 h-4" />
            </Button>
          </a>

          {/* Secondary CTA — rotating gradient border */}
          <a href="#contact" className="relative group">
            <span
              className="absolute inset-[-2px] rounded-[10px] pointer-events-none"
              style={{
                background:
                  "conic-gradient(from var(--angle, 0deg), oklch(0.62 0.19 198), oklch(0.72 0.22 142), oklch(0.65 0.22 340), oklch(0.62 0.19 198))",
                animation: "border-rotate 3s linear infinite",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "2px",
              }}
            />
            <Button
              size="lg"
              variant="outline"
              className="relative border-transparent text-foreground hover:bg-primary/10 gap-2 px-8 bg-background/30 backdrop-blur-sm"
              data-ocid="hero.secondary_button"
            >
              Get In Touch
            </Button>
          </a>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-xs text-muted-foreground/60 mt-2 tracking-wide w-full text-center sm:absolute sm:bottom-[-1.75rem] sm:left-0 sm:right-0"
          >
            Trusted by 50+ businesses across India &amp; beyond
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {stats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </motion.div>

        {/* Scroll indicator — cascading chevrons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col items-center gap-1"
        >
          <motion.p
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1"
          >
            Scroll to explore
          </motion.p>
          <div className="flex flex-col items-center gap-0.5">
            {chevronDelays.map((chev) => (
              <motion.div
                key={chev.id}
                animate={{ y: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.4,
                  delay: chev.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown
                  className="w-5 h-5"
                  style={{
                    color: `oklch(0.62 0.19 198 / ${chev.opacity})`,
                    filter:
                      chev.id === "chev-3"
                        ? "drop-shadow(0 0 6px oklch(0.62 0.19 198))"
                        : undefined,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
