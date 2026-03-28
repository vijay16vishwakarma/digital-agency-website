import {
  CheckCircle,
  Clock,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSubmitContact } from "../hooks/useQueries";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  showContact?: boolean;
  showLeadForm?: boolean;
  chips?: string[];
  timestamp: Date;
};

const INITIAL_CHIPS = [
  "Our Services",
  "Pricing & Packages",
  "Project Timeline",
  "Contact Us",
  "About EDMA",
  "Get a Free Quote",
];

function getBotResponse(message: string): {
  text: string;
  showContact?: boolean;
  showLeadForm?: boolean;
  chips?: string[];
} {
  const msg = message.toLowerCase();

  if (
    /\b(hi|hello|hey|namaste|good morning|good afternoon|good evening)\b/.test(
      msg,
    )
  ) {
    return {
      text: "Hello! 👋 Welcome to EDMA — India's premier digital agency. I'm Aria, your AI assistant.\n\nHow can I help you today?",
      chips: INITIAL_CHIPS,
    };
  }

  if (
    /\b(contact|reach|call|email|phone|address|whatsapp|location|office|visit)\b/.test(
      msg,
    )
  ) {
    return {
      text: "Here's how to reach the EDMA team:",
      showContact: true,
      chips: ["Our Services", "Get a Free Quote"],
    };
  }

  if (/\b(quote|free quote|estimate|proposal)\b/.test(msg)) {
    return {
      text: "Great! Share a few details and our team will get back to you with a custom quote within 24 hours.",
      showLeadForm: true,
    };
  }

  if (
    /\b(start|begin|hire|project|discuss|meeting|work with|onboard)\b/.test(msg)
  ) {
    return {
      text: "Let's get your project moving! Here's our process:\n\n1️⃣ **Free Consultation** — 30-min strategy call at no cost\n2️⃣ **Custom Proposal** — Detailed scope & pricing within 24 hrs\n3️⃣ **Project Kickoff** — We begin within days of approval\n\nFill out a quick form and we'll reach out:",
      showLeadForm: true,
    };
  }

  if (/\b(service|offer|provide|specialize|what do you do)\b/.test(msg)) {
    return {
      text: "EDMA offers 5 core service areas:\n\n🌐 **Website Designing** — 41+ types (Business, E-commerce, Portfolio, LMS, etc.)\n💻 **Website Development** — Front-end, Back-end, Full-Stack, PWA, SaaS\n📱 **Mobile App Development** — Android, iOS, React Native, Flutter, AR/VR\n🎨 **Graphic Designing** — Logo, Branding, Motion Graphics, Packaging\n📈 **Digital Marketing** — SEO, PPC, SMM, Content, Email Marketing\n\n500+ projects delivered across India, USA, UK, UAE, Australia & more.",
      chips: [
        "Pricing & Packages",
        "Project Timeline",
        "Get a Free Quote",
        "Technology Stack",
      ],
    };
  }

  if (
    /\b(price|cost|pricing|rate|fee|budget|package|charge|how much)\b/.test(msg)
  ) {
    return {
      text: "Our pricing is tailored to scope, timeline, and complexity. General guide:\n\n💡 **Starter Website:** ₹15,000 – ₹40,000\n🚀 **Business Website:** ₹40,000 – ₹1,20,000\n🛒 **E-commerce Website:** ₹60,000 – ₹2,50,000\n📱 **Mobile App:** ₹1,00,000 – ₹5,00,000+\n📈 **SEO / Digital Marketing:** ₹10,000 – ₹50,000/month\n🎨 **Logo & Branding:** ₹5,000 – ₹25,000\n\nAll packages include free strategy session + post-delivery support. Want a custom quote?",
      chips: ["Get a Free Quote", "Contact Us", "Project Timeline"],
    };
  }

  if (
    /\b(timeline|how long|duration|delivery|turnaround|deadline|days|weeks)\b/.test(
      msg,
    )
  ) {
    return {
      text: "Project timelines at EDMA vary by complexity:\n\n⚡ **Landing Page:** 3–7 days\n🌐 **Business Website:** 2–4 weeks\n🛒 **E-commerce Website:** 4–8 weeks\n📱 **Mobile App (basic):** 8–16 weeks\n📈 **SEO Results:** 3–6 months (organic)\n🎨 **Branding Package:** 1–2 weeks\n\nWe provide a detailed project timeline before starting every project.",
      chips: ["Get a Free Quote", "Contact Us", "Pricing & Packages"],
    };
  }

  if (
    /\b(about|who|company|edma|erms|founded|team|experience|background|history)\b/.test(
      msg,
    )
  ) {
    return {
      text: "EDMA is the digital marketing & tech division of **ERMS Intelligence Private Limited**, based in Indore, India.\n\n🏆 **500+ Projects** delivered globally\n👥 **200+ Happy Clients** from 12+ countries\n⭐ **98% Client Retention Rate**\n📅 **8+ Years** of industry experience\n🌍 **Global Reach** — India, USA, UK, UAE, Australia & more\n\nWe combine cutting-edge technology with data-driven strategies to help businesses scale.",
      chips: ["Our Services", "Why Choose EDMA", "Get a Free Quote"],
    };
  }

  if (
    /\b(why|choose|different|unique|better|best|advantage|trust)\b/.test(msg)
  ) {
    return {
      text: "Why clients choose EDMA over other agencies:\n\n✅ **Full-Stack Expertise** — Design, Dev & Marketing under one roof\n✅ **ROI-Obsessed** — Every decision is data-driven\n✅ **Transparent Reporting** — Real-time dashboards, no surprises\n✅ **Dedicated Project Manager** — Single point of contact\n✅ **Post-Delivery Support** — We don't disappear after launch\n✅ **India & Global SEO** — We rank clients locally and worldwide\n✅ **Agile Process** — Fast iterations, on-time delivery",
      chips: ["Our Services", "Pricing & Packages", "Get a Free Quote"],
    };
  }

  if (
    /\b(seo|search engine|ranking|google|organic|keyword|local seo|on-page|off-page|backlink)\b/.test(
      msg,
    )
  ) {
    return {
      text: "Our SEO services deliver top Google rankings:\n\n🔍 **On-Page SEO** — Content, meta tags, schema markup\n🔗 **Off-Page SEO** — Link building, DA improvement\n🗺️ **Local SEO** — Google Maps, local citations (perfect for India businesses)\n📊 **Technical SEO** — Speed, Core Web Vitals, crawlability\n📝 **Content SEO** — Keyword-rich blogs & landing pages\n\n**Packages start at ₹10,000/month.** We've helped 50+ clients reach Top 3 Google rankings within 3–6 months.",
      chips: ["Pricing & Packages", "Get a Free Quote", "Contact Us"],
    };
  }

  if (
    /\b(social media|smm|facebook|instagram|linkedin|youtube|twitter|reels|content|influencer)\b/.test(
      msg,
    )
  ) {
    return {
      text: "Our Social Media Marketing services build brands that people follow:\n\n📣 **Platform Management** — Facebook, Instagram, LinkedIn, YouTube\n🎬 **Content Creation** — Reels, graphics, carousels, videos\n💰 **Paid Advertising** — Facebook Ads, Instagram Ads with measurable ROI\n🤝 **Influencer Marketing** — Nano to macro influencer collaborations\n📊 **Monthly Reports** — Engagement, reach, conversions\n\nAverage **3–8x ROI** on ad spend for our clients.",
      chips: ["Pricing & Packages", "Get a Free Quote", "Contact Us"],
    };
  }

  if (/\b(ppc|google ads|paid|ads|advertising|campaign|adwords)\b/.test(msg)) {
    return {
      text: "Our PPC & Google Ads management drives qualified leads:\n\n🎯 **Google Search Ads** — Target high-intent buyers\n🛍️ **Google Shopping Ads** — For e-commerce brands\n📺 **YouTube Ads** — Video campaigns with deep targeting\n📱 **Meta Ads** — Facebook & Instagram performance campaigns\n📊 **Conversion Tracking** — Know exactly what's working\n\nMinimum budget: ₹10,000/month ad spend + management fee.",
      chips: ["Pricing & Packages", "Get a Free Quote", "Our Services"],
    };
  }

  if (
    /\b(website|web design|web development|redesign|responsive|landing page|ecommerce|e-commerce|wordpress|shopify)\b/.test(
      msg,
    )
  ) {
    return {
      text: "We build stunning, high-performance websites:\n\n✅ Mobile-first, fully responsive\n✅ SEO-optimized from day one\n✅ Fast loading (Core Web Vitals optimized)\n✅ CMS-powered for easy updates\n✅ Secure (SSL, DDoS protection)\n✅ Integrated analytics & heatmaps\n\n**Tech stack:** React, WordPress, Shopify, Laravel, Node.js, Next.js. We've built 200+ websites across industries.",
      chips: ["Pricing & Packages", "Project Timeline", "Get a Free Quote"],
    };
  }

  if (
    /\b(app|mobile app|android|ios|flutter|react native|cross.platform|application)\b/.test(
      msg,
    )
  ) {
    return {
      text: "Our Mobile App team builds apps users love:\n\n📱 **Android & iOS** — Native and cross-platform\n⚡ **React Native / Flutter** — Cost-effective, one codebase\n🏢 **Enterprise Apps** — Complex workflows & integrations\n🛒 **E-commerce Apps** — Seamless payment & checkout\n🎮 **Gaming & AR/VR Apps** — Cutting-edge experiences\n\nWe handle design → development → App Store deployment. App ideas welcome!",
      chips: ["Pricing & Packages", "Project Timeline", "Get a Free Quote"],
    };
  }

  if (
    /\b(graphic|logo|branding|brand|design|identity|banner|poster|flyer|packaging|motion)\b/.test(
      msg,
    )
  ) {
    return {
      text: "Our Graphic Design team creates visuals that leave a lasting impression:\n\n🎨 **Logo & Brand Identity** — Strategy-backed, memorable logos\n📦 **Packaging Design** — Shelf-ready, premium packaging\n🎬 **Motion Graphics** — Animated intros, explainer videos\n📄 **Print & Digital** — Brochures, banners, social creatives\n🖌️ **UI/UX Design** — Intuitive, beautiful interfaces\n\n**Starting at ₹5,000.** All files delivered in print + digital formats.",
      chips: ["Pricing & Packages", "Get a Free Quote", "Project Timeline"],
    };
  }

  if (
    /\b(technology|tech stack|stack|tools|platform|framework|language|react|node|laravel|wordpress)\b/.test(
      msg,
    )
  ) {
    return {
      text: "EDMA uses industry-leading technologies:\n\n🌐 **Frontend:** React, Next.js, Vue.js, TypeScript\n⚙️ **Backend:** Node.js, Laravel, Python, .NET\n📱 **Mobile:** Flutter, React Native, Swift, Kotlin\n🛒 **CMS/E-com:** WordPress, Shopify, WooCommerce, Webflow\n☁️ **Cloud:** AWS, Google Cloud, Azure, Vercel\n🗄️ **Database:** MySQL, PostgreSQL, MongoDB, Firebase\n\nWe choose the best stack for each project's specific needs.",
      chips: ["Our Services", "Get a Free Quote", "Project Timeline"],
    };
  }

  if (
    /\b(support|maintenance|after|warranty|post.launch|update|bug|fix|maintain)\b/.test(
      msg,
    )
  ) {
    return {
      text: "We don't disappear after launch — EDMA offers comprehensive post-delivery support:\n\n🛡️ **Bug Fix Warranty** — 30 days free bug fixes on all projects\n🔧 **Maintenance Plans** — Monthly website care packages from ₹3,000/month\n📊 **Performance Monitoring** — Uptime, speed, and security monitoring\n🔄 **Content Updates** — Regular content & feature updates\n📞 **Dedicated Support** — WhatsApp, email, and call support\n\nAsk about our Annual Maintenance Contract (AMC) for the best rates!",
      chips: ["Pricing & Packages", "Get a Free Quote", "Contact Us"],
    };
  }

  if (
    /\b(process|how|work|step|phase|methodology|agile|workflow)\b/.test(msg)
  ) {
    return {
      text: "Our proven 6-step project process:\n\n1️⃣ **Discovery** — Understanding your goals, audience & competition\n2️⃣ **Strategy** — Roadmap, tech stack & timeline planning\n3️⃣ **Design** — Wireframes → High-fidelity mockups → Your approval\n4️⃣ **Development** — Agile sprints with weekly progress demos\n5️⃣ **Testing** — QA, cross-browser, mobile & performance testing\n6️⃣ **Launch + Support** — Deployment, training & post-launch care\n\nEvery project has a dedicated PM and daily communication.",
      chips: ["Get a Free Quote", "Project Timeline", "Contact Us"],
    };
  }

  if (
    /\b(industry|sector|niche|healthcare|restaurant|real estate|fashion|education|finance|startup)\b/.test(
      msg,
    )
  ) {
    return {
      text: "EDMA has delivered projects across 24+ industries:\n\n🏥 Healthcare & Pharma\n🍽️ Restaurants & Food\n🏠 Real Estate & Construction\n👗 Fashion & Retail\n🎓 Education & EdTech\n💰 Finance & Fintech\n🚀 Startups & SaaS\n⚖️ Legal & Consulting\n🌿 Wellness & Fitness\n🏭 Manufacturing & B2B\n\nIndustry-specific experience means faster delivery and better results for your sector.",
      chips: ["Our Services", "Portfolio", "Get a Free Quote"],
    };
  }

  if (
    /\b(portfolio|case study|work|example|sample|previous|client)\b/.test(msg)
  ) {
    return {
      text: "Our portfolio includes 12+ featured case studies with measurable results:\n\n📈 **RetailMax UK** — 320% revenue increase\n🏥 **MediCare India** — 85% organic traffic growth\n🏠 **UrbanNest UAE** — 400% lead generation uplift\n💳 **FinEdge USA** — 250% conversion improvement\n🍽️ **SpiceRoute** — 200% online orders growth\n\nCheck out the full Portfolio section on our website for all 12 projects with metrics and details!",
      chips: ["Get a Free Quote", "Our Services", "Contact Us"],
    };
  }

  // Default
  return {
    text: "That's a great question! For the most accurate answer, I'd recommend speaking with our expert team directly. They'll respond within a few hours.\n\nFill out a quick form below and we'll get back to you:",
    showLeadForm: true,
  };
}

