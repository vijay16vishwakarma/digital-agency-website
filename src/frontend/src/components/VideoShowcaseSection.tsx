import { useEffect, useRef, useState } from "react";

const SCENES = [
  "brand",
  "stats",
  "services",
  "results",
  "global",
  "cta",
] as const;
type Scene = (typeof SCENES)[number];

const SCENE_DURATION = 3000;

const floatingParticles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.7 + 1.2) % 100}%`,
  delay: `${(i * 0.37) % 4}s`,
  duration: `${4 + (i % 5)}s`,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
}));

const DOT_MAP_ROWS = 9;
const DOT_MAP_COLS = 20;

const countryLabels = [
  { label: "India", top: "55%", left: "62%", delay: "0s", active: true },
  { label: "UK", top: "28%", left: "45%", delay: "0.4s", active: true },
  { label: "USA", top: "38%", left: "18%", delay: "0.8s", active: true },
  { label: "UAE", top: "52%", left: "55%", delay: "1.2s", active: true },
  { label: "Australia", top: "72%", left: "78%", delay: "1.6s", active: true },
  { label: "Canada", top: "30%", left: "14%", delay: "2s", active: false },
  { label: "Germany", top: "28%", left: "50%", delay: "2.4s", active: false },
];

const services = [
  { icon: "🔍", label: "SEO", color: "#22d3ee", delay: "0s" },
  { icon: "🖥️", label: "Web Design", color: "#a3e635", delay: "0.2s" },
  { icon: "📱", label: "App Dev", color: "#f472b6", delay: "0.4s" },
  { icon: "📢", label: "Digital Marketing", color: "#fb923c", delay: "0.6s" },
  { icon: "🎨", label: "Graphic Design", color: "#c084fc", delay: "0.8s" },
];

const results = [
  { metric: "320%", label: "Traffic Growth", delay: "0s" },
  { metric: "5x", label: "ROI for Clients", delay: "0.5s" },
  { metric: "98%", label: "Client Retention", delay: "1s" },
  { metric: "#1", label: "Agency in Indore", delay: "1.5s" },
];

const LOGO_SRC =
  "/assets/uploads/edma-removebg-preview-019d2bb4-6362-75ca-8b1b-03b2060df5cf-1.png";
const LOGO_GLOW = "drop-shadow(0 0 24px oklch(0.62 0.2 195 / 0.6))";

export default function VideoShowcaseSection() {
  const [currentScene, setCurrentScene] = useState<Scene>("brand");
  const [visible, setVisible] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scene cycling
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentScene((prev) => {
        const idx = SCENES.indexOf(prev);
        const next = SCENES[(idx + 1) % SCENES.length];
        if (next === "stats") setStatsAnimated(false);
        return next;
      });
    }, SCENE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Trigger stats animation when stats scene becomes active
  useEffect(() => {
    if (currentScene === "stats") {
      const t = setTimeout(() => setStatsAnimated(true), 50);
      return () => clearTimeout(t);
    }
  }, [currentScene]);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-420px) scale(0.4); opacity: 0; }
        }
        @keyframes auroraFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,-30px) scale(1.15); }
        }
        @keyframes auroraFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-35px,25px) scale(1.1); }
        }
        @keyframes auroraFloat3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20px,40px) scale(1.2); }
        }
        @keyframes sceneFadeIn {
          0% { opacity:0; transform: scale(0.95) blur(8px); }
          100% { opacity:1; transform: scale(1) blur(0px); }
        }
        @keyframes countUp {
          from { opacity:0; transform: translateY(24px); }
          to { opacity:1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 12px 2px oklch(0.62 0.2 195 / 0.5); }
          50% { box-shadow: 0 0 32px 8px oklch(0.62 0.2 195 / 0.85); }
        }
        @keyframes blinkDot {
          0%,100% { opacity:1; }
          50% { opacity:0; }
        }
        @keyframes dotPulseRing {
          0% { transform: scale(1); opacity:0.9; }
          100% { transform: scale(3.5); opacity:0; }
        }
        @keyframes serviceCardIn {
          from { opacity:0; transform: translateX(-50px) scale(0.8); }
          to { opacity:1; transform: translateX(0) scale(1); }
        }
        @keyframes resultIn {
          from { opacity:0; transform: translateY(30px); }
          to { opacity:1; transform: translateY(0); }
        }
        @keyframes countryPop {
          0% { opacity:0; transform: scale(0.5); }
          70% { opacity:1; transform: scale(1.15); }
          100% { opacity:1; transform: scale(1); }
        }
        @keyframes radialBurst {
          0% { transform: scale(0.1); opacity:0.8; }
          100% { transform: scale(2.2); opacity:0; }
        }
        @keyframes ctaGlow {
          0%,100% { box-shadow: 0 0 20px 4px oklch(0.72 0.22 155 / 0.5); }
          50% { box-shadow: 0 0 48px 16px oklch(0.72 0.22 155 / 0.9); }
        }
        @keyframes particleBurst {
          0% { transform: scale(0) translate(0,0); opacity:1; }
          100% { transform: scale(1) translate(var(--dx), var(--dy)); opacity:0; }
        }
        @keyframes sectionFadeUp {
          from { opacity:0; transform: translateY(48px); }
          to { opacity:1; transform: translateY(0); }
        }
        @keyframes logoTextIn {
          0% { opacity:0; filter: blur(12px) drop-shadow(0 0 0px transparent); }
          100% { opacity:1; filter: blur(0) drop-shadow(0 0 24px oklch(0.62 0.2 195 / 0.6)); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes borderGlow {
          0%,100% { border-color: oklch(0.62 0.2 195 / 0.5); box-shadow: 0 0 30px oklch(0.62 0.2 195 / 0.2); }
          50% { border-color: oklch(0.62 0.2 195 / 0.9); box-shadow: 0 0 60px oklch(0.62 0.2 195 / 0.4), 0 0 120px oklch(0.62 0.2 195 / 0.1); }
        }
        .scene-animate { animation: sceneFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .section-reveal { animation: sectionFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .scanline-overlay {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,255,255,0.015) 3px,
            rgba(0,255,255,0.015) 4px
          );
          pointer-events: none;
        }
        .grid-overlay {
          background-image:
            linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="py-12 md:py-24 px-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #070d1a 0%, #050b15 100%)",
        }}
      >
        {/* Section header */}
        <div
          className={`text-center mb-12 ${visible ? "section-reveal" : "opacity-0"}`}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{
              background: "oklch(0.62 0.2 195 / 0.15)",
              border: "1px solid oklch(0.62 0.2 195 / 0.4)",
              color: "oklch(0.82 0.18 195)",
            }}
          >
            Our Story
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{
              background:
                "linear-gradient(135deg, #fff 0%, oklch(0.82 0.18 195) 50%, oklch(0.72 0.22 155) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            See EDMA In Action
          </h2>
          <p
            className="text-sm tracking-widest"
            style={{ color: "oklch(0.65 0.08 220)" }}
          >
            500+ Projects Delivered · 200+ Happy Clients · 12 Countries Reached
          </p>
        </div>

        {/* Cinema frame */}
        <div
          className={`relative mx-auto max-w-4xl ${visible ? "section-reveal" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div
            data-ocid="video_showcase.canvas_target"
            className="relative overflow-hidden rounded-2xl"
            style={{
              border: "1.5px solid oklch(0.62 0.2 195 / 0.5)",
              animation: "borderGlow 3s ease-in-out infinite",
              background: "#060c18",
              aspectRatio: "16/9",
              minHeight: "320px",
            }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-overlay z-10" />
            {/* Scanline overlay */}
            <div className="absolute inset-0 scanline-overlay z-10" />

            {/* Aurora orbs */}
            <div
              className="absolute rounded-full"
              style={{
                width: 340,
                height: 340,
                top: "-80px",
                left: "-80px",
                background:
                  "radial-gradient(circle, oklch(0.62 0.2 195 / 0.18) 0%, transparent 70%)",
                animation: "auroraFloat1 8s ease-in-out infinite",
                filter: "blur(30px)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 280,
                height: 280,
                bottom: "-60px",
                right: "-60px",
                background:
                  "radial-gradient(circle, oklch(0.72 0.22 155 / 0.14) 0%, transparent 70%)",
                animation: "auroraFloat2 10s ease-in-out infinite",
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 200,
                height: 200,
                top: "40%",
                left: "50%",
                background:
                  "radial-gradient(circle, oklch(0.62 0.25 280 / 0.1) 0%, transparent 70%)",
                animation: "auroraFloat3 12s ease-in-out infinite",
                filter: "blur(30px)",
              }}
            />

            {/* Floating particles */}
            {floatingParticles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full z-20 pointer-events-none"
                style={{
                  left: p.left,
                  bottom: "0px",
                  width: p.size,
                  height: p.size,
                  background:
                    p.id % 2 === 0
                      ? "oklch(0.82 0.18 195)"
                      : "oklch(0.82 0.2 155)",
                  opacity: 0.7,
                  animation: `floatUp ${p.duration} ${p.delay} linear infinite`,
                }}
              />
            ))}

            {/* LIVE badge */}
            <div
              className="absolute top-3 right-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(6,12,24,0.8)",
                border: "1px solid rgba(239,68,68,0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-red-500"
                style={{ animation: "blinkDot 1s ease-in-out infinite" }}
              />
              <span className="text-xs font-bold text-red-400 tracking-widest">
                PROMO
              </span>
            </div>

            {/* Scene content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              {currentScene === "brand" && <BrandScene />}
              {currentScene === "stats" && (
                <StatsScene animated={statsAnimated} />
              )}
              {currentScene === "services" && <ServicesScene />}
              {currentScene === "results" && <ResultsScene />}
              {currentScene === "global" && <GlobalScene />}
              {currentScene === "cta" && <CTAScene />}
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
              {SCENES.map((s) => {
                const active = s === currentScene;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setCurrentScene(s)}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: active ? 24 : 8,
                      height: 8,
                      background: active
                        ? "oklch(0.82 0.18 195)"
                        : "oklch(0.4 0.05 220)",
                      boxShadow: active
                        ? "0 0 10px 2px oklch(0.62 0.2 195 / 0.7)"
                        : "none",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* CTAs below */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 ${visible ? "section-reveal" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="#contact"
            data-ocid="video_showcase.primary_button"
            className="px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.2 195), oklch(0.72 0.22 155))",
              color: "#060c18",
              animation: "ctaGlow 2.5s ease-in-out infinite",
            }}
          >
            Get a Free Quote →
          </a>
          <a
            href="#services"
            data-ocid="video_showcase.secondary_button"
            className="px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300"
            style={{
              border: "1.5px solid oklch(0.62 0.2 195 / 0.5)",
              color: "oklch(0.82 0.18 195)",
              background: "oklch(0.62 0.2 195 / 0.07)",
            }}
          >
            Explore Our Services ↓
          </a>
        </div>
      </section>
    </>
  );
}

