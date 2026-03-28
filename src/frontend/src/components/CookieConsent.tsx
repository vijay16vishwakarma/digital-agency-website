import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "edma_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[998] px-4 py-3 md:px-8"
          style={{
            background: "oklch(0.12 0.02 240 / 0.85)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid oklch(0.62 0.19 198 / 0.2)",
          }}
          data-ocid="cookie.panel"
        >
          <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: "oklch(0.72 0.22 142)" }}
              />
              <p className="text-sm text-muted-foreground">
                We use cookies to improve your experience and analyse site
                traffic. By continuing, you agree to our{" "}
                <Link
                  to="/privacy"
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={decline}
                className="text-muted-foreground hover:text-foreground"
                data-ocid="cookie.cancel_button"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={accept}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                style={{ boxShadow: "0 0 12px oklch(0.62 0.19 198 / 0.25)" }}
                data-ocid="cookie.confirm_button"
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