function formatText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: static formatted text
      <span key={lineIdx}>
        {parts.map((part, partIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: static formatted text
              <strong key={partIdx} className="font-semibold text-cyan-300">
                {part.slice(2, -2)}
              </strong>
            );
          }
          // biome-ignore lint/suspicious/noArrayIndexKey: static formatted text
          return <span key={partIdx}>{part}</span>;
        })}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });
}

// ─── 3D White Robot Avatar Components ─────────────────────────────────────

// Shared 3D material tokens
const W = {
  // Body surfaces — white plastic with top-left light source
  bodyGrad: "linear-gradient(135deg, #ffffff 0%, #e8eef5 40%, #c8d4e0 100%)",
  headGrad: "linear-gradient(140deg, #ffffff 0%, #eaf0f8 35%, #cdd8e8 100%)",
  limbGrad: "linear-gradient(150deg, #f0f5fc 0%, #dbe5f2 60%, #b8c8dc 100%)",
  chestGrad: "linear-gradient(160deg, #e0eaf8 0%, #c4d4e8 100%)",
  // Shadow stacks for 3D depth
  bodyShadow:
    "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -2px 4px rgba(140,160,190,0.35)",
  headShadow:
    "0 6px 24px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.98), inset 0 -3px 6px rgba(130,155,185,0.4)",
  limbShadow:
    "2px 4px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.9), inset -1px -2px 4px rgba(120,145,175,0.3)",
  eyeGlow: "0 0 8px rgba(0,200,255,0.9), 0 0 16px rgba(0,180,255,0.5)",
  antennaGlow: "0 0 10px rgba(0,220,255,1), 0 0 20px rgba(0,180,255,0.6)",
  border: "1px solid rgba(255,255,255,0.7)",
  borderDark: "1px solid rgba(160,185,215,0.5)",
};

