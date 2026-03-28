import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Linkedin,
  MessageCircle,
  User,
} from "lucide-react";
import { motion, useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { type BlogPost, CATEGORY_COLORS, STATIC_BLOGS } from "../data/blogs";

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[200] origin-left"
      style={{
        scaleX: scrollYProgress,
        background:
          "linear-gradient(90deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
      }}
    />
  );
}

function ShareButtons({ post }: { post: BlogPost }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3 mt-4 mb-6">
      <span className="text-xs text-muted-foreground font-medium">Share:</span>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
        style={{
          background: "#25D36622",
          border: "1px solid #25D36644",
          color: "#25D366",
        }}
        data-ocid="blog.share_button"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        WhatsApp
      </a>
      <a
        href={liUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
        style={{
          background: "#0077B522",
          border: "1px solid #0077B544",
          color: "#0a85c2",
        }}
        data-ocid="blog.share_button"
      >
        <Linkedin className="w-3.5 h-3.5" />
        LinkedIn
      </a>
    </div>
  );
}

function AuthorBio({ author }: { author: string }) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card mt-10">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
        }}
      >
        {initials}
      </div>
      <div>
        <div className="font-semibold text-foreground">{author}</div>
        <div className="text-sm text-muted-foreground">
          Digital Marketing Specialist at EDMA
        </div>
        <div className="text-xs text-primary mt-1">
          Elite Digital Marketing Agency · Indore, India
        </div>
      </div>
    </div>
  );
}

function RelatedPosts({ current }: { current: BlogPost }) {
  const related = STATIC_BLOGS.filter(
    (p) =>
      p.id !== current.id &&
      (p.category === current.category || p.author === current.author),
  ).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <div className="mt-14">
      <h3 className="font-display text-2xl font-bold mb-6">Related Articles</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((post) => (
          <Link
            key={post.id}
            to="/blog/$blogId"
            params={{ blogId: String(post.id) }}
            className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col"
          >
            <div
              className="h-28 relative"
              style={{ background: post.gradient }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <Badge
                className="absolute top-3 left-3 text-xs border-0"
                style={{
                  background: "oklch(0 0 0 / 0.45)",
                  color:
                    CATEGORY_COLORS[post.category] ?? "oklch(0.72 0.22 198)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {post.category}
              </Badge>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

type ContentRendererProps = { postId: number; content: BlogPost["content"] };

function ContentRenderer({ postId, content }: ContentRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
      {content.map((block, i) => {
        const key = `${postId}-block-${i}`;
        if (block.type === "heading") {
          return (
            <h2
              key={key}
              className="font-display text-2xl font-bold mt-10 mb-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "list" && block.items) {
          return (
            <ul key={key} className="space-y-2 my-6 pl-0 list-none">
              {block.items.map((item) => (
                <li
                  key={`${key}-${item.slice(0, 20)}`}
                  className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                >
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "oklch(0.62 0.19 198)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={key}
            className="text-muted-foreground leading-relaxed text-base mb-5"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogDetailPage() {
  const { blogId } = useParams({ from: "/blog/$blogId" });
  const topRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to top when blogId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blogId]);

  const post = STATIC_BLOGS.find((p) => p.id === Number(blogId));

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ReadingProgress />

      {/* Hero */}
      <div
        className="relative pt-36 pb-16 px-4 md:px-8 overflow-hidden"
        style={{ background: post.gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        <div className="absolute inset-0 section-grid opacity-10" />

        <div className="container mx-auto max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <Badge
              className="mb-4 block w-fit text-xs font-semibold border-0"
              style={{
                background: "oklch(0 0 0 / 0.45)",
                color: CATEGORY_COLORS[post.category] ?? "oklch(0.72 0.22 198)",
                backdropFilter: "blur(8px)",
              }}
            >
              {post.category}
            </Badge>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <ShareButtons post={post} />
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto max-w-3xl px-4 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ContentRenderer postId={post.id} content={post.content} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AuthorBio author={post.author} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <RelatedPosts current={post} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
