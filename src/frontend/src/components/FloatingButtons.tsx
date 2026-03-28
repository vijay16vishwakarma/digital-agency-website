import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* WhatsApp floating button — above chatbot */}
      <motion.a
        href="https://wa.me/917509355745"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 240, damping: 18 }}
        whileHover={{ scale: 1.15, y: -3 }}
        whileTap={{ scale: 0.93 }}
        onHoverStart={() => setWaHovered(true)}
        onHoverEnd={() => setWaHovered(false)}
        className="fixed z-[1000] flex items-center justify-center rounded-full cursor-pointer"
        style={{
          bottom: "8.5rem",
          right: "1.05rem",
          width: 52,
          height: 52,
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: waHovered
            ? "0 0 0 6px #25D36622, 0 8px 32px #25D36644, 0 2px 8px #0008"
            : "0 0 0 0 #25D36622, 0 4px 16px #25D36633, 0 2px 6px #0006",
          transition: "box-shadow 0.3s ease",
        }}
        data-ocid="whatsapp.button"
      >
        {/* Animated pulse rings */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ animation: "wa-ring1 2.4s ease-out infinite" }}
        />
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ animation: "wa-ring2 2.4s ease-out 0.8s infinite" }}
        />

        {/* Inner glow */}
        <span
          className="absolute inset-1 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35) 0%, transparent 65%)",
          }}
        />

        <WhatsAppIcon className="w-6 h-6 text-white relative z-10" />

        {/* Tooltip */}
        <AnimatePresence>
          {waHovered && (
            <motion.span
              initial={{ opacity: 0, x: 8, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="absolute right-full mr-3 whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-lg pointer-events-none"
              style={{
                background: "rgba(10,22,40,0.92)",
                border: "1px solid #25D36644",
                color: "#25D366",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 12px #0006",
              }}
            >
              Chat on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>

      {/* Back-to-top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            onClick={scrollToTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className="fixed z-[999] bottom-6 left-4 flex items-center justify-center w-11 h-11 rounded-full"
            style={{
              background: "oklch(0.62 0.19 198 / 0.15)",
              border: "1.5px solid oklch(0.62 0.19 198 / 0.5)",
              color: "oklch(0.62 0.19 198)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 14px oklch(0.62 0.19 198 / 0.25)",
            }}
            data-ocid="backtop.button"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes wa-ring1 {
          0%   { box-shadow: 0 0 0 0px #25D36666; opacity: 0.8; }
          80%  { box-shadow: 0 0 0 18px #25D36600; opacity: 0; }
          100% { box-shadow: 0 0 0 0px #25D36600; opacity: 0; }
        }
        @keyframes wa-ring2 {
          0%   { box-shadow: 0 0 0 0px #25D36644; opacity: 0.6; }
          80%  { box-shadow: 0 0 0 28px #25D36600; opacity: 0; }
          100% { box-shadow: 0 0 0 0px #25D36600; opacity: 0; }
        }
      `}</style>
    </>
  );
}
