import { useEffect, useRef, useState } from "react";

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-label="external link"
      role="img"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <title>External link</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: `p${i}`,
  w: 2 + ((i * 17) % 4),
  h: 2 + ((i * 13) % 4),
  left: (i * 5.1) % 100,
  top: (i * 7.3) % 100,
  color: i % 2 === 0 ? "#00d4ff" : "#a0ff00",
  dur: 3 + ((i * 11) % 4),
  delay: (i * 0.37) % 3,
}));

const SUBSIDIARIES = [
  {
    id: "tech",
    category: "Technology",
    name: "Elite Infotech Solution",
    color: "#a0ff00",
    delay: 0.4,
    isHighlight: false,
    link: "https://www.eliteinfotechsolutions.com",
  },
  {
    id: "intel",
    category: "Intelligence",
    name: "ERMS Intelligence",
    color: "#00d4ff",
    delay: 0.5,
    isHighlight: false,
    link: "https://www.ermsintelligence.com",
  },
  {
    id: "mktg",
    category: "Marketing",
    name: "Elite Digital Marketing",
    color: "#ff6b35",
    delay: 0.6,
    isHighlight: true,
    link: null as string | null,
  },
];

export default function ErmsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #0a1628 100%)",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: p.color,
              animation: `erms-float ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing border top/bottom */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00d4ff, #a0ff00, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #a0ff00, #00d4ff, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className="space-y-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-60px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Subsidiary badge */}
            <div className="flex items-center gap-3">
              <div
                className="h-px w-12"
                style={{
                  background: "linear-gradient(90deg, #00d4ff, transparent)",
                }}
              />
              <span
                className="text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color: "#00d4ff" }}
              >
                A Subsidiary of ERMS
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #a0ff00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              More Than a
              <br />
              <span style={{ fontStyle: "italic" }}>Marketing Agency</span>
            </h2>

            {/* Description */}
            <div className="space-y-4">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#94b4d4" }}
              >
                Elite Digital Marketing is a proud subsidiary of{" "}
                <a
                  href="https://www.ermsintelligence.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold transition-all duration-300 hover:underline"
                  style={{ color: "#00d4ff" }}
                >
                  ERMS
                </a>{" "}
                — a parent company that brings together technology, data
                intelligence, and marketing under one unified group.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#00d4ff", fontWeight: 500 }}
              >
                This means our clients don’t just get a marketing agency. They
                get access to a complete business growth ecosystem — from
                software and ERP solutions to advanced analytics and performance
                marketing.
              </p>
            </div>

            {/* CTA Badges */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.ermsintelligence.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase border transition-all duration-300 group"
                style={{
                  borderColor: "#00d4ff",
                  color: "#00d4ff",
                  background: "rgba(0,212,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(0,212,255,0.15)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px rgba(0,212,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(0,212,255,0.05)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#a0ff00",
                    boxShadow: "0 0 8px #a0ff00",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                ERMS — Parent Company
                <ExternalLinkIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="https://www.eliteinfotechsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase border transition-all duration-300 group"
                style={{
                  borderColor: "#a0ff00",
                  color: "#a0ff00",
                  background: "rgba(160,255,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(160,255,0,0.15)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px rgba(160,255,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(160,255,0,0.05)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#a0ff00",
                    boxShadow: "0 0 8px #a0ff00",
                    animation: "pulse 2s ease-in-out infinite 0.5s",
                  }}
                />
                EITS — Technology
                <ExternalLinkIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right: Org Chart */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(60px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            {/* ERMS Parent Node */}
            <div className="flex justify-center mb-6">
              <a
                href="https://www.ermsintelligence.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #0090bb)",
                  color: "#000",
                  boxShadow:
                    "0 0 40px rgba(0,212,255,0.5), 0 8px 32px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "scale(1.05)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 60px rgba(0,212,255,0.8), 0 8px 32px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 40px rgba(0,212,255,0.5), 0 8px 32px rgba(0,0,0,0.4)";
                }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: "#a0ff00",
                    boxShadow: "0 0 10px #a0ff00",
                  }}
                />
                ERMS — Parent Company
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Vertical connector */}
            <div className="relative flex justify-center">
              <div
                className="w-px h-8"
                style={{
                  background:
                    "linear-gradient(180deg, #00d4ff, rgba(0,212,255,0.3))",
                }}
              />
            </div>
            {/* Horizontal connector */}
            <div
              className="relative mx-4 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,212,255,0.1), #00d4ff 20%, #00d4ff 80%, rgba(0,212,255,0.1))",
              }}
            />

            {/* Subsidiary cards */}
            <div className="grid grid-cols-3 gap-3">
              {SUBSIDIARIES.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <div
                    className="w-px h-8"
                    style={{
                      background: `linear-gradient(180deg, #00d4ff, ${item.color}50)`,
                    }}
                  />
                  <div
                    className="w-full p-4 rounded-xl text-center transition-all duration-300 border"
                    style={{
                      borderColor: item.isHighlight
                        ? item.color
                        : `${item.color}40`,
                      background: item.isHighlight
                        ? `linear-gradient(135deg, ${item.color}15, ${item.color}05)`
                        : "rgba(255,255,255,0.03)",
                      boxShadow: item.isHighlight
                        ? `0 0 20px ${item.color}30`
                        : "none",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(30px)",
                      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${item.delay}s`,
                    }}
                  >
                    <p
                      className="text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color: `${item.color}90` }}
                    >
                      {item.category}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-sm leading-tight transition-all duration-300 hover:underline block"
                        style={{ color: item.color }}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <p
                        className="font-bold text-sm leading-tight"
                        style={{ color: item.color }}
                      >
                        {item.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Background glow */}
            <div
              className="absolute inset-0 -z-10 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes erms-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
