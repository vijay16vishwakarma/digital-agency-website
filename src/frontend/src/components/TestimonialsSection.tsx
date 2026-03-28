import { Skeleton } from "@/components/ui/skeleton";
import { Building2, CheckCircle2, Star } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTestimonials } from "../hooks/useQueries";

const STATIC_TESTIMONIALS = [
  {
    id: "s1",
    clientName: "Rajesh Sharma",
    company: "TechNova Solutions, Indore",
    role: "CEO & Founder",
    rating: 5,
    quote:
      "EDMA transformed our online presence completely. Our website traffic increased by 340% in just 4 months and our lead generation has never been better. The team's dedication to SEO and digital strategy is unmatched.",
    service: "SEO & Web Development",
    avatar: "RS",
    avatarColor: "from-cyan-500 to-teal-600",
    verified: true,
  },
  {
    id: "s2",
    clientName: "Priya Mehta",
    company: "StyleHub Fashion, Mumbai",
    role: "Marketing Director",
    rating: 5,
    quote:
      "Our e-commerce sales doubled within 3 months of EDMA taking over our digital marketing. Their social media campaigns are incredibly creative and targeted. Best investment we've made for our brand.",
    service: "Social Media Marketing",
    avatar: "PM",
    avatarColor: "from-pink-500 to-rose-600",
    verified: true,
  },
  {
    id: "s3",
    clientName: "Amit Verma",
    company: "BuildRight Constructions, Bhopal",
    role: "Managing Director",
    rating: 5,
    quote:
      "Professional, responsive, and results-driven. EDMA built us a stunning website and their SEO work got us ranking #1 in Bhopal for construction services. Our phone hasn't stopped ringing since!",
    service: "Website Design & SEO",
    avatar: "AV",
    avatarColor: "from-lime-500 to-green-600",
    verified: true,
  },
  {
    id: "s4",
    clientName: "Sunita Agarwal",
    company: "MediCare Clinic, Indore",
    role: "Head of Operations",
    rating: 5,
    quote:
      "We needed a complete digital overhaul for our healthcare brand. EDMA delivered a HIPAA-conscious website with appointment booking, and our patient inquiries from online channels grew by 5x. Exceptional work.",
    service: "Healthcare Website & PPC",
    avatar: "SA",
    avatarColor: "from-blue-500 to-indigo-600",
    verified: true,
  },
  {
    id: "s5",
    clientName: "Vikram Joshi",
    company: "EduStar Academy, Pune",
    role: "Director",
    rating: 5,
    quote:
      "EDMA created our LMS website and handled our entire Google Ads campaign. Student enrollments increased by 200% in the first semester. Their understanding of the education sector is outstanding.",
    service: "LMS Development & PPC",
    avatar: "VJ",
    avatarColor: "from-purple-500 to-violet-600",
    verified: true,
  },
  {
    id: "s6",
    clientName: "Neha Kapoor",
    company: "GreenBite Restaurants, Delhi",
    role: "Owner",
    rating: 5,
    quote:
      "Our restaurant chain's app and website by EDMA have been game-changers. Online orders went from near-zero to 60% of our revenue. The app is smooth, fast, and our customers love it.",
    service: "Mobile App & Web",
    avatar: "NK",
    avatarColor: "from-orange-500 to-amber-600",
    verified: true,
  },
  {
    id: "s7",
    clientName: "Rohit Singhania",
    company: "FinEdge Wealth, Hyderabad",
    role: "Senior Partner",
    rating: 5,
    quote:
      "Trust and credibility are everything in finance. EDMA built us a world-class website with impeccable branding, and their content marketing strategy positioned us as thought leaders. ROI has been phenomenal.",
    service: "Finance Website & Branding",
    avatar: "RS",
    avatarColor: "from-teal-500 to-cyan-600",
    verified: true,
  },
  {
    id: "s8",
    clientName: "Ananya Bose",
    company: "LegalEdge Advocates, Kolkata",
    role: "Senior Advocate",
    rating: 5,
    quote:
      "EDMA understood our niche perfectly. They built a professional legal website, optimized it for 'advocate in Kolkata' searches, and now we rank on the first page. Client inquiries increased by 180%.",
    service: "Legal Website & Local SEO",
    avatar: "AB",
    avatarColor: "from-rose-500 to-pink-600",
    verified: true,
  },
  {
    id: "s9",
    clientName: "Deepak Chaudhary",
    company: "CloudSoft Technologies, Bangalore",
    role: "CTO",
    rating: 5,
    quote:
      "As a tech company, we had high expectations. EDMA exceeded all of them — custom web application, CI/CD-friendly codebase, seamless API integrations, and a stunning UI. We've recommended them to 4 other startups.",
    service: "Enterprise Web Development",
    avatar: "DC",
    avatarColor: "from-indigo-500 to-blue-600",
    verified: true,
  },
];

type DisplayTestimonial = {
  id: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
  quote: string;
  service: string;
  avatar: string;
  avatarColor: string;
  verified: boolean;
};

