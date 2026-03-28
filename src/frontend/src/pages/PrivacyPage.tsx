import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-primary" />
              Legal
              <span className="w-8 h-px bg-primary" />
            </div>
            <h1
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-2">
              Last updated: March 2025
            </p>
            <p className="text-muted-foreground mb-10">
              This Privacy Policy describes how ERMS Intelligence Private
              Limited (operating as EDMA — Elite Digital Marketing Agency)
              collects, uses, and protects your personal information.
            </p>

            <div className="space-y-10 prose-like">
              {[
                {
                  title: "1. Who We Are",
                  body: "ERMS Intelligence Private Limited is a digital marketing and technology company registered in India, with our principal office at 202, Orion Heights, Divya Vihar, Near Aurbindo, Ujjain Road, Indore, Madhya Pradesh – 453555, India. We operate under the brand name EDMA (Elite Digital Marketing Agency).",
                },
                {
                  title: "2. Information We Collect",
                  body: "We collect the following types of personal information:\n\n• Contact form submissions: name, email address, phone number, and message content.\n• Chatbot (Aria) interactions: name, email, phone number, service interest, and inquiry message when you submit the lead capture form.\n• Cookies and usage data: browser type, IP address, pages visited, time spent, and referral source — collected automatically when you visit our website.\n• Communications: any emails, messages, or calls you initiate with us.",
                },
                {
                  title: "3. How We Use Your Information",
                  body: "We use your personal information to:\n\n• Respond to enquiries and provide requested services.\n• Send project updates, proposals, and invoices.\n• Improve our website and services using aggregated analytics.\n• Comply with legal obligations under Indian law.\n• Send marketing communications (only with your explicit consent or as permitted by applicable law). You may opt out at any time.",
                },
                {
                  title: "4. Cookies",
                  body: "Our website uses cookies to enhance your browsing experience. We use:\n\n• Essential cookies: required for the website to function properly.\n• Analytics cookies: help us understand how visitors interact with the site (e.g., page views, session duration).\n• Preference cookies: remember choices you make (e.g., cookie consent status).\n\nYou can control or disable cookies through your browser settings. Declining non-essential cookies will not affect your ability to use the site's core features.",
                },
                {
                  title: "5. Data Storage and Retention",
                  body: "Lead data submitted via our contact form and chatbot is stored securely in our backend systems hosted on the Internet Computer blockchain. We retain contact messages for a maximum of 12 months unless required for an active client relationship or legal obligation. You may request deletion at any time (see Section 8).",
                },
                {
                  title: "6. Data Sharing",
                  body: "We do not sell, rent, or trade your personal data to third parties. We may share data with trusted service providers (e.g., email services, analytics platforms) strictly to operate our business, under data processing agreements that require them to protect your data. We may disclose data if required by law, court order, or Indian regulatory authorities.",
                },
                {
                  title: "7. International Data Transfers",
                  body: "Our primary operations are based in India. If you access our website from outside India, your data may be processed in India. We take appropriate safeguards to protect your data in accordance with applicable law, including India's Digital Personal Data Protection Act (DPDP Act, 2023) and the General Data Protection Regulation (GDPR) where applicable to European visitors.",
                },
                {
                  title: "8. Your Rights",
                  body: "Under the DPDP Act 2023 (India) and GDPR (for EU/EEA residents), you have the right to:\n\n• Access: request a copy of the personal data we hold about you.\n• Correction: request correction of inaccurate or incomplete data.\n• Erasure: request deletion of your personal data where we no longer have a lawful basis to process it.\n• Objection: object to processing for direct marketing purposes.\n• Data portability: receive your data in a structured, machine-readable format.\n\nTo exercise any of these rights, email us at contact@elitedigitalmarketingagency.com. We will respond within 30 days.",
                },
                {
                  title: "9. Security",
                  body: "We implement technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
                },
                {
                  title: "10. Children's Privacy",
                  body: "Our website is not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has submitted personal data to us, please contact us immediately and we will delete it.",
                },
                {
                  title: "11. Changes to This Policy",
                  body: "We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. The date at the top of this page indicates when the policy was last revised. Continued use of our website after changes constitutes acceptance of the revised policy.",
                },
                {
                  title: "12. Contact Us",
                  body: "For any questions, concerns, or data requests related to this Privacy Policy, please contact:\n\nERMS Intelligence Private Limited (EDMA)\n202, Orion Heights, Divya Vihar, Near Aurbindo, Ujjain Road\nIndore, Madhya Pradesh – 453555, India\nEmail: contact@elitedigitalmarketingagency.com\nPhone: +91 7509355745",
                },
              ].map((section) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4 }}
                  className="p-6 rounded-xl bg-card border border-border"
                >
                  <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                    {section.title}
                  </h2>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.body}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-4">
              <Link to="/" className="text-primary hover:underline text-sm">
                ← Back to Home
              </Link>
              <Link
                to="/terms"
                className="text-primary hover:underline text-sm"
              >
                Terms of Service →
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
