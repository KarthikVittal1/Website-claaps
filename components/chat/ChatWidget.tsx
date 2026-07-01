"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, ChevronRight, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { services } from "@/lib/content/services";

// ---------------------------------------------------------------------------
// Guided, button-driven assistant (mgmotor-style). No API and no key: every
// reply is deterministic. Free text is mapped to a "topic" by keyword scoring;
// tapping a chip jumps straight to a topic. "Book a consultation" sends the
// visitor to the full Request a Consultation page (/contact).
// ---------------------------------------------------------------------------

type Chip = { label: string; topic: string };
type CardItem = { title: string; subtitle: string; href: string };
type LinkItem = { label: string; href: string; icon: "mail" | "page" };

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  chips?: Chip[];
  cards?: CardItem[];
  links?: LinkItem[];
};

const GREETING =
  "Hey there, welcome to Claaps! 👋 I'm your assistant, and I'm glad you stopped by. I'd love to help - I can walk you through what we do, who we help, a little about us, or get a consultation booked for you. Where would you like to start?";

const FALLBACK =
  "Hmm, I didn't quite catch that one - sorry! 😅 I'm still learning, but I can definitely point you in the right direction. Pick whatever's easiest below, or email us at info@claaps.com and a real person will jump in.";

const MENU_CHIPS: Chip[] = [
  { label: "Our services", topic: "services" },
  { label: "Who we help", topic: "industries" },
  { label: "About Claaps", topic: "about" },
  { label: "Book a consultation", topic: "consult" },
  { label: "Contact", topic: "contact" },
];

// Extra keyword aliases per service so natural phrasing maps to the right page.
const SERVICE_ALIASES: Record<string, string[]> = {
  "oracle-grc": ["oracle grc", "grc", "governance"],
  "oracle-risk-management-cloud": [
    "risk management cloud",
    "rmc",
    "continuous monitoring",
    "segregation of duties",
    "segregation",
    "access certification",
    "sod",
  ],
  "regulatory-compliance-consulting": ["regulatory", "compliance", "regulation", "sox", "gdpr", "hipaa"],
  "risk-advisory": ["risk advisory", "advisory", "risk taxonomy", "taxonomy", "risk appetite", "appetite", "board reporting"],
  "managed-support": ["managed support", "support", "maintenance", "administration", "go-live", "go live"],
  "rpa-uipath": ["rpa", "uipath", "robotic process", "robotic process automation", "bots", "automation"],
  "ai-agents": ["ai agent", "ai agents", "autonomous agent", "agentic"],
  "ai-chatbots": ["ai chatbot", "ai chatbots", "chatbot", "chatbots", "rag", "helpdesk", "virtual assistant"],
};

type Intent = { topic: string; keywords: string[] };

function serviceKeywords(slug: string, shortTitle: string): string[] {
  return Array.from(
    new Set([shortTitle.toLowerCase(), slug.replace(/-/g, " "), ...(SERVICE_ALIASES[slug] ?? [])])
  );
}

// Order matters: more specific intents come first so they win keyword ties.
const INTENTS: Intent[] = [
  {
    topic: "consult",
    keywords: ["consultation", "consult", "demo", "book", "booking", "meeting", "talk to", "speak to", "get in touch", "appointment"],
  },
  ...services.map((s) => ({ topic: `service:${s.slug}`, keywords: serviceKeywords(s.slug, s.shortTitle) })),
  {
    topic: "services",
    keywords: ["service", "services", "what do you do", "what do you offer", "offering", "offerings", "help with", "capabilities", "products", "product", "ai", "artificial intelligence"],
  },
  { topic: "industries", keywords: ["industry", "industries", "sector", "sectors", "solutions", "who do you help", "clients", "customers"] },
  { topic: "about", keywords: ["who are you", "who is claaps", "about claaps", "about the company", "your company", "what is claaps", "tell me about"] },
  { topic: "contact", keywords: ["contact", "email", "phone", "call", "reach", "address", "office", "location"] },
  { topic: "pricing", keywords: ["pricing", "price", "cost", "how much", "fees", "budget", "quote"] },
  { topic: "greeting", keywords: ["hi", "hello", "hey", "greetings", "good morning", "good evening"] },
  { topic: "thanks", keywords: ["thank", "thanks", "thx", "appreciate"] },
];

function matchTopic(text: string): string {
  const t = text.toLowerCase();
  let best = "";
  let bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      const re = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (re.test(t)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent.topic;
    }
  }
  return best;
}