function RobotFull({
  isListening = false,
  isWalking = false,
}: { isListening?: boolean; isWalking?: boolean }) {
  return (
    <div
      className="robot-full"
      style={{
        width: 64,
        height: 84,
        position: "relative",
        animation: "robot-float 3s ease-in-out infinite",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.5))",
      }}
    >
      {/* Antenna stem + ball */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {/* Antenna ball */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #ffffff, #00d4ff 50%, #0090cc)",
            boxShadow: W.antennaGlow,
            animation: "antenna-ping 2s ease-in-out infinite",
          }}
        />
        {/* Stem */}
        <div
          style={{
            width: 3,
            height: 9,
            background: "linear-gradient(to bottom, #e0edf8, #b8cce0)",
            borderRadius: 2,
            boxShadow:
              "1px 0 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        />
      </div>

      {/* Head */}
      <div
        style={{
          width: 46,
          height: 36,
          borderRadius: 12,
          background: W.headGrad,
          border: W.border,
          boxShadow: W.headShadow,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          position: "relative",
          zIndex: 1,
          marginTop: 6,
        }}
      >
        {/* Ear nubs */}
        {[-1, 1].map((side) => (
          <div
            key={side}
            style={{
              position: "absolute",
              top: "50%",
              [side === -1 ? "left" : "right"]: -5,
              transform: "translateY(-50%)",
              width: 6,
              height: 14,
              borderRadius: 3,
              background: W.limbGrad,
              boxShadow: W.limbShadow,
              border: W.borderDark,
            }}
          />
        ))}

        {/* Eyes row */}
        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: isListening ? 7 : 10,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 30%, #aaf0ff, #00b8f0 55%, #005880)",
                boxShadow: W.eyeGlow,
                animation: `robot-blink 4s ease-in-out ${i * 0.12}s infinite`,
                position: "relative",
                transition: "height 0.3s ease",
              }}
            >
              {/* Specular highlight */}
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: 2,
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Mouth */}
        <div
          style={{
            width: isListening ? 16 : 20,
            height: isListening ? 6 : 4,
            borderRadius: isListening ? "50%" : "0 0 10px 10px",
            background: isListening
              ? "linear-gradient(to bottom, #b0d8f0, #60aacc)"
              : "transparent",
            border: isListening
              ? "1px solid rgba(0,160,220,0.5)"
              : "2px solid rgba(130,165,200,0.6)",
            borderTop: isListening ? undefined : "none",
            boxShadow: isListening ? "inset 0 2px 4px rgba(0,0,0,0.2)" : "none",
            transition: "all 0.3s ease",
          }}
        />
      </div>

      {/* Neck connector */}
      <div
        style={{
          width: 20,
          height: 5,
          background: W.limbGrad,
          border: W.borderDark,
          boxShadow:
            "0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.8)",
          borderRadius: 3,
          marginTop: 1,
        }}
      />

      {/* Body */}
      <div
        style={{
          width: 52,
          height: 30,
          borderRadius: 10,
          background: W.bodyGrad,
          border: W.border,
          boxShadow: W.bodyShadow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1,
          position: "relative",
        }}
      >
        {/* Chest panel (recessed) */}
        <div
          style={{
            width: 30,
            height: 16,
            borderRadius: 5,
            background: "linear-gradient(135deg, #c8daf0, #a8c0dc)",
            border: "1px solid rgba(100,140,180,0.35)",
            boxShadow:
              "inset 0 2px 4px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 9,
                borderRadius: 3,
                background: "linear-gradient(to top, #0090cc, #00d4ff)",
                boxShadow: "0 0 6px rgba(0,180,255,0.7)",
                animation: `chest-bar 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Left arm */}
        <div
          style={{
            position: "absolute",
            left: -11,
            top: 5,
            width: 11,
            height: 22,
            borderRadius: 6,
            background: W.limbGrad,
            border: W.borderDark,
            boxShadow: W.limbShadow,
            transformOrigin: "top center",
          }}
        />

        {/* Right arm (waving) */}
        <div
          style={{
            position: "absolute",
            right: -11,
            top: 5,
            width: 11,
            height: 22,
            borderRadius: 6,
            background: W.limbGrad,
            border: W.borderDark,
            boxShadow: W.limbShadow,
            transformOrigin: "top center",
            animation: "robot-wave 1.8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Legs */}
      <div style={{ display: "flex", gap: 7, marginTop: 4 }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              width: 16,
              height: 12,
              borderRadius: "0 0 7px 7px",
              background: W.limbGrad,
              border: W.borderDark,
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.8)",
              transformOrigin: "top center",
              animation: isWalking
                ? `${i === 0 ? "robot-leg-left" : "robot-leg-right"} 0.45s ease-in-out infinite`
                : undefined,
            }}
          />
        ))}
      </div>

      {/* Ground shadow */}
      <div
        style={{
          width: 44,
          height: 6,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.25)",
          filter: "blur(4px)",
          marginTop: 3,
        }}
      />
    </div>
  );
}

function RobotHead({ size = 36 }: { size?: number }) {
  const s = size / 36;
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        flexShrink: 0,
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
      }}
    >
      {/* Antenna dot */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: Math.max(5, 6 * s),
          height: Math.max(5, 6 * s),
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #ffffff, #00d4ff 55%, #0090cc)",
          boxShadow: W.antennaGlow,
          zIndex: 2,
        }}
      />
      {/* Head */}
      <div
        style={{
          position: "absolute",
          top: Math.max(4, 6 * s),
          left: "50%",
          transform: "translateX(-50%)",
          width: size * 0.88,
          height: size * 0.8,
          borderRadius: 8 * s,
          background: W.headGrad,
          border: W.border,
          boxShadow: W.headShadow,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3 * s,
        }}
      >
        {/* Eyes */}
        <div style={{ display: "flex", gap: 6 * s }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 7 * s,
                height: 7 * s,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 30%, #aaf0ff, #00b8f0 55%, #005880)",
                boxShadow: W.eyeGlow,
                animation: `robot-blink 4s ease-in-out ${i * 0.12}s infinite`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 1,
                  left: 1,
                  width: 2.5 * s,
                  height: 2.5 * s,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                }}
              />
            </div>
          ))}
        </div>
        {/* Smile */}
        <div
          style={{
            width: 13 * s,
            height: 3 * s,
            borderRadius: "0 0 7px 7px",
            border: "1.5px solid rgba(100,150,195,0.5)",
            borderTop: "none",
          }}
        />
      </div>
    </div>
  );
}

function RobotMini() {
  return <RobotHead size={28} />;
}

// ─── Contact Card ──────────────────────────────────────────────────────────

function ContactCard() {
  return (
    <div
      data-ocid="chatbot.contact.card"
      className="mt-2 rounded-xl border border-white/20 bg-white/10 p-3 text-sm backdrop-blur-sm"
    >
      <div className="mb-2 flex items-center gap-2">
        <img
          src="/assets/uploads/edma-removebg-preview-019d2bb4-6362-75ca-8b1b-03b2060df5cf-1.png"
          alt="EDMA Logo"
          className="h-7 w-auto"
        />
        <span className="font-semibold text-cyan-300">EDMA Team</span>
      </div>
      <div className="space-y-1.5">
        <a
          href="tel:+917509355745"
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
        >
          <Phone className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
          <span>+91 7509355745 / 9926470750</span>
        </a>
        <a
          href="mailto:contact@elitedigitalmarketingagency.com"
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
          <span className="truncate">
            contact@elitedigitalmarketingagency.com
          </span>
        </a>
        <a
          href="https://wa.me/917509355745"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-slate-300 transition-colors hover:bg-green-500/10 hover:text-green-300"
        >
          <MessageSquare className="h-3.5 w-3.5 shrink-0 text-green-400" />
          <span>WhatsApp: +91 7509355745</span>
        </a>
        <div className="flex items-start gap-2 rounded-lg px-2 py-1 text-slate-300">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
          <span>
            202, Orion Heights, Divya Vihar, Ujjain Road, Indore MP 453555,
            India
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1 text-slate-300">
          <Clock className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
          <span>Mon–Fri, 9am–6pm IST</span>
        </div>
      </div>
      <a
        href="#contact"
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        data-ocid="chatbot.contact.link"
      >
        <ExternalLink className="h-3 w-3" />
        Visit Contact Page
      </a>
    </div>
  );
}

type LeadFormProps = {
  onSuccess: () => void;
};

function LeadCaptureForm({ onSuccess }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const submitContact = useSubmitContact();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setError("");
    try {
      const message = [
        service ? `Service: ${service}` : "",
        phone ? `Phone: ${phone}` : "",
        note ? `Note: ${note}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      await submitContact.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        message: message || "General inquiry via chatbot",
      });
      setSubmitted(true);
      setTimeout(onSuccess, 2000);
    } catch {
      setError("Failed to submit. Please try again or contact us directly.");
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-2 rounded-xl border border-green-500/30 bg-green-900/20 p-4 text-center"
        data-ocid="chatbot.lead_form.success"
      >
        <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-400" />
        <p className="text-sm font-semibold text-green-300">
          Inquiry Received!
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Our team will contact you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-ocid="chatbot.lead_form"
      className="mt-2 rounded-xl border border-white/10 bg-slate-800/60 p-3 backdrop-blur-sm"
    >
      <p className="mb-2.5 text-xs font-semibold text-cyan-300">
        📋 Quick Inquiry Form
      </p>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Your Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          data-ocid="chatbot.lead_form.name_input"
          className="w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
        />
        <input
          type="email"
          placeholder="Email Address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-ocid="chatbot.lead_form.email_input"
          className="w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
        />
        <input
          type="tel"
          placeholder="Phone / WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          data-ocid="chatbot.lead_form.phone_input"
          className="w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
        />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          data-ocid="chatbot.lead_form.service_select"
          className="w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-400 outline-none transition-all focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
        >
          <option value="">Service Interested In</option>
          <option value="Website Design">Website Design</option>
          <option value="Website Development">Website Development</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="Graphic Designing">Graphic Designing</option>
          <option value="SEO">SEO</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="PPC / Google Ads">PPC / Google Ads</option>
          <option value="Social Media Marketing">Social Media Marketing</option>
          <option value="Branding & Identity">Branding & Identity</option>
          <option value="Other">Other / Not Sure</option>
        </select>
        <textarea
          placeholder="Brief message (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          data-ocid="chatbot.lead_form.message_input"
          className="w-full resize-none rounded-lg border border-slate-600/60 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
        />
      </div>
      {error && <p className="mt-1.5 text-[10px] text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={submitContact.isPending}
        data-ocid="chatbot.lead_form.submit_button"
        className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-opacity disabled:opacity-60 hover:opacity-90"
      >
        {submitContact.isPending ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-3 w-3" /> Send Inquiry
          </>
        )}
      </button>
    </form>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <RobotMini />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-slate-800/80 px-4 py-3 backdrop-blur-sm">
        {([0, 1, 2] as const).map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-cyan-400"
            style={{
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasWalkedIn, setHasWalkedIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHasWalkedIn(true);
    }, 1800);
    return () => clearTimeout(t);
  }, []);
  const [hasUnread, setHasUnread] = useState(true);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi there! 👋 I'm Aria, EDMA's AI assistant. I can answer questions about our services, pricing, timelines, technologies, and more. What can I help you with today?",
      chips: INITIAL_CHIPS,
      timestamp: new Date(),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional - scroll triggered by message/typing changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addFollowUpMessage = useCallback(() => {
    const msg: Message = {
      id: `b-followup-${Date.now()}`,
      role: "bot",
      text: "Thanks! Our team will reach out shortly. Is there anything else I can help you with?",
      chips: ["Our Services", "Pricing & Packages", "Contact Us"],
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: response.text,
        showContact: response.showContact,
        showLeadForm: response.showLeadForm,
        chips: response.chips,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTyping) sendMessage(input);
  };

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes robot-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-6px) rotate(0.5deg); }
          66% { transform: translateY(-3px) rotate(-0.5deg); }
        }
        @keyframes robot-wave {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(22deg); }
        }
        @keyframes robot-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          92% { transform: scaleY(0.06); }
        }
        @keyframes antenna-ping {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 10px rgba(0,220,255,1), 0 0 20px rgba(0,180,255,0.6); }
          50% { opacity: 0.7; transform: scale(1.5); box-shadow: 0 0 18px rgba(0,220,255,1), 0 0 32px rgba(0,180,255,0.8); }
        }
        @keyframes chest-bar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        /* White 3D glow pulse around floating button */
        @keyframes robot-aura {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0), 0 0 20px rgba(0,200,255,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(255,255,255,0.06), 0 0 30px rgba(0,200,255,0.5); }
        }
        @keyframes robot-walk-in {
          0% { transform: translateX(140px); opacity: 0; }
          20% { opacity: 1; }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0px); }
        }
        @keyframes robot-leg-left {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(22deg); }
          75% { transform: rotate(-22deg); }
        }
        @keyframes robot-leg-right {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-22deg); }
          75% { transform: rotate(22deg); }
        }
      `}</style>

      {/* Floating Toggle Button */}
      <div
        className="fixed bottom-4 right-4 z-50"
        style={
          !hasWalkedIn
            ? { animation: "robot-walk-in 1.8s ease-out forwards" }
            : undefined
        }
      >
        <div className="group relative">
          {/* Tooltip */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 group-hover:block"
              >
                <div className="whitespace-nowrap rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white shadow-xl ring-1 ring-white/20 backdrop-blur-sm">
                  Chat with Aria! 🤖
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          <AnimatePresence>
            {hasUnread && !isOpen && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
                style={{ boxShadow: "0 0 8px rgba(239,68,68,0.8)" }}
              >
                1
              </motion.span>
            )}
          </AnimatePresence>

          {/* Robot Button — white 3D platform base */}
          <motion.button
            type="button"
            data-ocid="chatbot.open_modal_button"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.91 }}
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Close chat" : "Open chat with Aria"}
            style={{
              width: 78,
              height: 96,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close-robot"
                  initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
                  transition={{ duration: 0.25 }}
                  style={{ position: "relative" }}
                >
                  <RobotFull isListening={true} isWalking={!hasWalkedIn} />
                  {/* X overlay badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 35% 30%, #ff6b6b, #ef4444)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        "0 0 10px rgba(239,68,68,0.8), inset 0 1px 0 rgba(255,255,255,0.4)",
                      zIndex: 10,
                    }}
                  >
                    <X
                      style={{
                        width: 11,
                        height: 11,
                        color: "white",
                        strokeWidth: 3,
                      }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle-robot"
                  initial={{ opacity: 0, scale: 0.7, rotate: 20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <RobotFull isListening={false} isWalking={!hasWalkedIn} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-ocid="chatbot.dialog"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] sm:w-[90vw] max-w-[380px] flex-col overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl"
            // White 3D card look for the panel
            css-vars=""
            // White glass panel
            {...{}}
          >
            {/* White 3D Panel border + surface */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 16,
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(10,22,40,0.96) 30%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow:
                  "0 32px 64px rgba(0,0,0,0.6), 0 8px 24px rgba(0,180,255,0.12), inset 0 1px 0 rgba(255,255,255,0.18)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Header — white 3D bar */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(0,180,220,0.08) 100%)",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.2)",
              }}
              className="flex items-center gap-3 px-4 py-3"
            >
              <div className="relative" style={{ width: 46, height: 46 }}>
                <RobotHead size={46} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a1628] bg-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Aria</p>
                <p className="text-[11px] text-cyan-400">
                  EDMA AI Assistant · Online
                </p>
              </div>
              <button
                type="button"
                data-ocid="chatbot.close_button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{ position: "relative", zIndex: 1 }}
              className="flex-1 overflow-y-auto"
              // inline style to set explicit height for scroll
            >
              <div
                style={{
                  height: "380px",
                  maxHeight: "60vh",
                  overflowY: "auto",
                }}
              >
                <div className="space-y-4 p-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${
                        msg.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      {msg.role === "bot" && <RobotMini />}
                      <div
                        className={`flex max-w-[82%] flex-col space-y-2 ${
                          msg.role === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "rounded-br-sm bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                              : "rounded-bl-sm bg-slate-800/80 text-slate-200 backdrop-blur-sm"
                          }`}
                          style={
                            msg.role === "user"
                              ? {
                                  boxShadow:
                                    "0 4px 12px rgba(0,180,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                                }
                              : {
                                  border: "1px solid rgba(255,255,255,0.08)",
                                  boxShadow:
                                    "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                                }
                          }
                        >
                          {formatText(msg.text)}
                        </div>
                        {msg.showContact && <ContactCard />}
                        {msg.showLeadForm && (
                          <LeadCaptureForm onSuccess={addFollowUpMessage} />
                        )}
                        {msg.chips && msg.chips.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {msg.chips.map((chip) => (
                              <button
                                type="button"
                                key={chip}
                                data-ocid="chatbot.secondary_button"
                                onClick={() => sendMessage(chip)}
                                className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-200"
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        data-ocid="chatbot.loading_state"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                      >
                        <TypingIndicator />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={bottomRef} />
                </div>
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                position: "relative",
                zIndex: 1,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(10,20,35,0.7)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              className="flex items-center gap-2 px-3 py-3 backdrop-blur-sm"
            >
              <input
                ref={inputRef}
                data-ocid="chatbot.input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                style={{
                  boxShadow:
                    "inset 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
                disabled={isTyping}
              />
              <motion.button
                type="submit"
                data-ocid="chatbot.submit_button"
                disabled={!input.trim() || isTyping}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white transition-opacity disabled:opacity-40"
                style={{
                  boxShadow:
                    "0 4px 12px rgba(0,180,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>

            {/* Footer branding */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                background: "rgba(5,12,24,0.5)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
              className="px-4 py-1.5 text-center text-[10px] text-slate-600"
            >
              Powered by EDMA · ERMS Intelligence Private Limited
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
