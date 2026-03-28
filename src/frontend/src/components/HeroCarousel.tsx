import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroSection from "./HeroSection";

// ─── Slide Illustrations ────────────────────────────────────────────────────

const seoBars = [
  { h: 40, id: "seo-a" },
  { h: 60, id: "seo-b" },
  { h: 50, id: "seo-c" },
  { h: 80, id: "seo-d" },
  { h: 65, id: "seo-e" },
  { h: 90, id: "seo-f" },
  { h: 75, id: "seo-g" },
  { h: 100, id: "seo-h" },
];

function SEOAnimation() {
  return (
    <div className="relative w-72 h-64 flex items-end justify-center gap-3">
      {seoBars.map((bar, i) => (
        <motion.div
          key={bar.id}
          className="w-7 rounded-t-md"
          style={{
            background:
              "linear-gradient(to top, oklch(0.65 0.18 195), oklch(0.85 0.22 195))",
          }}
          initial={{ height: 0 }}
          animate={{ height: `${bar.h}%` }}
          transition={{
            delay: i * 0.12,
            duration: 0.8,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
            repeatType: "reverse",
          }}
        />
      ))}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-2xl"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
      >
        🔍
      </motion.div>
    </div>
  );
}

const ppcCards = [
  { label: "Google Ads", color: "oklch(0.65 0.18 135)", delay: 0 },
  { label: "Meta Ads", color: "oklch(0.65 0.18 260)", delay: 0.3 },
  { label: "LinkedIn", color: "oklch(0.6 0.18 220)", delay: 0.6 },
];

