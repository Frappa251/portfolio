import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import CyberBackdrop from "@/components/CyberBackdrop";
import SectionHeading from "@/components/SectionHeading";
import { ease } from "@/lib/motion";

const EMAIL = "francescosaverio2004@gmail.com";

/* ---------------- terminal field: minimal glowing line + live caret ---------------- */
function TerminalField({
  label,
  hint,
  value,
  onChange,
  multiline = false,
  rows = 4,
  type = "text",
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const sharedCls = "block w-full bg-transparent font-mono text-[15px] leading-[1.7] text-transparent caret-transparent outline-none";
  const pad = "px-1 py-2.5";

  return (
    <label className={`block ${focused ? "field-focused" : ""}`}>
      {/* field label */}
      <div className="mb-1.5 flex items-baseline justify-between font-mono text-[10px] tracking-[0.28em]">
        <span className="text-neon-cyan/70">// {label}</span>
        <span className={focused ? "text-neon-violetlite/80" : "text-white/25"}>
          {focused ? "● INPUT_OPEN" : hint}
        </span>
      </div>

      <div className="relative">
        {/* visible mirror layer (typed text + blinking caret) */}
        <div
          className={`${pad} pointer-events-none whitespace-pre-wrap break-words font-mono text-[15px] leading-[1.7]`}
          style={{ minHeight: multiline ? `${rows * 1.7 + 1.25}em` : "2.6em" }}
        >
          <span className="text-neon-cyan/40">&gt;&nbsp;</span>
          {value
            ? <span className="text-white/90">{value}</span>
            : !focused && <span className="text-white/25">awaiting input…</span>}
          {focused && <span className="cursor" />}
        </div>

        {/* real input on top, transparent text */}
        {multiline ? (
          <textarea
            value={value} onChange={onChange} rows={rows} required
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className={`absolute inset-0 resize-none ${sharedCls} ${pad}`}
            style={{ textIndent: "1.1em" }}
          />
        ) : (
          <input
            type={type} value={value} onChange={onChange} required
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className={`absolute inset-0 ${sharedCls} ${pad}`}
            style={{ textIndent: "1.1em" }}
          />
        )}

        {/* underline: base track + glowing focus bar */}
        <span className="absolute bottom-0 left-0 h-px w-full bg-white/15" />
        <span className="field-glow absolute bottom-0 left-0 h-[2px] w-full bg-neon-violet" />
      </div>
    </label>
  );
}

/* ---------------- node footer link ---------------- */
function NodeLink({ label, addr, href }: { label: string; addr: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group/n flex items-center gap-2.5 font-mono text-[12px] tracking-[0.12em] text-white/55 transition-colors duration-300 hover:text-neon-violetlite"
    >
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-white/30 transition-all duration-300 group-hover/n:bg-neon-cyan" />
      <span className="whitespace-nowrap text-neon-cyan/60 transition-colors group-hover/n:text-neon-violetlite">[NODE: {label}]</span>
      <span className="whitespace-nowrap text-white/25 group-hover/n:text-white/45">{addr}</span>
    </a>
  );
}

/* ---------------- the secure mail client ---------------- */
type Status = "idle" | "transmitting" | "success";

function MailClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  // No backend: the "transmission" hands the packet to the visitor's mail
  // client via mailto once the progress animation completes.
  const openMailClient = () => {
    const subject = `[portfolio] Message from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} <${form.email}>`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "transmitting") return;
    setStatus("transmitting");
    setProgress(0);
    timer.current = setInterval(() => {
      setProgress((p) => {
        const next = p + (p < 70 ? 7 : 4) + Math.random() * 4;
        if (next >= 100) {
          if (timer.current) clearInterval(timer.current);
          setTimeout(() => {
            openMailClient();
            setStatus("success");
          }, 280);
          return 100;
        }
        return next;
      });
    }, 55);
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div
      className="clip-mech bg-gradient-to-br from-neon-violet/55 to-neon-blue/35 p-px"
      style={{ filter: "drop-shadow(0 0 22px rgba(168,85,247,.22)) drop-shadow(0 16px 36px rgba(59,130,246,.20))" }}
    >
      <div className="clip-mech relative overflow-hidden bg-inkpanel/95">
        {/* ---- title bar ---- */}
        <div className="flex items-center gap-3 border-b border-white/10 px-6 pb-3 pt-5 font-mono sm:px-9">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rotate-45 bg-neon-magenta/80" />
            <span className="h-2 w-2 rotate-45 bg-neon-violet/80" />
            <span className="h-2 w-2 rotate-45 bg-neon-cyan/80" />
          </span>
          <span className="text-[12px] tracking-[0.18em] text-white/75">SECURE_MAIL_CLIENT</span>
          <span className="text-[11px] tracking-[0.1em] text-neon-cyan/60">v1.0.4</span>
          <span className="ml-auto flex items-center gap-2 text-[10px] tracking-[0.2em] text-neon-cyan/70">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#38bdf8", color: "#38bdf8" }} />
            AES-256
          </span>
        </div>

        {/* ---- status line ---- */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-white/[0.06] px-6 py-3 font-mono text-[10px] tracking-[0.2em] text-white/40 sm:px-9">
          <span><span className="text-white/30">ENCRYPTION:</span> <span className="text-neon-violetlite/80">AES-256 ACTIVE</span></span>
          <span><span className="text-white/30">CHANNEL:</span> <span className="text-neon-cyan/70">TLS/1.3</span></span>
          <span className="ml-auto flex items-center gap-2">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22c55e", color: "#22c55e" }} />
            <span className="text-white/55">STATUS: READY TO TRANSMIT</span>
          </span>
        </div>

        {/* ---- body ---- */}
        <div className="relative px-6 py-8 sm:px-9 sm:py-10">
          {status === "success" ? (
            <div className="intro-up flex flex-col items-center py-10 text-center">
              <div className="clip-bevel-sm border border-neon-cyan/50 bg-neon-cyan/5 px-5 py-2 font-mono text-[11px] tracking-[0.3em] text-neon-cyan glow-cyan">
                ✓ PACKET STAGED
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-[0.06em] text-white glow-soft sm:text-3xl">
                HANDOFF COMPLETE
              </h3>
              <p className="mt-3 max-w-sm font-mono text-[12px] leading-relaxed text-white/45">
                Il messaggio è pronto nel tuo client email: premi invio lì per completare la trasmissione.
              </p>
              <button
                onClick={reset}
                className="mt-7 font-mono text-[12px] tracking-[0.2em] text-neon-violetlite/80 transition-colors hover:text-neon-violetlite"
              >
                <span className="text-white/35">$</span> compose --new
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="intro-up flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <TerminalField label="IDENTITY / NAME" hint="[ required ]" value={form.name} onChange={set("name")} />
                <TerminalField label="RETURN ADDRESS / EMAIL" hint="[ encrypted ]" value={form.email} onChange={set("email")} type="email" />
              </div>
              <TerminalField label="PAYLOAD / MESSAGE" hint="[ plaintext → AES-256 ]" value={form.message} onChange={set("message")} multiline rows={4} />

              {/* transmit button + transmitting bar */}
              <div className="relative mt-1">
                {status === "transmitting" ? (
                  <div className="clip-bevel-sm border border-neon-blue/40 bg-ink/70 px-5 py-4">
                    <div className="mb-2 flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-neon-cyan/80">
                      <span>TRANSMITTING<span className="cursor" /></span>
                      <span className="tabular-nums text-white/60">{Math.min(100, Math.round(progress))}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden bg-white/10">
                      <div
                        className="h-full bg-neon-blue"
                        style={{ width: `${Math.min(100, progress)}%`, boxShadow: "0 0 12px rgba(59,130,246,.9), 0 0 24px rgba(56,189,248,.5)", transition: "width .08s linear" }}
                      />
                    </div>
                    <div className="mt-2 font-mono text-[9px] tracking-[0.2em] text-white/30">
                      ENCRYPTING PACKET // ROUTING THROUGH NODE_07 // HANDSHAKE OK
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="glitch-btn clip-bevel-sm group block w-full bg-gradient-to-br from-neon-violet/60 to-neon-blue/45 p-px sm:w-auto"
                  >
                    <span className="clip-bevel-sm flex items-center justify-center gap-3 bg-inkpanel px-8 py-3.5 font-mono text-[14px] tracking-[0.12em] text-neon-violetlite transition-colors duration-300 group-hover:text-white">
                      <span className="glitch-txt glow-violet">$ transmit_message</span>
                      <span className="text-neon-cyan/70">▸</span>
                    </span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- section ---------------- */
export default function Contact() {
  return (
    <section id="contact" className="cyber-bg relative w-full overflow-hidden font-display text-white">
      <CyberBackdrop />
      <div className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-neon-violet/12 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[38rem] w-[38rem] rounded-full bg-neon-blue/12 blur-[150px]" />

      {/* fixed-corner HUD readout */}
      <div className="pointer-events-none absolute left-5 top-5 z-20 hidden font-mono text-[10px] tracking-[0.2em] text-neon-cyan/45 sm:block">
        <div>UPLINK // 04</div>
        <div className="mt-1 text-white/25">LAT 41.9028 · LON 12.4964</div>
      </div>
      <div className="pointer-events-none absolute right-5 top-5 z-20 hidden items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-neon-violetlite/55 sm:flex">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#a855f7", color: "#a855f7" }} />
        SECURE LINE OPEN
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col justify-center px-6 py-24 lg:px-8">
        <SectionHeading
          kicker="04 — UPLINK.SYS"
          title={
            <>
              OPEN A <span className="text-neon-violetlite">SECURE CHANNEL</span>
            </>
          }
          command="./connect --target fsc --encrypt aes256"
        />

        {/* terminal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <MailClient />
        </motion.div>

        {/* node footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-x-10 gap-y-4 sm:flex-row sm:justify-center"
        >
          <NodeLink label="GITHUB" addr="git://Frappa251" href="https://github.com/Frappa251" />
          <NodeLink label="TELEGRAM" addr="tg://Frappa_251" href="https://t.me/Frappa_251" />
          <NodeLink label="MAIL" addr="smtp://fsc" href={`mailto:${EMAIL}`} />
        </motion.div>
      </div>

      {/* texture overlays */}
      <div className="crt-fine pointer-events-none absolute inset-0 z-20" />
      <div className="scanlines pointer-events-none absolute inset-0 z-20 opacity-30" />
      <div className="pointer-events-none absolute inset-0 z-20" style={{ background: "radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.5) 100%)" }} />
    </section>
  );
}
