"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi! I'm Aria, the Claaps assistant. I can tell you about our company, our services (Oracle GRC, Risk Management Cloud, Regulatory Compliance, Risk Advisory, Managed Support, AI Solutions), the industries we serve, or how to get in touch. What would you like to know?";

const FALLBACK =
  "I can help with: About Claaps, our Services, a specific service (Oracle GRC, Risk Management Cloud, Regulatory Compliance, Risk Advisory, Managed Support, AI Solutions), the Industries we serve, or Contact details. Which would you like? For anything specific, email info@claaps.com.";

const SUGGESTIONS = ["About Claaps", "Our services", "AI Solutions", "Oracle GRC", "Contact us"];

// Predefined, static knowledge base — no API, no key, fully offline and
// deterministic. Each intent is matched by whole-word keywords; the best match
// wins, otherwise FALLBACK is returned. Specific topics are listed before the
// generic "greeting" so a tie resolves to the more useful answer.
type Intent = { keywords: string[]; answer: string };

const KNOWLEDGE: Intent[] = [
  {
    keywords: ["who are you", "who is claaps", "about claaps", "about the company", "your company", "what is claaps"],
    answer:
      "Claaps Technology Services is a specialist provider focused exclusively on Oracle Governance, Risk & Compliance (GRC) and Oracle Risk Management Cloud. We deliver implementation, advisory, and ongoing support in one accountable team — platform depth, not a side practice inside a broader IT consultancy.",
  },
  {
    keywords: ["service", "services", "what do you do", "what do you offer", "offering", "offerings", "help with"],
    answer:
      "Claaps offers six core services:\n• Oracle GRC\n• Oracle Risk Management Cloud\n• Regulatory Compliance Consulting\n• Risk Advisory\n• Managed Support\n• AI Solutions\n\nAsk me about any one for more detail.",
  },
  {
    keywords: ["oracle grc", "grc", "governance"],
    answer:
      "Oracle GRC — end-to-end design, implementation, and optimization of Oracle Governance, Risk & Compliance, so controls, risks, and policies live in one governed system instead of spreadsheets, built around how your organization actually governs itself.",
  },
  {
    keywords: ["risk management cloud", "rmc", "continuous monitoring", "segregation", "access certification"],
    answer:
      "Oracle Risk Management Cloud — implementation for continuous controls monitoring, access certification, and segregation-of-duties enforcement across Oracle ERP and adjacent systems, tuned to reduce false positives so the platform stays trusted and used.",
  },
  {
    keywords: ["regulatory", "compliance", "regulation", "sox", "gdpr", "hipaa", "audit"],
    answer:
      "Regulatory Compliance Consulting — independent advisory that interprets your regulatory requirements and translates them into testable control design and evidence. Note: this is advisory work; Claaps does not certify or guarantee compliance on your behalf.",
  },
  {
    keywords: ["risk advisory", "advisory", "taxonomy", "appetite", "board"],
    answer:
      "Risk Advisory — risk taxonomy design, risk appetite framing, and executive and board-level risk reporting, helping risk leaders rationalize a fast-growing register.",
  },
  {
    keywords: ["managed support", "support", "maintenance", "administration", "go-live"],
    answer:
      "Managed Support — ongoing administration, rule tuning, and release management for Oracle GRC and Risk Management Cloud after go-live, from the same specialists who designed your controls.",
  },
  {
    keywords: ["ai", "ai solutions", "artificial intelligence", "automation", "machine learning", "intelligent"],
    answer:
      "AI Solutions — we help you leverage AI to automate processes, analyze data, and make smarter, faster decisions. We design and implement scalable AI solutions tailored to your business goals, and we can apply them to risk and compliance work — automating routine controls tasks and turning your governance data into clearer insight. Email info@claaps.com to talk through a use case.",
  },
  {
    keywords: ["industry", "industries", "sector", "sectors"],
    answer:
      "We work with teams across regulated industries: Energy & Utilities, Pharma & Life Sciences, Financial Services, Telecom, Semiconductors, Healthcare, Retail, Media & Entertainment, and Education.",
  },
  {
    keywords: ["pricing", "price", "cost", "how much", "fees", "budget", "quote"],
    answer:
      "Engagements are scoped to your environment and goals, so pricing is tailored rather than fixed. Share your needs at info@claaps.com or via the Contact page and we'll put together the right scope.",
  },
  {
    keywords: ["consultation", "demo", "talk to", "speak to", "meeting", "get in touch"],
    answer:
      "Glad to help — submit the Request a Consultation form on our Contact page, or email info@claaps.com, and our team will follow up.",
  },
  {
    keywords: ["contact", "email", "phone", "call", "reach", "address", "office", "location"],
    answer:
      "You can reach us at info@claaps.com, or use the Request a Consultation form on our Contact page. We have teams in the USA and India.",
  },
  {
    keywords: ["thank", "thanks", "thx", "appreciate"],
    answer:
      "You're welcome! If there's anything else about our Oracle GRC or risk services, just ask — or reach us at info@claaps.com.",
  },
  {
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good evening"],
    answer:
      "Hi there! I can tell you about Claaps, our services, specific offerings like Oracle GRC or Risk Management Cloud, the industries we serve, or how to get in touch. What would you like to know?",
  },
];

function getAnswer(text: string): string {
  const t = text.toLowerCase();
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of KNOWLEDGE) {
    let score = 0;
    for (const kw of intent.keywords) {
      const re = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (re.test(t)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return best ? best.answer : FALLBACK;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: GREETING }]);
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

  function respondTo(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);
    // Small delay so the predefined reply feels natural rather than instant.
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getAnswer(trimmed) }]);
      setLoading(false);
    }, 350);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      respondTo(input);
    }
  }

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
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">Claaps Assistant</p>
                <p className="text-xs text-white/80">Aria · ask us anything</p>
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
            <div
              ref={scrollRef}
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto bg-navy-900 p-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
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
                </div>
              ))}

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

            {/* Quick-reply suggestions */}
            <div className="flex flex-wrap gap-1.5 bg-navy-900 px-3 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => respondTo(s)}
                  disabled={loading}
                  className="rounded-full border border-graphite-700 px-2.5 py-1 text-xs text-slate-400 transition-colors hover:border-electric-400 hover:text-electric-600 disabled:opacity-40"
                >
                  {s}
                </button>
              ))}
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
                  placeholder="Ask about our services…"
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

      {/* Launcher (bottom-right) */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close support chat" : "Open support chat"}
        aria-expanded={open}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-700 to-purple-500 text-white shadow-elevation-2 transition-transform hover:scale-105 motion-reduce:transform-none"
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
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
