import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="relative inline-block mb-8"
          >
            <span
              className="font-display font-black select-none"
              style={{
                fontSize: "clamp(6rem, 20vw, 12rem)",
                lineHeight: 1,
                background:
                  "linear-gradient(135deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 60px oklch(0.62 0.19 198 / 0.35))",
              }}
            >
              404
            </span>
            {/* Glow ring */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.62 0.19 198 / 0.2) 0%, transparent 70%)",
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4"
          >
            This page doesn&apos;t exist
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground mb-8"
          >
            The page you&apos;re looking for has moved, been deleted, or never
            existed. Let&apos;s get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Link to="/">
              <Button
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground gap-2"
                style={{ boxShadow: "0 0 20px oklch(0.62 0.19 198 / 0.3)" }}
                data-ocid="notfound.primary_button"
              >
                <Home className="w-4 h-4" />
                Back to Homepage
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