function TestimonialCard({
  t,
  ocid,
}: {
  t: DisplayTestimonial;
  ocid?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="w-72 sm:w-96 flex-shrink-0 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/40 transition-all duration-300 relative overflow-hidden group cursor-default"
      data-ocid={ocid}
    >
      {/* Decorative quote mark */}
      <div
        className="absolute -top-3 -left-1 text-9xl font-serif leading-none opacity-10 select-none pointer-events-none group-hover:opacity-20 transition-opacity"
        style={{ color: "oklch(0.62 0.19 198)", fontFamily: "serif" }}
      >
        &ldquo;
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, oklch(0.62 0.19 198 / 0.07), transparent 60%)",
        }}
      />

      {/* Service badge */}
      <div className="relative z-10 mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
          {t.service}
        </span>
      </div>

      {/* Stars */}
      <div className="relative z-10 flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.div
            key={`star-${n}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
              delay: n * 0.05,
            }}
          >
            <Star
              className={`w-4 h-4 ${
                n <= t.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <p className="relative z-10 text-foreground/85 text-sm leading-relaxed italic mb-5">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/10">
        {/* Gradient avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-sm font-bold text-white shadow-lg`}
            style={{
              boxShadow: "0 0 16px oklch(0.62 0.19 198 / 0.4)",
            }}
          >
            {t.avatar}
          </div>
          {t.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-foreground truncate">
              {t.clientName}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">{t.role}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground/70 mt-0.5">
            <Building2 className="w-3 h-3" />
            <span className="truncate">{t.company}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: testimonials = [], isLoading } = useTestimonials();

  const displayTestimonials: DisplayTestimonial[] =
    testimonials.length > 0
      ? testimonials.map((t) => ({
          id: String(t.id),
          clientName: t.clientName,
          company: t.company,
          quote: t.quote,
          rating: Number(t.rating),
          role: "",
          service: "",
          avatarColor: "from-cyan-500 to-teal-600",
          verified: false,
          avatar: t.clientName.slice(0, 2).toUpperCase(),
        }))
      : STATIC_TESTIMONIALS;

  const row1 = displayTestimonials.slice(0, 5);
  const row2 = displayTestimonials.slice(5);

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-card/30 relative overflow-hidden"
    >
      {/* Aurora background blobs */}
      <div
        className="absolute top-1/4 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.19 198 / 0.08), transparent 70%)",
          animation: "aurora-drift-2 24s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.22 142 / 0.07), transparent 70%)",
          animation: "aurora-drift-1 20s ease-in-out infinite",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.2 280 / 0.05), transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold tracking-wide mb-5">
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
            Trusted by 200+ Businesses Across India &amp; Beyond
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Real Results. Real Clients.{" "}
            <span className="gradient-text">Real Growth.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Join hundreds of businesses that have scaled their digital presence
            with EDMA.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-12 py-5 px-8 rounded-2xl bg-white/5 border border-white/10 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={`stat-star-${n}`}
                  className="w-4 h-4 text-yellow-400 fill-yellow-400 -ml-0.5 first:ml-0"
                />
              ))}
            </div>
            <span className="font-bold text-foreground">4.9/5</span>
            <span className="text-muted-foreground text-sm">Avg Rating</span>
          </div>
          <div className="w-px h-6 bg-white/10 hidden md:block" />
          <div className="text-center">
            <span className="font-bold text-foreground">200+</span>
            <span className="text-muted-foreground text-sm ml-1">
              Happy Clients
            </span>
          </div>
          <div className="w-px h-6 bg-white/10 hidden md:block" />
          <div className="text-center">
            <span className="font-bold text-foreground">98%</span>
            <span className="text-muted-foreground text-sm ml-1">
              Retention Rate
            </span>
          </div>
        </motion.div>

        {isLoading && (
          <div
            className="grid md:grid-cols-3 gap-6"
            data-ocid="testimonials.loading_state"
          >
            {[1, 2, 3].map((n) => (
              <Skeleton key={`sk-${n}`} className="h-64 rounded-2xl" />
            ))}
          </div>
        )}

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative overflow-hidden space-y-5"
          >
            {/* Fade edges */}
            <div
              className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.12 0.025 195), transparent)",
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(-90deg, oklch(0.12 0.025 195), transparent)",
              }}
            />

            {/* Row 1 — left to right */}
            <div
              className="flex gap-5 w-max"
              style={{ animation: "marquee 35s linear infinite" }}
            >
              {[...row1, ...row1, ...row1].map((t, i) => (
                <TestimonialCard
                  key={`r1-${t.id}-${i}`}
                  t={t}
                  ocid={
                    i < row1.length ? `testimonials.item.${i + 1}` : undefined
                  }
                />
              ))}
            </div>

            {/* Row 2 — right to left */}
            {row2.length > 0 && (
              <div
                className="flex gap-5 w-max"
                style={{
                  animation: "marquee-reverse 40s linear infinite",
                }}
              >
                {[...row2, ...row2, ...row2].map((t, i) => (
                  <TestimonialCard
                    key={`r2-${t.id}-${i}`}
                    t={t}
                    ocid={
                      i < row2.length
                        ? `testimonials.item.${row1.length + i + 1}`
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
