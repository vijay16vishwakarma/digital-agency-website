import { Globe, Shield, Target, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const COUNTERS = [
  {
    value: 500,
    suffix: "+",
    label: "Projects Delivered",
    color: "oklch(0.62 0.19 198)",
  },
  {
    value: 200,
    suffix: "+",
    label: "Happy Clients",
    color: "oklch(0.72 0.22 142)",
  },
  {
    value: 12,
    suffix: "",
    label: "Countries Served",
    color: "oklch(0.65 0.22 60)",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention",
    color: "oklch(0.62 0.22 340)",
  },
  {
    value: 8,
    suffix: "+",
    label: "Years Experience",
    color: "oklch(0.55 0.18 290)",
  },
];

const INDUSTRIES = [
  "Retail",
  "Healthcare",
  "Real Estate",
  "Finance",
  "E-commerce",
  "Education",
  "Tech Startups",
  "Hospitality",
  "Legal",
  "Manufacturing",
  "NGOs",
  "Media & Entertainment",
  "Banking",
  "Automotive",
  "Food & Beverage",
  "Fashion",
  "Sports",
  "Logistics",
  "Insurance",
  "Agriculture",
  "Government",
  "Travel",
  "Pharma",
  "Construction",
];

const DIFFERENTIATORS = [
  {
    icon: Zap,
    title: "Full-Stack Expertise",
    desc: "From strategy to execution — design, dev, SEO, ads, and analytics under one roof.",
    color: "oklch(0.62 0.19 198)",
    bg: "oklch(0.62 0.19 198 / 0.12)",
  },
  {
    icon: Target,
    title: "ROI-Obsessed",
    desc: "Every campaign is built around measurable business outcomes, not vanity metrics.",
    color: "oklch(0.72 0.22 142)",
    bg: "oklch(0.72 0.22 142 / 0.12)",
  },
  {
    icon: Globe,
    title: "Global Reach, Local Roots",
    desc: "Headquartered in Indore, serving clients across 12 countries with local market insight.",
    color: "oklch(0.65 0.22 60)",
    bg: "oklch(0.65 0.22 60 / 0.12)",
  },
  {
    icon: Shield,
    title: "Transparent & Accountable",
    desc: "Real-time dashboards, weekly reports, no hidden fees. You always know what we\u2019re doing and why.",
    color: "oklch(0.62 0.22 340)",
    bg: "oklch(0.62 0.22 340 / 0.12)",
  },
];

// Duplicate with stable unique keys
const INDUSTRY_ITEMS = [
  ...INDUSTRIES.map((name) => ({ name, key: `a-${name}` })),
  ...INDUSTRIES.map((name) => ({ name, key: `b-${name}` })),
];

function CountUp({
  target,
  suffix,
  color,
  trigger,
}: { target: number; suffix: string; color: string; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 90;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1500 / totalFrames);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return (
    <span style={{ color }}>
      {count}
      {suffix}
    </span>
  );
}

export default function TrustSection() {
  const sectionRef = useRef(null);
  const counterRef = useRef(null);
  const cardsRef = useRef(null);
  const counterInView = useInView(counterRef, { once: true, margin: "-80px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });

  return (
    <section
      id="why-edma"
      className="py-12 md:py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Aurora background orbs */}
      <div
        className="absolute top-10 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.19 198 / 0.10), transparent 70%)",
          animation: "aurora-drift-1 20s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.22 142 / 0.08), transparent 70%)",
          animation: "aurora-drift-3 24s ease-in-out infinite",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.22 340 / 0.06), transparent 70%)",
          animation: "aurora-drift-2 28s ease-in-out infinite",
          filter: "blur(70px)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-primary" />
            Why EDMA?
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Numbers that <span className="gradient-text">speak for us</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A decade of delivering results across industries and borders.
            Here&apos;s what we&apos;ve built together with our clients.
          </p>
        </motion.div>

        {/* Counter row */}
        <div
          ref={counterRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
        >
          {COUNTERS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              animate={counterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="relative text-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
            >
              <div
                className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-60"
                style={{ background: c.color }}
              />
              <div className="font-display text-5xl font-bold mb-1 tracking-tight">
                <CountUp
                  target={c.value}
                  suffix={c.suffix}
                  color={c.color}
                  trigger={counterInView}
                />
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {c.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-10 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-px origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.62 0.19 198), oklch(0.72 0.22 142), transparent)",
            }}
          />
        </div>

        {/* Industry marquee */}
        <div className="mb-4">
          <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mb-6 font-semibold">
            Industries We Serve
          </p>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              className="flex gap-3 w-max"
              style={{ animation: "marquee-scroll 40s linear infinite" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.animationPlayState =
                  "paused";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.animationPlayState =
                  "running";
              }}
            >
              {INDUSTRY_ITEMS.map((item) => (
                <span
                  key={item.key}
                  className="flex-shrink-0 bg-card border border-primary/20 text-muted-foreground px-4 py-2 rounded-full text-sm font-medium hover:border-primary/50 hover:text-foreground transition-colors cursor-default"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 12px oklch(0.62 0.19 198 / 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-px origin-right"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.72 0.22 142), oklch(0.62 0.19 198), transparent)",
            }}
          />
        </div>

        {/* Why Choose EDMA — 4 cards */}
        <div className="text-center mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold">
            Why choose <span className="gradient-text">EDMA?</span>
          </h3>
        </div>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-5"
        >
          {DIFFERENTIATORS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 40 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{
                y: -8,
                boxShadow: `0 0 30px ${d.color.replace(")", " / 0.35)")}, 0 12px 40px oklch(0 0 0 / 0.2)`,
                transition: { duration: 0.2 },
              }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors group cursor-default relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${d.bg}, transparent)`,
                }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative"
                style={{ background: d.bg }}
              >
                <d.icon className="w-5 h-5" style={{ color: d.color }} />
              </div>
              <h4 className="font-display font-semibold text-foreground mb-2 text-base">
                {d.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
