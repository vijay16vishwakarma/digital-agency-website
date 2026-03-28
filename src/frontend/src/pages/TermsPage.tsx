import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-2">
              Last updated: March 2025
            </p>
            <p className="text-muted-foreground mb-10">
              These Terms of Service govern your use of the EDMA website and any
              services provided by ERMS Intelligence Private Limited. Please
              read them carefully.
            </p>

            <div className="space-y-10">
              {[
                {
                  title: "1. Acceptance of Terms",
                  body: "By accessing or using the EDMA website (edma.in or any related domain) and by engaging our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our website or services.",
                },
                {
                  title: "2. Services Provided",
                  body: "ERMS Intelligence Private Limited (EDMA) provides digital marketing, web design, web development, mobile application development, graphic design, branding, SEO, PPC advertising, social media marketing, and related professional services. The exact scope of services for each engagement is defined in a separate Service Agreement, Statement of Work, or Project Proposal agreed between us and the client.",
                },
                {
                  title: "3. Service Delivery",
                  body: "Project timelines, milestones, and deliverables are outlined in the relevant project proposal or agreement. We will make reasonable efforts to meet agreed deadlines. Delays caused by the client (e.g., late provision of content, approvals, or feedback) will not be counted against our delivery obligations. EDMA reserves the right to subcontract parts of a project to qualified professionals while remaining responsible for the overall quality.",
                },
                {
                  title: "4. Payment Terms",
                  body: "Payments are due as specified in the project proposal or invoice. Standard terms are:\n\n• 50% advance payment before project commencement.\n• Remaining balance due upon project completion or as per agreed milestone schedule.\n• Invoices unpaid after 30 days of the due date are subject to a late fee of 2% per month.\n• All prices are exclusive of GST unless otherwise stated.\n• Payments are non-refundable once work has commenced, except where EDMA fails to deliver as agreed.",
                },
                {
                  title: "5. Intellectual Property",
                  body: "Upon full payment, you own the final deliverables created specifically for your project (e.g., custom website design, logo files, marketing copy). EDMA retains ownership of:\n\n• Pre-existing tools, code libraries, frameworks, templates, and methodologies used in delivering the project.\n• Any work product for which full payment has not been received.\n• Portfolio rights: EDMA may showcase completed work in its portfolio, case studies, and marketing materials unless you request confidentiality in writing.",
                },
                {
                  title: "6. Client Responsibilities",
                  body: "Clients are responsible for:\n\n• Providing accurate, complete, and timely content, assets, and feedback required for the project.\n• Ensuring they have the legal right to use all materials provided to EDMA (text, images, trademarks, etc.).\n• Maintaining the security of any login credentials or admin access we provide.\n• Complying with all applicable laws regarding their business, including data protection, advertising, and consumer protection regulations.",
                },
                {
                  title: "7. Limitation of Liability",
                  body: "To the maximum extent permitted by Indian law:\n\n• EDMA's total liability for any claim arising from a project shall not exceed the total fees paid by the client for that specific project.\n• EDMA is not liable for indirect, incidental, special, or consequential damages, including loss of profits, loss of business, or loss of data.\n• EDMA does not guarantee specific results from digital marketing campaigns (e.g., specific search rankings, lead volumes, or revenue targets) as results depend on market conditions and third-party platforms.",
                },
                {
                  title: "8. Confidentiality",
                  body: "Both parties agree to keep confidential any proprietary or sensitive information shared during the project. This obligation survives termination of the service agreement for a period of 2 years.",
                },
                {
                  title: "9. Termination",
                  body: "Either party may terminate a project agreement with 30 days' written notice. Upon termination:\n\n• The client owes payment for all work completed up to the termination date.\n• EDMA will deliver all completed work products for which full payment has been received.\n• Both parties' confidentiality obligations remain in effect.",
                },
                {
                  title: "10. Website Use",
                  body: "You may use this website for lawful purposes only. You must not:\n\n• Attempt to gain unauthorised access to our systems or data.\n• Use automated tools to scrape, crawl, or copy content without permission.\n• Submit false or misleading information through our contact forms.\n• Use this website to transmit spam, malware, or any unlawful content.",
                },
                {
                  title: "11. Third-Party Links",
                  body: "Our website may contain links to third-party websites (e.g., ERMS Intelligence, Elite Infotech Solutions). EDMA is not responsible for the content, privacy practices, or availability of those sites. Linking to them does not imply endorsement.",
                },
                {
                  title: "12. Governing Law & Dispute Resolution",
                  body: "These Terms are governed by the laws of India. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh, India. Parties agree to first attempt resolution through good-faith negotiation before pursuing formal legal proceedings.",
                },
                {
                  title: "13. Changes to These Terms",
                  body: "We reserve the right to update these Terms at any time. Material changes will be notified on our website. Continued use of our services after changes constitutes acceptance.",
                },
                {
                  title: "14. Contact",
                  body: "Questions about these Terms?\n\nERMS Intelligence Private Limited (EDMA)\n202, Orion Heights, Divya Vihar, Near Aurbindo, Ujjain Road\nIndore, Madhya Pradesh – 453555, India\nEmail: contact@elitedigitalmarketingagency.com\nPhone: +91 7509355745",
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
                to="/privacy"
                className="text-primary hover:underline text-sm"
              >
                Privacy Policy →
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