// ──────────────────────────────────────────────
// Scene: Brand Intro
// ──────────────────────────────────────────────
function BrandScene() {
  return (
    <div className="scene-animate text-center px-8">
      {/* Radial burst */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 80,
              height: 200 + i * 80,
              border: "1px solid oklch(0.62 0.2 195 / 0.3)",
              animation: `radialBurst ${1.8 + i * 0.5}s ${i * 0.4}s ease-out infinite`,
            }}
          />
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <img
          src={LOGO_SRC}
          alt="EDMA – Elite Digital Marketing Agency"
          style={{
            maxWidth: 280,
            height: "auto",
            filter: LOGO_GLOW,
            animation: "logoTextIn 0.8s cubic-bezier(0.16,1,0.3,1) both",
            margin: "0 auto 8px",
            display: "block",
          }}
        />
        <div
          className="text-sm md:text-base font-light tracking-widest uppercase"
          style={{
            color: "oklch(0.72 0.12 195)",
            animation: "countUp 0.8s 0.4s both",
          }}
        >
          Elite Digital Marketing Agency
        </div>
        <div
          className="mt-4 inline-block px-3 py-1 rounded-full text-xs tracking-widest font-bold"
          style={{
            background: "oklch(0.72 0.22 155 / 0.15)",
            border: "1px solid oklch(0.72 0.22 155 / 0.5)",
            color: "oklch(0.82 0.2 155)",
            animation: "countUp 0.8s 0.7s both",
          }}
        >
          Indore · India · Global
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Scene: Stats
// ──────────────────────────────────────────────
function StatsScene({ animated }: { animated: boolean }) {
  const stats = [
    {
      value: "500+",
      label: "Projects Delivered",
      color: "oklch(0.82 0.18 195)",
    },
    { value: "200+", label: "Happy Clients", color: "oklch(0.82 0.2 155)" },
    { value: "12", label: "Countries Reached", color: "oklch(0.82 0.18 280)" },
  ];
  return (
    <div className="scene-animate flex flex-col items-center w-full px-8">
      <div
        className="text-xs font-bold uppercase tracking-widest mb-6"
        style={{ color: "oklch(0.6 0.08 220)" }}
      >
        Our Impact By Numbers
      </div>
      <div className="grid grid-cols-3 gap-6 w-full max-w-xl">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center text-center p-4 rounded-xl"
            style={{
              background: "oklch(0.12 0.04 220 / 0.8)",
              border: `1px solid ${s.color}40`,
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.6s ${i * 0.18}s, transform 0.6s ${i * 0.18}s`,
              animation: animated
                ? `glowPulse 2.5s ${i * 0.3}s ease-in-out infinite`
                : "none",
            }}
          >
            <span
              className="text-3xl md:text-4xl font-black"
              style={{ color: s.color }}
            >
              {s.value}
            </span>
            <span
              className="text-xs mt-1"
              style={{ color: "oklch(0.65 0.06 220)" }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Scene: Services
// ──────────────────────────────────────────────
function ServicesScene() {
  return (
    <div className="scene-animate flex flex-col items-center w-full px-6">
      <div
        className="text-xs font-bold uppercase tracking-widest mb-6"
        style={{ color: "oklch(0.6 0.08 220)" }}
      >
        What We Do Best
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {services.map((svc) => (
          <div
            key={svc.label}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm"
            style={{
              background: `${svc.color}18`,
              border: `1.5px solid ${svc.color}60`,
              color: svc.color,
              animation: `serviceCardIn 0.5s ${svc.delay} cubic-bezier(0.16,1,0.3,1) both`,
              boxShadow: `0 0 12px ${svc.color}30`,
            }}
          >
            <span className="text-lg">{svc.icon}</span>
            {svc.label}
          </div>
        ))}
      </div>
      <div
        className="mt-6 text-xs tracking-widest"
        style={{
          color: "oklch(0.55 0.06 220)",
          animation: "countUp 0.6s 1s both",
        }}
      >
        100+ Services · 5 Core Categories
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Scene: Results
// ──────────────────────────────────────────────
function ResultsScene() {
  return (
    <div className="scene-animate flex flex-col items-center w-full px-8">
      <div
        className="text-xs font-bold uppercase tracking-widest mb-5"
        style={{ color: "oklch(0.6 0.08 220)" }}
      >
        Real Results, Real Growth
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {results.map((r) => (
          <div
            key={r.label}
            className="relative overflow-hidden p-4 rounded-xl text-center"
            style={{
              background: "oklch(0.12 0.04 220 / 0.8)",
              border: "1px solid oklch(0.62 0.2 195 / 0.25)",
              animation: `resultIn 0.5s ${r.delay} cubic-bezier(0.16,1,0.3,1) both`,
            }}
          >
            <div
              className="text-2xl md:text-3xl font-black"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.82 0.18 195), oklch(0.82 0.2 155))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {r.metric}
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.62 0.06 220)" }}
            >
              {r.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Scene: Global Reach
// ──────────────────────────────────────────────
function GlobalScene() {
  return (
    <div className="scene-animate flex flex-col items-center w-full px-4">
      <div
        className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ color: "oklch(0.6 0.08 220)" }}
      >
        Our Global Reach
      </div>
      {/* Dot map */}
      <div
        className="relative"
        style={{ width: "100%", maxWidth: 520, height: 140 }}
      >
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${DOT_MAP_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${DOT_MAP_ROWS}, 1fr)`,
            gap: 2,
          }}
        >
          {Array.from({ length: DOT_MAP_ROWS * DOT_MAP_COLS }).map((_, i) => {
            const dotKey = `dot-${i}`;
            const col = i % DOT_MAP_COLS;
            const row = Math.floor(i / DOT_MAP_COLS);
            // Rough continent mask
            const isLand =
              (col >= 3 && col <= 7 && row >= 3 && row <= 7) || // Americas
              (col >= 8 && col <= 11 && row >= 1 && row <= 6) || // Europe
              (col >= 9 && col <= 13 && row >= 3 && row <= 7) || // Africa
              (col >= 12 && col <= 16 && row >= 2 && row <= 6) || // Asia
              (col >= 15 && col <= 18 && row >= 5 && row <= 8); // SE Asia / Australia
            return (
              <div
                key={dotKey}
                className="rounded-full"
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  background: isLand
                    ? "oklch(0.62 0.2 195 / 0.55)"
                    : "oklch(0.25 0.04 220 / 0.3)",
                  transition: "background 0.3s",
                }}
              />
            );
          })}
        </div>
        {/* Ping from India (approx col 14, row 5) */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 12 + i * 8,
              height: 12 + i * 8,
              top: `${(5 / DOT_MAP_ROWS) * 100 - 4}%`,
              left: `${(14 / DOT_MAP_COLS) * 100 - 3}%`,
              border: "1.5px solid oklch(0.72 0.22 155)",
              animation: `dotPulseRing ${1.5 + i * 0.5}s ${i * 0.4}s ease-out infinite`,
              marginTop: -(6 + i * 4),
              marginLeft: -(6 + i * 4),
            }}
          />
        ))}
        {/* Country labels */}
        {countryLabels.slice(0, 5).map((c) => (
          <div
            key={c.label}
            className="absolute px-1.5 py-0.5 rounded text-xs font-bold"
            style={{
              top: c.top,
              left: c.left,
              background: "oklch(0.62 0.2 195 / 0.2)",
              border: "1px solid oklch(0.62 0.2 195 / 0.5)",
              color: "oklch(0.82 0.14 195)",
              animation: `countryPop 0.5s ${c.delay} cubic-bezier(0.16,1,0.3,1) both`,
              transform: "translate(-50%, -50%)",
              whiteSpace: "nowrap",
              fontSize: 10,
            }}
          >
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Scene: CTA
// ──────────────────────────────────────────────
function CTAScene() {
  // Burst particles
  const burst = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * 360,
    dist: 60 + (i % 3) * 20,
  }));
  return (
    <div className="scene-animate flex flex-col items-center text-center px-8 relative">
      {/* Particle burst */}
      {burst.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={
            {
              width: 5,
              height: 5,
              background:
                p.id % 2 === 0 ? "oklch(0.82 0.18 195)" : "oklch(0.82 0.2 155)",
              top: "50%",
              left: "50%",
              "--dx": `${Math.cos((p.angle * Math.PI) / 180) * p.dist}px`,
              "--dy": `${Math.sin((p.angle * Math.PI) / 180) * p.dist}px`,
              animation: `particleBurst 1.5s ${(p.id * 0.05).toFixed(2)}s ease-out infinite`,
            } as React.CSSProperties
          }
        />
      ))}
      <img
        src={LOGO_SRC}
        alt="EDMA"
        style={{
          maxWidth: 160,
          height: "auto",
          filter: LOGO_GLOW,
          animation: "logoTextIn 0.7s both",
          margin: "0 auto 12px",
          display: "block",
        }}
      />
      <div
        className="text-xl md:text-3xl font-black mb-2"
        style={{
          background:
            "linear-gradient(135deg, #fff 0%, oklch(0.82 0.18 195) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "countUp 0.6s 0.2s both",
        }}
      >
        Ready to Grow?
      </div>
      <div
        className="text-sm mb-6"
        style={{
          color: "oklch(0.65 0.08 220)",
          animation: "countUp 0.6s 0.3s both",
        }}
      >
        Join 200+ businesses scaling with EDMA
      </div>
      <a
        href="#contact"
        className="px-8 py-3 rounded-full font-black text-sm uppercase tracking-wider"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.2 195), oklch(0.72 0.22 155))",
          color: "#060c18",
          animation: "ctaGlow 2s ease-in-out infinite, countUp 0.6s 0.6s both",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Get a Free Quote →
      </a>
    </div>
  );
}
