import { Clock, Globe, TrendingUp, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: TrendingUp,
    value: 500,
    suffix: "+",
    label: "Projects Delivered",
    color: "oklch(0.62 0.19 198)",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    label: "Happy Clients",
    color: "oklch(0.72 0.22 142)",
  },
  {
    icon: Clock,
    value: 8,
    suffix: "+",
    label: "Years of Experience",
    color: "oklch(0.65 0.22 340)",
  },
  {
    icon: Globe,
    value: 12,
    suffix: "",
    label: "Countries Reached",
    color: "oklch(0.62 0.22 60)",
  },
];

const teamInitials = ["N", "A", "M", "J"];

function CountUp({
  target,
  suffix,
  trigger,
}: { target: number; suffix: string; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(target / 50);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const dividerRef = useRef<HTMLDivElement>(null);
  const dividerInView = useInView(dividerRef, { once: true, margin: "-50px" });

  const words = ["We", "help", "brands", "grow", "faster", "with"];

  return (
    <section id="about" className="py-12 md:py-32 relative overflow-hidden">
      {/* Aurora orbs background */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.19 198 / 0.12), transparent 70%)",
          animation: "aurora-drift-1 18s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.22 142 / 0.10), transparent 70%)",
          animation: "aurora-drift-3 22s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.22 340 / 0.08), transparent 70%)",
          animation: "aurora-drift-2 25s ease-in-out infinite",
          filter: "blur(60px)",
        }}
      />

      {/* Glowing dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* Morphing blob */}
      <div
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-80 h-80 opacity-10 pointer-events-none animate-morph"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Animated gradient divider */}
        <div ref={dividerRef} className="mb-12 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={dividerInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-px origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.62 0.19 198), oklch(0.72 0.22 142), transparent)",
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text with word-by-word reveal */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-primary" />
              ERMS Intelligence Private Limited • India&apos;s Leading Digital
              Agency • Est. 2016
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.08,
                    ease: "easeOut",
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
                className="gradient-text inline-block"
              >
                smart digital strategy
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-muted-foreground leading-relaxed mb-6"
            >
              Founded in 2016, ERMS Intelligence Private Limited operates as
              Elite Digital Marketing Agency (EDMA) — Indore&apos;s most trusted
              full-service digital partner. We work with ambitious businesses
              across India and worldwide — from startups to large enterprises —
              to build brands that dominate search, social, and every digital
              channel.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-muted-foreground leading-relaxed"
            >
              Our 40+ strong team of designers, developers, SEO specialists, and
              growth strategists brings deep expertise across every digital
              channel. We don&apos;t just deliver projects — we deliver results
              that directly impact your revenue.
            </motion.p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {teamInitials.map((initial, i) => (
                  <motion.div
                    key={initial}
                    initial={{ scale: 0, y: 20, opacity: 0 }}
                    animate={inView ? { scale: 1, y: 0, opacity: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 18,
                      delay: 0.8 + i * 0.1,
                    }}
                    className="w-9 h-9 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary"
                  >
                    {initial}
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">
                  40+ specialists
                </span>{" "}
                ready to grow your business
              </p>
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 0 30px ${stat.color.replace(")", " / 0.4)")}, 0 10px 40px oklch(0 0 0 / 0.2)`,
                  transition: { duration: 0.2 },
                }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors duration-300 group relative overflow-hidden shimmer cursor-default"
                style={{ "--stat-color": stat.color } as React.CSSProperties}
              >
                {/* Gradient bg on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color.replace(")", " / 0.1)")}, transparent)`,
                  }}
                />
                {/* Number glow pulse on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    animation: "stat-glow-pulse 2s ease-in-out infinite",
                  }}
                />
                <stat.icon
                  className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform"
                  style={{ color: stat.color }}
                />
                <div
                  className="font-display text-4xl font-bold text-foreground mb-1 group-hover:scale-105 transition-transform"
                  style={{
                    textShadow: `0 0 20px ${stat.color.replace(")", " / 0)")}`,
                  }}
                >
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    trigger={inView}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
