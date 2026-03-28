import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@elitedigitalmarketingagency.com",
    color: "oklch(0.62 0.19 198)",
    bg: "oklch(0.62 0.19 198 / 0.15)",
    border: "oklch(0.62 0.19 198 / 0.25)",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7509355745 / 9926470750",
    color: "oklch(0.72 0.22 142)",
    bg: "oklch(0.72 0.22 142 / 0.15)",
    border: "oklch(0.72 0.22 142 / 0.25)",
  },
  {
    icon: MapPin,
    label: "Address",
    value:
      "202, Orion Heights, Divya Vihar near Aurbindo, Ujjain road, Indore MP, Pin-453555, India",
    color: "oklch(0.72 0.19 60)",
    bg: "oklch(0.72 0.19 60 / 0.15)",
    border: "oklch(0.72 0.19 60 / 0.25)",
  },
];

const trustBadges = [
  "✓ Free Strategy Session",
  "✓ Response in 24 hrs",
  "✓ No-obligation Quote",
];

type Confetto = { id: number; x: number; color: string; delay: number };

function ConfettiEffect() {
  const [confetti, setConfetti] = useState<Confetto[]>([]);

  useEffect(() => {
    const colors = [
      "oklch(0.62 0.19 198)",
      "oklch(0.72 0.22 142)",
      "oklch(0.65 0.22 340)",
      "oklch(0.72 0.19 60)",
      "oklch(0.55 0.22 290)",
    ];
    setConfetti(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[i % colors.length],
        delay: Math.random() * 0.4,
      })),
    );
    const timer = setTimeout(() => setConfetti([]), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          initial={{ y: 0, x: `${c.x}%`, scale: 1, opacity: 1, rotate: 0 }}
          animate={{ y: -120, scale: 0, opacity: 0, rotate: 720 }}
          transition={{ duration: 0.9, delay: c.delay, ease: "easeOut" }}
          className="absolute bottom-1/3 w-2 h-2 rounded-full"
          style={{ background: c.color }}
        />
      ))}
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitContact();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const messageWithPhone = form.phone
        ? `Phone: ${form.phone}\n\n${form.message}`
        : form.message;
      await mutateAsync({
        name: form.name,
        email: form.email,
        message: messageWithPhone,
      });
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  }

  const focusStyle = (field: string) => ({
    boxShadow:
      focusedField === field
        ? "0 0 0 2px oklch(0.62 0.19 198 / 0.4), 0 0 20px oklch(0.62 0.19 198 / 0.2)"
        : undefined,
    borderColor: focusedField === field ? "oklch(0.62 0.19 198)" : undefined,
  });

  return (
    <section
      id="contact"
      className="py-12 md:py-32 bg-card/20 relative overflow-hidden"
    >
      {/* Rotating mesh grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.62 0.19 198) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.19 198) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "mesh-rotate 25s linear infinite",
          transformOrigin: "center",
        }}
      />

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
            Start Your Growth Journey
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Ready to{" "}
            <span className="gradient-text">Dominate Your Market?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Join 200+ businesses across India and worldwide who&apos;ve
            transformed their brand with EDMA by ERMS Intelligence Private
            Limited. Share your goals and get a free strategy session within 24
            hours.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-5"
          >
            {trustBadges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "oklch(0.62 0.19 198 / 0.15)",
                  border: "1px solid oklch(0.62 0.19 198 / 0.35)",
                  color: "oklch(0.62 0.19 198)",
                  boxShadow: "0 0 10px oklch(0.62 0.19 198 / 0.2)",
                }}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.12,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 relative"
                    style={{
                      background: item.bg,
                      border: `1px solid ${item.border}`,
                    }}
                  >
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: item.color }}
                    />
                    {item.icon === MapPin && (
                      <>
                        <div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            border: `2px solid ${item.color}`,
                            animation: "gps-ping 2s ease-out infinite",
                          }}
                        />
                        <div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            border: `2px solid ${item.color}`,
                            animation: "gps-ping 2s ease-out 0.6s infinite",
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      {item.label}
                    </div>
                    <div className="font-medium text-foreground">
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 p-6 rounded-xl bg-card border border-border relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-5 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
                }}
              />
              <h4 className="font-display font-semibold mb-2 relative z-10">
                Office Hours
              </h4>
              <p className="text-sm text-muted-foreground relative z-10">
                Monday – Friday: 9am – 6pm IST
              </p>
              <p className="text-sm text-muted-foreground relative z-10">
                Weekend: Emergency support only
              </p>
            </motion.div>

            {/* Google Maps embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-6"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.5560703489!2d75.7172552!3d22.7195687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{
                  border: "1px solid oklch(0.62 0.19 198 / 0.25)",
                  borderRadius: "0.75rem",
                  display: "block",
                  filter: "invert(90%) hue-rotate(180deg)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EDMA Office Location — Indore, Madhya Pradesh"
              />
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center h-full gap-4 text-center py-12 relative"
                  data-ocid="contact.success_state"
                >
                  <ConfettiEffect />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle2
                      className="w-16 h-16 text-primary"
                      style={{
                        filter:
                          "drop-shadow(0 0 20px oklch(0.62 0.19 198 / 0.6))",
                      }}
                    />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-2xl font-bold"
                  >
                    We&apos;ve Got Your Request!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground"
                  >
                    Our strategists will review your goals and reach out within
                    24 hours with a personalized plan.
                  </motion.p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", message: "" });
                    }}
                    variant="outline"
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="contact.panel"
                >
                  {(["name", "email"] as const).map((field, fi) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 15 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + fi * 0.1 }}
                    >
                      <Label
                        htmlFor={`contact-${field}`}
                        className="text-sm mb-1.5 block capitalize"
                      >
                        {field}
                      </Label>
                      <div className="relative">
                        <Input
                          id={`contact-${field}`}
                          type={field === "email" ? "email" : "text"}
                          placeholder={
                            field === "email"
                              ? "you@company.com"
                              : "Your full name"
                          }
                          value={form[field]}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              [field]: e.target.value,
                            }))
                          }
                          onFocus={() => setFocusedField(field)}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="bg-card border-border transition-all duration-300"
                          style={focusStyle(field)}
                          data-ocid="contact.input"
                        />
                        {focusedField === field && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                            style={{
                              background:
                                "linear-gradient(90deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
                            }}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Phone field */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <Label
                      htmlFor="contact-phone"
                      className="text-sm mb-1.5 block"
                    >
                      Phone{" "}
                      <span className="text-muted-foreground text-xs">
                        (optional)
                      </span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        className="bg-card border-border transition-all duration-300"
                        style={focusStyle("phone")}
                        data-ocid="contact.input"
                      />
                      {focusedField === "phone" && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                          style={{
                            background:
                              "linear-gradient(90deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
                          }}
                        />
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <Label
                      htmlFor="contact-message"
                      className="text-sm mb-1.5 block"
                    >
                      Message
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="contact-message"
                        placeholder="Describe your business goals, challenges, or what you'd like to achieve..."
                        value={form.message}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        className="bg-card border-border resize-none transition-all duration-300"
                        style={focusStyle("message")}
                        data-ocid="contact.textarea"
                      />
                      {focusedField === "message" && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                          style={{
                            background:
                              "linear-gradient(90deg, oklch(0.62 0.19 198), oklch(0.72 0.22 142))",
                          }}
                        />
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-md">
                      <div
                        className="absolute inset-0 rounded-md border border-primary/40"
                        style={{ animation: "radar-ping 2s ease-out infinite" }}
                      />
                      <div
                        className="absolute inset-0 rounded-md border border-primary/30"
                        style={{
                          animation: "radar-ping 2s ease-out 0.5s infinite",
                        }}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shimmer"
                      style={{
                        boxShadow: "0 0 20px oklch(0.62 0.19 198 / 0.3)",
                      }}
                      data-ocid="contact.submit_button"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        "Get My Free Strategy Session"
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
