import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const FALLBACK_SOCIAL = {
  twitter: "https://twitter.com/edma",
  linkedin: "https://linkedin.com/company/edma",
  instagram: "https://instagram.com/edma",
  facebook: "https://facebook.com/edma",
};

const sectionLinks = {
  Company: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
  ],
  Services: [
    { label: "Web Design", href: "#services" },
    { label: "Branding", href: "#services" },
    { label: "SEO", href: "#services" },
    { label: "App Development", href: "#services" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const [social, setSocial] = useState(FALLBACK_SOCIAL);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("edma_settings");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.social) {
          setSocial({
            twitter: parsed.social.twitter || FALLBACK_SOCIAL.twitter,
            linkedin: parsed.social.linkedin || FALLBACK_SOCIAL.linkedin,
            instagram: parsed.social.instagram || FALLBACK_SOCIAL.instagram,
            facebook: parsed.social.facebook || FALLBACK_SOCIAL.facebook,
          });
        }
      }
    } catch {}
  }, []);

  const socialLinks = [
    {
      href: social.twitter,
      Icon: SiX,
      label: "Twitter",
      color: "#1DA1F2",
      cls: "social-twitter",
    },
    {
      href: social.linkedin,
      Icon: FaLinkedinIn,
      label: "LinkedIn",
      color: "#0077B5",
      cls: "social-linkedin",
    },
    {
      href: social.instagram,
      Icon: SiInstagram,
      label: "Instagram",
      color: "#E1306C",
      cls: "social-instagram",
    },
    {
      href: social.facebook,
      Icon: SiFacebook,
      label: "Facebook",
      color: "#1877F2",
      cls: "social-facebook",
    },
  ];

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      <style>{`
        .social-icon {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.2s ease;
          position: relative;
        }
        .social-icon:hover {
          transform: scale(1.25) translateY(-2px);
        }
        .social-twitter:hover {
          box-shadow: 0 0 12px 3px #1DA1F2aa;
          background: #1DA1F220 !important;
          color: #1DA1F2 !important;
        }
        .social-linkedin:hover {
          box-shadow: 0 0 12px 3px #0077B5aa;
          background: #0077B520 !important;
          color: #0077B5 !important;
        }
        .social-instagram:hover {
          box-shadow: 0 0 12px 3px #E1306Caa;
          background: #E1306C20 !important;
          color: #E1306C !important;
        }
        .social-facebook:hover {
          box-shadow: 0 0 12px 3px #1877F2aa;
          background: #1877F220 !important;
          color: #1877F2 !important;
        }
      `}</style>

      {/* Subtle aurora background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142) 50%, oklch(0.65 0.22 340))",
        }}
      />
      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/uploads/edma-removebg-preview-019d268b-702a-721c-afe0-d5826f1d758c-1.png"
                alt="EDMA"
                className="h-12 object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              ERMS Intelligence Private Limited — India&apos;s leading
              full-service digital agency based in Indore, MP. We build brands
              that dominate online across India and worldwide.
            </p>

            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              Follow EDMA:
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ href, Icon, label, cls }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`social-icon w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground ${cls}`}
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(sectionLinks).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm mb-4 text-foreground">
                {title}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-ocid="footer.link"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-foreground">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  Get In Touch
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@elitedigitalmarketingagency.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  contact@elitedigitalmarketingagency.com
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  +91 7509355745 / 9926470750
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  202, Orion Heights, Divya Vihar near Aurbindo, Ujjain road,
                  Indore MP, Pin-453555, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">
              &copy; {year} ERMS Intelligence Private Limited (EDMA). All rights
              reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Registered in India | Indore, Madhya Pradesh – 453555
            </p>
            <div className="flex items-center gap-4 mt-1">
              <Link
                to="/privacy"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                data-ocid="footer.link"
              >
                Privacy Policy
              </Link>
              <span className="text-xs text-muted-foreground/40">•</span>
              <Link
                to="/terms"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                data-ocid="footer.link"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
