import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, MapPin, TrendingUp } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { usePortfolioItems } from "../hooks/useQueries";

const CARD_GRADIENTS = [
  "linear-gradient(135deg, oklch(0.45 0.15 195), oklch(0.30 0.12 195))",
  "linear-gradient(135deg, oklch(0.50 0.18 142), oklch(0.35 0.14 160))",
  "linear-gradient(135deg, oklch(0.45 0.18 340), oklch(0.30 0.14 320))",
  "linear-gradient(135deg, oklch(0.48 0.16 60), oklch(0.35 0.12 80))",
  "linear-gradient(135deg, oklch(0.40 0.18 290), oklch(0.28 0.14 270))",
  "linear-gradient(135deg, oklch(0.50 0.16 198), oklch(0.38 0.20 142))",
];

function getGradient(id: bigint) {
  return CARD_GRADIENTS[Number(id % BigInt(CARD_GRADIENTS.length))];
}

const STATIC_PORTFOLIO = [
  {
    id: 1n,
    title: "RetailMax E-commerce Platform",
    category: "Web Development",
    clientName: "RetailMax Ltd",
    year: 2024n,
    description:
      "Full-stack e-commerce solution with AI-powered product recommendations and real-time inventory management.",
    result: "320% increase in online revenue",
    country: "UK",
  },
  {
    id: 2n,
    title: "MediCare Hospital Portal",
    category: "Web Design",
    clientName: "MediCare Hospitals",
    year: 2024n,
    description:
      "Patient management portal with appointment booking, medical records, and telemedicine integration.",
    result: "65% reduction in appointment no-shows",
    country: "India",
  },
  {
    id: 3n,
    title: "UrbanNest Real Estate App",
    category: "Mobile App",
    clientName: "UrbanNest Realty",
    year: 2023n,
    description:
      "Property search and virtual tour mobile app with AR room visualization and mortgage calculator.",
    result: "4.8★ App Store rating, 50K+ downloads",
    country: "UAE",
  },
  {
    id: 4n,
    title: "FinEdge Investment Dashboard",
    category: "Web Development",
    clientName: "FinEdge Capital",
    year: 2024n,
    description:
      "Real-time investment portfolio tracker with AI insights, market data feeds, and automated reporting.",
    result: "200% growth in platform users",
    country: "USA",
  },
  {
    id: 5n,
    title: "EduSpark LMS Platform",
    category: "Web Design",
    clientName: "EduSpark Academy",
    year: 2023n,
    description:
      "Learning management system for 50,000+ students with live classes, assessments, and progress analytics.",
    result: "40% improvement in course completion rates",
    country: "India",
  },
  {
    id: 6n,
    title: "LuxeStay Hotel Booking",
    category: "Digital Marketing",
    clientName: "LuxeStay Group",
    year: 2024n,
    description:
      "Comprehensive digital marketing campaign — SEO, PPC, social media — for a 5-star hotel chain.",
    result: "180% increase in direct bookings",
    country: "Maldives",
  },
  {
    id: 7n,
    title: "TechForce Brand Identity",
    category: "Branding",
    clientName: "TechForce Solutions",
    year: 2023n,
    description:
      "Complete brand identity redesign: logo, color system, typography, brand guidelines, and marketing collateral.",
    result: "Brand recognition up 3x post-launch",
    country: "India",
  },
  {
    id: 8n,
    title: "FreshMart Grocery App",
    category: "Mobile App",
    clientName: "FreshMart Retail",
    year: 2024n,
    description:
      "On-demand grocery delivery app with real-time tracking, subscription boxes, and loyalty rewards.",
    result: "2M+ orders in first year",
    country: "India",
  },
  {
    id: 9n,
    title: "LegalEase SaaS Platform",
    category: "Web Development",
    clientName: "LegalEase Inc.",
    year: 2023n,
    description:
      "Document automation and case management SaaS for law firms with AI-powered contract analysis.",
    result: "75% reduction in document processing time",
    country: "Canada",
  },
  {
    id: 10n,
    title: "FitLife Gym Network",
    category: "Digital Marketing",
    clientName: "FitLife Gyms",
    year: 2024n,
    description:
      "Multi-location SEO, Google Ads, and social media marketing for a 25-gym fitness chain across India.",
    result: "45% increase in membership sign-ups",
    country: "India",
  },
  {
    id: 11n,
    title: "GreenBuild Architecture",
    category: "Web Design",
    clientName: "GreenBuild Studio",
    year: 2023n,
    description:
      "Award-winning portfolio website with 3D project showcases, interactive floor plans, and client portal.",
    result: "60% more qualified inbound leads",
    country: "Australia",
  },
  {
    id: 12n,
    title: "SwiftLogix Fleet Management",
    category: "Mobile App",
    clientName: "SwiftLogix",
    year: 2024n,
    description:
      "Real-time fleet tracking app with route optimization, driver scoring, and fuel consumption analytics.",
    result: "28% reduction in fuel costs",
    country: "India",
  },
];

type PortfolioItem = {
  id: bigint;
  title: string;
  category: string;
  clientName: string;
  year: bigint;
  description: string;
  result?: string;
  country?: string;
};