function PPCAnimation() {
  return (
    <div className="relative w-72 h-64 flex flex-col items-center justify-center gap-4">
      {ppcCards.map((c) => (
        <motion.div
          key={c.label}
          className="w-52 h-14 rounded-xl flex items-center justify-center text-sm font-semibold text-white shadow-lg cursor-pointer"
          style={{ background: c.color }}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: c.delay,
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2.5,
            repeatType: "reverse",
          }}
          whileHover={{ scale: 1.05 }}
        >
          {c.label}
          <motion.span
            className="ml-3 text-yellow-300"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 0.5,
              delay: c.delay + 0.8,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2.5,
            }}
          >
            👆
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

function SMMAnimation() {
  const [likes, setLikes] = useState(1247);
  const [shares, setShares] = useState(389);
  useEffect(() => {
    const t = setInterval(() => {
      setLikes((v) => v + Math.floor(Math.random() * 5 + 1));
      setShares((v) => v + Math.floor(Math.random() * 2));
    }, 800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-72 h-64 flex flex-col items-center justify-center gap-5">
      <motion.div
        className="w-60 rounded-2xl overflow-hidden shadow-xl"
        style={{ background: "oklch(0.18 0.04 220)" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="h-24"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.6 0.2 195), oklch(0.7 0.25 165))",
          }}
        />
        <div className="p-3">
          <p className="text-white text-xs font-medium">
            🔥 Trending Post — EDMA
          </p>
          <div
            className="flex gap-6 mt-2 text-xs"
            style={{ color: "oklch(0.75 0.1 195)" }}
          >
            <motion.span key={likes}>❤️ {likes.toLocaleString()}</motion.span>
            <motion.span key={shares}>🔁 {shares.toLocaleString()}</motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const browserBtnColors = [
  { color: "oklch(0.7 0.2 30)", id: "btn-red" },
  { color: "oklch(0.7 0.2 90)", id: "btn-yellow" },
  { color: "oklch(0.65 0.2 150)", id: "btn-green" },
];

const wireLines = [
  { w: 80, id: "wl-0", accent: true },
  { w: 60, id: "wl-1", accent: false },
  { w: 90, id: "wl-2", accent: false },
  { w: 40, id: "wl-3", accent: false },
  { w: 70, id: "wl-4", accent: false },
  { w: 50, id: "wl-5", accent: false },
  { w: 85, id: "wl-6", accent: false },
  { w: 55, id: "wl-7", accent: false },
];

function WebDesignAnimation() {
  return (
    <div className="relative w-72 h-64 flex items-center justify-center">
      <motion.div
        className="w-64 h-48 rounded-xl border-2 shadow-2xl flex flex-col overflow-hidden"
        style={{
          borderColor: "oklch(0.65 0.18 195)",
          background: "oklch(0.15 0.04 220)",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="h-7 flex items-center gap-2 px-3"
          style={{ background: "oklch(0.2 0.05 220)" }}
        >
          {browserBtnColors.map((b) => (
            <div
              key={b.id}
              className="w-3 h-3 rounded-full"
              style={{ background: b.color }}
            />
          ))}
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2">
          {wireLines.map((line, i) => (
            <motion.div
              key={line.id}
              className="h-2 rounded-full"
              style={{
                background: line.accent
                  ? "oklch(0.65 0.18 195)"
                  : "oklch(0.35 0.05 220)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${line.w}%` }}
              transition={{
                delay: i * 0.18,
                duration: 0.7,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-4 right-6 text-xl"
        animate={{ x: [0, 8, 0], y: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        🖱️
      </motion.div>
    </div>
  );
}

const terminalDots = [
  { color: "oklch(0.65 0.2 30)", id: "td-r" },
  { color: "oklch(0.65 0.2 135)", id: "td-g" },
  { color: "oklch(0.65 0.2 260)", id: "td-b" },
];

const terminalLines = [
  "$ npm run build",
  "> compiled successfully",
  "✓ TypeScript: pass",
  "✓ Tests: 47/47",
  "→ Deploying to cloud...",
  "🚀 Live at edma.app",
];

function WebDevAnimation() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    setVisible(0);
    let count = 0;
    const t = setInterval(() => {
      count += 1;
      if (count >= terminalLines.length) {
        clearInterval(t);
        return;
      }
      setVisible(count);
    }, 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      className="w-72 h-52 rounded-xl p-4 font-mono text-xs flex flex-col gap-1 shadow-2xl"
      style={{
        background: "oklch(0.1 0.02 220)",
        border: "1px solid oklch(0.3 0.08 195)",
      }}
    >
      <div className="flex gap-2 mb-2">
        {terminalDots.map((d) => (
          <div
            key={d.id}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: d.color }}
          />
        ))}
      </div>
      {terminalLines.slice(0, visible + 1).map((l, i) => (
        <motion.p
          key={l}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            color:
              i === visible ? "oklch(0.8 0.22 165)" : "oklch(0.6 0.08 195)",
          }}
        >
          {l}
        </motion.p>
      ))}
      <motion.span
        className="inline-block w-2 h-4 ml-1"
        style={{ background: "oklch(0.8 0.22 165)" }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  );
}

const appIcons = [
  { emoji: "📱", id: "ai-phone" },
  { emoji: "🛒", id: "ai-cart" },
  { emoji: "💬", id: "ai-chat" },
  { emoji: "📊", id: "ai-chart" },
  { emoji: "🎮", id: "ai-game" },
  { emoji: "🎵", id: "ai-music" },
];

function MobileAppAnimation() {
  return (
    <div className="relative w-72 h-64 flex items-center justify-center">
      <motion.div
        className="w-32 h-56 rounded-3xl border-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden"
        style={{
          borderColor: "oklch(0.65 0.18 195)",
          background: "oklch(0.12 0.03 220)",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-16 h-1 rounded-full mb-4"
          style={{ background: "oklch(0.4 0.05 220)" }}
        />
        <div className="grid grid-cols-3 gap-2 px-2">
          {appIcons.map((icon, i) => (
            <motion.div
              key={icon.id}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ background: "oklch(0.2 0.06 220)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: i * 0.15,
                duration: 0.4,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                repeatType: "reverse",
              }}
            >
              {icon.emoji}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-4 w-20 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: "oklch(0.65 0.18 195)" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          Open App
        </motion.div>
      </motion.div>
    </div>
  );
}

const brandColors = [
  { color: "oklch(0.65 0.22 195)", id: "bc-1" },
  { color: "oklch(0.7 0.25 165)", id: "bc-2" },
  { color: "oklch(0.65 0.2 260)", id: "bc-3" },
  { color: "oklch(0.7 0.22 30)", id: "bc-4" },
  { color: "oklch(0.75 0.22 90)", id: "bc-5" },
  { color: "oklch(0.65 0.22 330)", id: "bc-6" },
];

function BrandingAnimation() {
  return (
    <div className="relative w-72 h-64 flex items-center justify-center">
      <motion.div
        className="relative w-48 h-48"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {brandColors.map((c, i) => (
          <motion.div
            key={c.id}
            className="absolute w-16 h-16 rounded-full"
            style={{
              background: c.color,
              top: `${50 - 42 * Math.cos((i / brandColors.length) * 2 * Math.PI)}%`,
              left: `${50 + 42 * Math.sin((i / brandColors.length) * 2 * Math.PI)}%`,
              transform: "translate(-50%, -50%)",
              opacity: 0.8,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="absolute text-4xl font-black"
        style={{
          color: "oklch(0.95 0.01 220)",
          textShadow: "0 0 20px oklch(0.65 0.22 195)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        E
      </motion.div>
    </div>
  );
}

const contentWords = [
  "Strategy",
  "Blog Posts",
  "Reels",
  "Campaigns",
  "Whitepapers",
  "Infographics",
];

const contentLines = [
  { w: "90%", id: "cl-0" },
  { w: "75%", id: "cl-1" },
  { w: "85%", id: "cl-2" },
  { w: "60%", id: "cl-3" },
];

function ContentAnimation() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((v) => (v + 1) % contentWords.length),
      1200,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div
      className="w-64 h-52 rounded-xl p-5 flex flex-col gap-3 shadow-2xl"
      style={{
        background: "oklch(0.14 0.03 220)",
        border: "1px solid oklch(0.3 0.08 195)",
      }}
    >
      <div
        className="h-5 rounded-full"
        style={{ background: "oklch(0.65 0.18 195)", width: "70%" }}
      />
      {contentLines.map((line, i) => (
        <motion.div
          key={line.id}
          className="h-3 rounded-full"
          style={{ background: "oklch(0.3 0.06 220)" }}
          initial={{ width: 0 }}
          animate={{ width: line.w }}
          transition={{
            delay: i * 0.2,
            duration: 0.7,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
            repeatType: "reverse",
          }}
        />
      ))}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="mt-auto text-sm font-semibold"
          style={{ color: "oklch(0.75 0.2 165)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          ✍️ Creating: {contentWords[idx]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const ecomProducts = [
  { emoji: "👟", id: "ep-1" },
  { emoji: "👗", id: "ep-2" },
  { emoji: "📱", id: "ep-3" },
  { emoji: "💎", id: "ep-4" },
];

function EcommerceAnimation() {
  const [cart, setCart] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setCart((v) => (v < ecomProducts.length ? v + 1 : 0)),
      1200,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-72 h-64 flex flex-col items-center justify-center gap-4">
      <div className="flex gap-3">
        {ecomProducts.map((p, i) => (
          <motion.div
            key={p.id}
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-md"
            style={{
              background: "oklch(0.2 0.05 220)",
              border:
                i < cart
                  ? "2px solid oklch(0.65 0.22 165)"
                  : "2px solid transparent",
            }}
            animate={{ scale: i < cart ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex items-center gap-3 px-5 py-3 rounded-xl font-semibold text-white text-sm"
        style={{ background: "oklch(0.55 0.2 165)" }}
        animate={{ scale: cart > 0 ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 0.4 }}
      >
        🛒 Cart ({cart} items)
        <motion.span
          className="text-yellow-300"
          animate={{ opacity: cart > 0 ? 1 : 0.3 }}
        >
          ${(cart * 49.99).toFixed(2)}
        </motion.span>
      </motion.div>
    </div>
  );
}

const milestones = [
  { label: "Audit", id: "ms-1" },
  { label: "Strategy", id: "ms-2" },
  { label: "Launch", id: "ms-3" },
  { label: "Optimize", id: "ms-4" },
  { label: "Scale", id: "ms-5" },
];

function StrategyAnimation() {
  return (
    <div className="w-72 h-52 flex flex-col justify-center gap-4 px-4">
      {milestones.map((m, i) => (
        <div key={m.id} className="flex items-center gap-3">
          <motion.div
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ background: "oklch(0.65 0.22 195)" }}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              boxShadow: [
                "0 0 0px oklch(0.65 0.22 195)",
                "0 0 12px oklch(0.65 0.22 195)",
                "0 0 0px oklch(0.65 0.22 195)",
              ],
            }}
            transition={{
              delay: i * 0.35,
              duration: 0.5,
              boxShadow: {
                delay: i * 0.35 + 0.5,
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
              },
            }}
          />
          <motion.span
            className="text-sm font-medium"
            style={{ color: "oklch(0.8 0.1 195)" }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.35 + 0.2, duration: 0.4 }}
          >
            {m.label}
          </motion.span>
          <motion.div
            className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{
              background: "oklch(0.25 0.08 195)",
              color: "oklch(0.75 0.2 165)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.35 + 0.5 }}
          >
            ✓ Done
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── Slide Data ──────────────────────────────────────────────────────────────

const slides = [
  {
    id: 1,
    num: "01",
    headline: "Rank #1 on Google & Drive Organic Traffic That Converts",
    tagline: "Indore's top SEO agency delivering global results",
    cta: "Boost My Rankings",
    accent: "oklch(0.65 0.18 195)",
    gradientFrom: "oklch(0.12 0.04 220)",
    gradientTo: "oklch(0.16 0.06 195)",
    illustration: SEOAnimation,
  },
  {
    id: 2,
    num: "02",
    headline: "Every Click Counts — Maximize ROI on Every Ad Spend",
    tagline: "Data-driven PPC campaigns across Google, Meta & more",
    cta: "Start My Campaign",
    accent: "oklch(0.68 0.2 135)",
    gradientFrom: "oklch(0.12 0.04 160)",
    gradientTo: "oklch(0.16 0.07 135)",
    illustration: PPCAnimation,
  },
  {
    id: 3,
    num: "03",
    headline: "Turn Followers Into Loyal Customers",
    tagline: "Viral content strategies that build brand communities",
    cta: "Grow My Audience",
    accent: "oklch(0.7 0.22 300)",
    gradientFrom: "oklch(0.12 0.04 280)",
    gradientTo: "oklch(0.16 0.07 300)",
    illustration: SMMAnimation,
  },
  {
    id: 4,
    num: "04",
    headline: "Stunning Websites That Convert Visitors Into Clients",
    tagline: "Award-worthy designs crafted in Indore for the world",
    cta: "See Our Work",
    accent: "oklch(0.65 0.2 195)",
    gradientFrom: "oklch(0.12 0.03 200)",
    gradientTo: "oklch(0.17 0.06 205)",
    illustration: WebDesignAnimation,
  },
  {
    id: 5,
    num: "05",
    headline: "Powerful, Fast & Scalable Web Applications",
    tagline: "Full-stack expertise from React to Node to cloud",
    cta: "Build My App",
    accent: "oklch(0.72 0.22 165)",
    gradientFrom: "oklch(0.11 0.04 150)",
    gradientTo: "oklch(0.16 0.07 165)",
    illustration: WebDevAnimation,
  },
  {
    id: 6,
    num: "06",
    headline: "Apps That Users Love & Businesses Depend On",
    tagline: "iOS, Android & cross-platform apps built to perform",
    cta: "Launch My App",
    accent: "oklch(0.65 0.2 260)",
    gradientFrom: "oklch(0.12 0.04 250)",
    gradientTo: "oklch(0.16 0.07 260)",
    illustration: MobileAppAnimation,
  },
  {
    id: 7,
    num: "07",
    headline: "Make Your Brand Unforgettable",
    tagline: "Logo, identity & strategy that sets you apart globally",
    cta: "Brand My Business",
    accent: "oklch(0.7 0.22 30)",
    gradientFrom: "oklch(0.13 0.04 20)",
    gradientTo: "oklch(0.17 0.07 30)",
    illustration: BrandingAnimation,
  },
  {
    id: 8,
    num: "08",
    headline: "Content That Educates, Engages & Sells",
    tagline: "SEO-optimized blogs, videos & campaigns that rank",
    cta: "Create My Content",
    accent: "oklch(0.72 0.22 90)",
    gradientFrom: "oklch(0.12 0.04 80)",
    gradientTo: "oklch(0.16 0.07 90)",
    illustration: ContentAnimation,
  },
  {
    id: 9,
    num: "09",
    headline: "Sell More Online With High-Converting Stores",
    tagline: "Shopify, WooCommerce & custom stores that drive revenue",
    cta: "Build My Store",
    accent: "oklch(0.65 0.22 165)",
    gradientFrom: "oklch(0.11 0.04 155)",
    gradientTo: "oklch(0.16 0.07 165)",
    illustration: EcommerceAnimation,
  },
  {
    id: 10,
    num: "10",
    headline: "Your Complete Digital Transformation Partner",
    tagline: "End-to-end strategy, execution & measurable growth",
    cta: "Get Free Strategy",
    accent: "oklch(0.65 0.18 195)",
    gradientFrom: "oklch(0.12 0.04 200)",
    gradientTo: "oklch(0.17 0.06 210)",
    illustration: StrategyAnimation,
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

const TOTAL_SLIDES = slides.length + 1; // +1 for original hero as slide 0
const dotIds = Array.from(
  { length: TOTAL_SLIDES },
  (_, i) => `slide-dot-${i}-id`,
);

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrent((v) => (v + 1) % TOTAL_SLIDES);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 8000);
  }, [advance]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(advance, 8000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, advance]);

  // current=0 → original hero; current>=1 → service slides (offset by 1)
  const slide = current > 0 ? slides[current - 1] : slides[0];
  const Illustration = slide.illustration;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-ocid="hero.section"
    >
      {current === 0 ? (
        <HeroSection />
      ) : (
        <>
          {/* Background gradient */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${current}`}
              className="absolute inset-0 z-0"
              style={{
                background: `linear-gradient(135deg, ${slide.gradientFrom} 0%, ${slide.gradientTo} 100%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>

          {/* Ambient glow overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${slide.accent}22 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${slide.accent}11 0%, transparent 40%)`,
            }}
          />

          {/* Split panels */}
          <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
            {/* LEFT — Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${current}`}
                className="flex-1 flex flex-col justify-center px-5 md:px-16 lg:px-20 pt-20 pb-8 md:py-24 lg:py-0"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Slide number badge */}
                <motion.div
                  className="inline-flex items-center gap-2 mb-6 w-fit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span
                    className="text-xs font-bold tracking-widest px-3 py-1 rounded-full border"
                    style={{
                      borderColor: slide.accent,
                      color: slide.accent,
                      background: `${slide.accent}18`,
                    }}
                  >
                    {slide.num} / 10
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.6 0.06 220)" }}
                  >
                    Elite Digital Marketing Agency
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-5"
                  style={{ color: "oklch(0.97 0.01 220)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <span style={{ color: slide.accent }}>
                    {slide.headline.split(" ").slice(0, 3).join(" ")}
                  </span>{" "}
                  <span style={{ color: "oklch(0.97 0.01 220)" }}>
                    {slide.headline.split(" ").slice(3).join(" ")}
                  </span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  className="text-sm md:text-xl mb-8 max-w-md leading-relaxed"
                  style={{ color: "oklch(0.72 0.06 220)" }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {slide.tagline}
                </motion.p>

                {/* CTA */}
                <motion.div
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    className="px-7 py-3.5 rounded-full text-sm font-bold tracking-wide text-white shadow-lg w-full sm:w-auto"
                    style={{
                      background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
                      boxShadow: `0 0 24px ${slide.accent}66`,
                    }}
                    whileHover={{
                      scale: 1.04,
                      boxShadow: `0 0 36px ${slide.accent}99`,
                    }}
                    whileTap={{ scale: 0.97 }}
                    data-ocid="hero.primary_button"
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {slide.cta} →
                  </motion.button>

                  <motion.button
                    className="px-7 py-3.5 rounded-full text-sm font-semibold border w-full sm:w-auto"
                    style={{
                      borderColor: `${slide.accent}66`,
                      color: slide.accent,
                      background: `${slide.accent}0d`,
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const el = document.getElementById("services");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View Services
                  </motion.button>
                </motion.div>

                {/* Trust line */}
                <motion.p
                  className="mt-8 text-xs font-medium tracking-wide"
                  style={{ color: "oklch(0.5 0.05 220)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  ⭐ Trusted by 500+ clients across India & worldwide
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* RIGHT — Illustration */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${current}`}
                className="hidden md:flex flex-1 items-center justify-center py-16 lg:py-0"
                style={{
                  background: `${slide.accent}09`,
                  borderLeft: `1px solid ${slide.accent}22`,
                }}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Illustration />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Navigation */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
            data-ocid="hero.tab"
          >
            {dotIds.map((dotId, i) => (
              <motion.button
                key={dotId}
                onClick={() => {
                  setCurrent(i);
                  resetTimer();
                }}
                className="rounded-full p-1.5"
                style={{
                  height: 8,
                  background:
                    i === current ? slide.accent : "oklch(0.35 0.05 220)",
                }}
                animate={{ width: i === current ? 28 : 8 }}
                transition={{ duration: 0.3 }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          {!paused && (
            <motion.div
              key={current}
              className="absolute bottom-0 left-0 z-20 h-0.5"
              style={{ background: slide.accent }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 8, ease: "linear" }}
            />
          )}
        </>
      )}
    </section>
  );
}