// Returns the assistant reply for a topic id (everything except the role).
function nodeFor(topic: string): Omit<ChatMessage, "role"> {
  if (topic.startsWith("service:")) {
    const slug = topic.slice("service:".length);
    const s = services.find((x) => x.slug === slug);
    if (s) {
      return {
        content: `${s.title}\n\n${s.summary}`,
        links: [{ label: `Open ${s.shortTitle} page`, href: `/services/${s.slug}`, icon: "page" }],
        chips: [
          { label: "Other services", topic: "services" },
          { label: "Book a consultation", topic: "consult" },
          { label: "Back to menu", topic: "menu" },
        ],
      };
    }
  }

  switch (topic) {
    case "menu":
      return { content: "Of course! What would you like to look at?", chips: MENU_CHIPS };

    case "greeting":
      return {
        content: "Hi there! I can tell you about Claaps, our services, the industries we serve, or set up a consultation. What would you like to do?",
        chips: MENU_CHIPS,
      };

    case "services":
      return {
        content: "Great question! Here's what we do - tap any one and I'll take you straight to it:",
        cards: services.map((s) => ({ title: s.shortTitle, subtitle: s.summary, href: `/services/${s.slug}` })),
        chips: [
          { label: "Book a consultation", topic: "consult" },
          { label: "Back to menu", topic: "menu" },
        ],
      };

    case "about":
      return {
        content:
          "Claaps Technology Services is a specialist provider focused exclusively on Oracle Governance, Risk & Compliance (GRC) and Oracle Risk Management Cloud - implementation, advisory, and ongoing support in one accountable team. Platform depth, not a side practice inside a broader IT consultancy.",
        chips: [
          { label: "Our services", topic: "services" },
          { label: "Who we help", topic: "industries" },
          { label: "Book a consultation", topic: "consult" },
        ],
      };

    case "industries":
      return {
        content:
          "We work with risk, compliance, and IT leaders across regulated industries - Energy & Utilities, Pharma & Life Sciences, Financial Services, Telecom, Semiconductors, Healthcare, Retail, Media & Entertainment, and Education.",
        links: [{ label: "Explore our services", href: "/services", icon: "page" }],
        chips: [
          { label: "Our services", topic: "services" },
          { label: "Book a consultation", topic: "consult" },
          { label: "Back to menu", topic: "menu" },
        ],
      };

    case "contact":
      return {
        content: "Reach the Claaps team any time - we have teams in the USA and India.",
        links: [
          { label: "info@claaps.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=info@claaps.com", icon: "mail" },
          { label: "Open contact page", href: "/contact", icon: "page" },
        ],
        chips: [
          { label: "Book a consultation", topic: "consult" },
          { label: "Back to menu", topic: "menu" },
        ],
      };

    case "pricing":
      return {
        content:
          "Engagements are scoped to your environment and goals, so pricing is tailored rather than fixed. The quickest path is a short consultation - want me to set one up?",
        chips: [
          { label: "Book a consultation", topic: "consult" },
          { label: "Our services", topic: "services" },
          { label: "Back to menu", topic: "menu" },
        ],
      };

    case "thanks":
      return { content: "Aw, you're very welcome! 😊 Is there anything else I can help you with?", chips: MENU_CHIPS };

    default:
      return { content: FALLBACK, chips: MENU_CHIPS };
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: GREETING, chips: MENU_CHIPS },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function pushUser(content: string) {
    setMessages((prev) => [...prev, { role: "user", content }]);
  }

  // Push an assistant reply after a short, natural delay (shows typing dots).
  function botSay(msg: Omit<ChatMessage, "role">, delay = 350) {
    setLoading(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", ...msg }]);
      setLoading(false);
    }, delay);
  }

  // "Book a consultation" points to the full Request a Consultation page and
  // keeps the menu handy so the visitor can explore other options too.
  function goToConsultation() {
    botSay({
      content:
        "Wonderful - here's our Request a Consultation page so the team can get the full picture. 🙌 Or pick another option below.",
      links: [{ label: "Open Request a Consultation", href: "/contact", icon: "page" }],
      chips: MENU_CHIPS,
    });
  }

  function respondTo(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    pushUser(trimmed);
    setInput("");

    const topic = matchTopic(trimmed);
    if (topic === "consult") {
      goToConsultation();
      return;
    }
    botSay(nodeFor(topic || "fallback"));
  }

  function goToTopic(topic: string, label: string) {
    if (loading) return;
    pushUser(label);
    if (topic === "consult") {
      goToConsultation();
      return;
    }
    botSay(nodeFor(topic));
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      respondTo(input);
    }
  }

  const placeholder = "Ask about our services…";

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Claaps support chat"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed bottom-24 right-5 z-50 flex h-[520px] max-h-[calc(100vh-8rem)] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-graphite-700 bg-navy-950 shadow-elevation-2"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-700 to-purple-500 px-4 py-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={476}
                  height={524}
                  className="h-6 w-auto object-contain"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">Claaps Assistant</p>
                <p className="text-xs text-white/80">Ask us anything</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-navy-900 p-4">
              {messages.map((m, i) => {
                const isLast = i === messages.length - 1;
                return (
                  <div
                    key={i}
                    className={cn("flex w-full flex-col", m.role === "user" ? "items-end" : "items-start")}
                  >
                    {/* Bubble */}
                    <div
                      className={cn(
                        "max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-electric-600 text-white"
                          : "border border-graphite-700 bg-navy-950 text-offwhite-50"
                      )}
                    >
                      {m.content}
                    </div>

                    {/* Service cards */}
                    {m.role === "assistant" && m.cards && m.cards.length > 0 && (
                      <div className="mt-2 flex w-full flex-col gap-2">
                        {m.cards.map((card) => (
                          <Link
                            key={card.href}
                            href={card.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-center gap-3 rounded-xl border border-graphite-700 bg-navy-950 px-3.5 py-3 text-left transition-colors hover:border-electric-400"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-offwhite-50">{card.title}</p>
                              <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-slate-400">
                                {card.subtitle}
                              </p>
                            </div>
                            <ChevronRight
                              className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-electric-400"
                              aria-hidden
                            />
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* CTA links */}
                    {m.role === "assistant" && m.links && m.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.links.map((l) => {
                          const inner = (
                            <>
                              {l.icon === "mail" ? (
                                <Mail className="h-3.5 w-3.5" aria-hidden />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                              )}
                              {l.label}
                            </>
                          );
                          const cls =
                            "inline-flex items-center gap-1.5 rounded-full border border-electric-400/40 bg-electric-600/10 px-3 py-1.5 text-xs font-medium text-electric-400 transition-colors hover:bg-electric-600/20";
                          return l.href.startsWith("/") ? (
                            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={cls}>
                              {inner}
                            </Link>
                          ) : (
                            <a
                              key={l.href}
                              href={l.href}
                              target={l.href.startsWith("http") ? "_blank" : undefined}
                              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className={cls}
                            >
                              {inner}
                            </a>
                          );
                        })}
                      </div>
                    )}

                    {/* Quick-reply chips - only on the latest reply */}
                    {m.role === "assistant" && isLast && !loading && m.chips && m.chips.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.chips.map((c) => (
                          <button
                            key={c.label}
                            type="button"
                            onClick={() => goToTopic(c.topic, c.label)}
                            className="rounded-full border border-graphite-700 px-2.5 py-1 text-xs text-slate-400 transition-colors hover:border-electric-400 hover:text-electric-600"
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl border border-graphite-700 bg-navy-950 px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-graphite-700 bg-navy-950 p-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder={placeholder}
                  aria-label="Type your message"
                  className="max-h-28 flex-1 resize-none rounded-lg border border-graphite-700 bg-navy-900 px-3 py-2 text-sm text-offwhite-50 outline-none placeholder:text-slate-400 focus:border-electric-400"
                />
                <button
                  type="button"
                  onClick={() => respondTo(input)}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-700 to-purple-500 text-white transition-opacity disabled:opacity-40"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-slate-400">
                For anything specific, contact info@claaps.com.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher (bottom-right) - Claaps mark, ripple rings, 3D tilt on hover */}
      <div className="fixed bottom-5 right-5 z-50 h-14 w-14">
        {/* Ripple rings draw the eye while the chat is closed */}
        {!open && (
          <>
            <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-cyan-700/30 motion-reduce:hidden" />
            <span
              style={{ animationDelay: "0.7s" }}
              className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-purple-500/25 motion-reduce:hidden"
            />
          </>
        )}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close support chat" : "Open support chat"}
          aria-expanded={open}
          style={{ transformPerspective: 600 }}
          whileHover={{ scale: 1.12, rotateX: -12, rotateY: 12 }}
          whileTap={{ scale: 0.94, rotateX: 0, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-700 to-purple-500 text-white shadow-elevation-2 motion-reduce:transform-none"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
              >
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={476}
                  height={524}
                  className="h-7 w-auto object-contain"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