export default function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: backendItems = [], isLoading } = usePortfolioItems();
  const [activeFilter, setActiveFilter] = useState("All");
  const [scanCard, setScanCard] = useState<string | null>(null);

  const useStaticData = !isLoading && backendItems.length === 0;
  const items: PortfolioItem[] = useStaticData
    ? STATIC_PORTFOLIO
    : backendItems;

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.category))),
  ];
  const filtered =
    activeFilter === "All"
      ? items
      : items.filter((i) => i.category === activeFilter);

  return (
    <section id="portfolio" className="py-12 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-grid opacity-20" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -60, scale: 0.96 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-primary" />
            Our Work
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Our Work &amp; <span className="gradient-text">Results</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            500+ projects delivered across 12 countries
          </p>
        </motion.div>

        {!isLoading && categories.length > 1 && (
          <div
            className="flex flex-wrap gap-2 justify-center mb-10 mt-8 relative overflow-x-auto"
            data-ocid="portfolio.panel"
          >
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 relative z-10 ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground teal-glow"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 hover:shadow-[0_0_12px_oklch(0.62_0.19_198/0.25)]"
                }`}
                data-ocid="portfolio.tab"
              >
                {cat}
                {activeFilter === cat && (
                  <motion.span
                    layoutId="active-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary/20 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="portfolio.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Skeleton key={`sk-${n}`} className="h-64 rounded-xl" />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="portfolio.empty_state"
          >
            No projects found for this category.
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={String(item.id)}
                  initial={{ opacity: 0, rotateX: 15, y: 30 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: inView ? 0.05 * i : 0,
                    ease: "easeOut",
                  }}
                  style={{ perspective: 800, transformStyle: "preserve-3d" }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  className="group rounded-xl overflow-hidden border border-border
                    hover:border-primary/60
                    transition-[border-color,box-shadow] duration-300
                    hover:shadow-[0_8px_40px_oklch(0.62_0.19_198/0.30),0_0_0_1px_oklch(0.62_0.19_198/0.15)]"
                  data-ocid={`portfolio.item.${i + 1}`}
                  onMouseEnter={() => setScanCard(String(item.id))}
                  onMouseLeave={() => setScanCard(null)}
                >
                  {/* Card image area */}
                  <div
                    className="h-48 relative overflow-hidden"
                    style={{ background: getGradient(item.id) }}
                  >
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(oklch(0.62 0.19 198 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.19 198 / 0.08) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                        animation: "dot-pulse 4s ease-in-out infinite",
                      }}
                    />

                    {/* Scan line effect */}
                    {scanCard === String(item.id) && (
                      <motion.div
                        key={`scan-${item.id}`}
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: "200%", opacity: [0, 0.8, 0.8, 0] }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        className="absolute left-0 right-0 h-0.5 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, oklch(0.62 0.19 198), oklch(0.72 0.22 142), oklch(0.62 0.19 198), transparent)",
                          boxShadow: "0 0 10px oklch(0.62 0.19 198 / 0.8)",
                        }}
                      />
                    )}

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      <ExternalLink className="w-12 h-12 text-white" />
                    </div>

                    {/* Category badge — glows on hover */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <Badge
                        className="bg-background/80 text-primary border-primary/30 text-xs
                          group-hover:border-primary/80
                          group-hover:shadow-[0_0_10px_oklch(0.62_0.19_198/0.5)]
                          transition-[border-color,box-shadow] duration-300"
                      >
                        {item.category}
                      </Badge>
                    </div>

                    {/* Result metric badge — scales up on hover */}
                    <div className="absolute bottom-3 right-3 z-20">
                      <motion.span
                        whileHover={{ scale: 1.08 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                        className="inline-flex items-center gap-1 bg-background/90
                          border border-accent/40
                          group-hover:border-accent/80
                          group-hover:shadow-[0_0_12px_oklch(0.72_0.22_142/0.45)]
                          text-accent text-xs px-2 py-1 rounded-full font-semibold
                          transition-[border-color,box-shadow] duration-300"
                      >
                        <TrendingUp className="w-2.5 h-2.5" />
                        {item.result ?? "View Results →"}
                      </motion.span>
                    </div>

                    {/* Hover overlay tint */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />

                    {/* Slide-up CTA overlay */}
                    <motion.div
                      initial={false}
                      className="absolute inset-x-0 bottom-0 h-full flex items-end pb-4 px-4 pointer-events-none"
                      style={{ pointerEvents: "none" }}
                    >
                      <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.32, ease: "easeOut" }}
                        className="w-full"
                        style={{ pointerEvents: "none" }}
                      >
                        {/* We use group-hover CSS instead since whileHover on a parent element doesn't propagate */}
                      </motion.div>
                    </motion.div>

                    {/* CSS-driven slide-up CTA (reliable group-hover approach) */}
                    <div
                      className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0
                        transition-transform duration-300 ease-out
                        bg-gradient-to-t from-background/95 via-background/80 to-transparent
                        pt-8 pb-3 px-4 flex items-end"
                    >
                      <span
                        className="flex items-center gap-1.5 text-xs font-bold tracking-wide
                          text-transparent bg-clip-text
                          bg-gradient-to-r from-[oklch(0.62_0.19_198)] to-[oklch(0.72_0.22_142)]"
                      >
                        <ExternalLink className="w-3 h-3 text-primary" />
                        View Case Study
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 bg-card">
                    <h3
                      className="font-display font-semibold text-foreground mb-1
                      group-hover:text-transparent group-hover:bg-clip-text
                      group-hover:bg-gradient-to-r group-hover:from-[oklch(0.62_0.19_198)] group-hover:to-[oklch(0.72_0.22_142)]
                      transition-all duration-300"
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <p className="text-xs text-muted-foreground">
                        {item.clientName} · {String(item.year)}
                      </p>
                      {item.country && (
                        <span
                          className="inline-flex items-center gap-1 text-xs bg-card border border-border
                            group-hover:border-primary/50
                            group-hover:text-primary
                            group-hover:shadow-[0_0_8px_oklch(0.62_0.19_198/0.25)]
                            px-2 py-0.5 rounded-full text-muted-foreground
                            transition-[border-color,color,box-shadow] duration-300"
                        >
                          <MapPin className="w-2.5 h-2.5" />
                          {item.country}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
