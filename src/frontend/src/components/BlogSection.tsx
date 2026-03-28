import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CATEGORY_COLORS, STATIC_BLOGS } from "../data/blogs";

type ShootingStar = {
  id: number;
  top: string;
  delay: string;
  duration: string;
  width: number;
};

function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        top: `${10 + i * 18}%`,
        delay: `${i * 4}s`,
        duration: `${5 + i * 1.5}s`,
        width: 60 + i * 30,
      })),
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute left-0"
          style={{
            top: s.top,
            width: `${s.width}px`,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, oklch(0.62 0.19 198 / 0.8), oklch(0.72 0.22 142 / 0.5), transparent)",
            animationName: "shoot",
            animationDuration: s.duration,
            animationDelay: s.delay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            boxShadow: "0 0 6px oklch(0.62 0.19 198 / 0.6)",
          }}
        />
      ))}
    </div>
  );
}

const VISIBLE_INIT = 6;

export default function BlogSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [visibleCount, setVisibleCount] = useState(VISIBLE_INIT);
  const [typedKeyword, setTypedKeyword] = useState("");
  const typewriterKeyword = "blog";

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTypedKeyword(typewriterKeyword.slice(0, i));
      if (i >= typewriterKeyword.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [inView]);

  const displayed = STATIC_BLOGS.slice(0, visibleCount);
  const hasMore = visibleCount < STATIC_BLOGS.length;

  return (
    <section id="blog" className="py-12 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-grid opacity-20" />
      <ShootingStars />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-primary" />
            Insights & Resources
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            From our{" "}
            <span className="gradient-text">
              {typedKeyword}
              {typedKeyword.length < typewriterKeyword.length && inView && (
                <span
                  className="inline-block w-0.5 h-8 bg-primary align-middle ml-0.5"
                  style={{ animation: "blink 0.8s step-end infinite" }}
                />
              )}
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
          >
            Expert insights on SEO, digital marketing, web design, app
            development, and branding — written by EDMA's specialists.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            {[
              { label: "Articles Published", value: "25+" },
              { label: "Topics Covered", value: "10+" },
              { label: "Monthly Readers", value: "5K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * (i % 6) }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group rounded-xl overflow-hidden bg-card
                border border-border
                hover:border-primary/60
                transition-[border-color,box-shadow] duration-300
                hover:shadow-[0_8px_40px_oklch(0.62_0.19_198/0.22),0_0_0_1px_oklch(0.62_0.19_198/0.12)]
                flex flex-col cursor-pointer"
              data-ocid={`blog.item.${i + 1}`}
            >
              {/* Card Header */}
              <div
                className="h-40 flex flex-col justify-between p-4 overflow-hidden relative"
                style={{ background: post.gradient }}
              >
                {/* Base dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/10 transition-all duration-500" />

                {/* Cyan shimmer on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.19 198 / 0.15) 0%, transparent 60%)",
                  }}
                />

                {/* Category badge — pulses/glows on hover */}
                <div className="relative z-10 self-start">
                  <Badge
                    className="text-xs font-semibold border-0
                      group-hover:shadow-[0_0_14px_oklch(0.62_0.19_198/0.6)]
                      group-hover:scale-105
                      transition-[box-shadow,transform] duration-300
                      origin-left"
                    style={{
                      background: "oklch(0 0 0 / 0.45)",
                      color:
                        CATEGORY_COLORS[post.category] ??
                        "oklch(0.72 0.22 198)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {post.category}
                  </Badge>
                </div>

                {/* Meta row — brightens on hover */}
                <div
                  className="relative z-10 flex items-center gap-3
                    text-white/60 group-hover:text-white/90
                    transition-colors duration-300 text-xs"
                >
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Author — fades in more prominently on hover */}
                <div
                  className="flex items-center gap-1.5 text-xs
                    text-muted-foreground group-hover:text-primary/80
                    transition-colors duration-300 mb-3"
                >
                  <User className="w-3 h-3" />
                  {post.author}
                </div>

                {/* Title — cyan gradient on hover */}
                <h3
                  className="font-display font-semibold mb-2 leading-snug text-base
                    text-foreground
                    group-hover:text-transparent group-hover:bg-clip-text
                    group-hover:bg-gradient-to-r
                    group-hover:from-[oklch(0.62_0.19_198)]
                    group-hover:to-[oklch(0.72_0.22_142)]
                    transition-all duration-300"
                >
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {post.excerpt}
                </p>

                {/* Read Article CTA — arrow slides right on hover */}
                <Link
                  to="/blog/$blogId"
                  params={{ blogId: String(post.id) }}
                  className="flex items-center gap-1 text-primary text-sm font-medium mt-auto
                    relative overflow-hidden"
                  data-ocid={`blog.link.${i + 1}` as never}
                >
                  {/* Underline sweep */}
                  <span
                    className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full
                      bg-gradient-to-r from-[oklch(0.62_0.19_198)] to-[oklch(0.72_0.22_142)]
                      transition-[width] duration-300 ease-out"
                  />

                  <span className="relative flex items-center gap-1">
                    Read Article
                    {/* Arrow that slides right on group hover */}
                    <span
                      className="inline-flex translate-x-0 group-hover:translate-x-1.5
                        transition-transform duration-300 ease-out"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <button
              type="button"
              onClick={() =>
                setVisibleCount((c) => Math.min(c + 6, STATIC_BLOGS.length))
              }
              className="relative px-8 py-3 rounded-full font-semibold text-sm overflow-hidden group border border-primary/40 text-primary hover:text-background transition-colors duration-300"
              data-ocid="blog.primary_button"
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
                }}
              />
              <span className="relative z-10">
                Load More Articles ({STATIC_BLOGS.length - visibleCount}{" "}
                remaining)
              </span>
            </button>
          </motion.div>
        )}

        {!hasMore && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center text-muted-foreground text-sm mt-10"
          >
            You've read them all — check back soon for new articles.
          </motion.p>
        )}
      </div>
    </section>
  );
}
