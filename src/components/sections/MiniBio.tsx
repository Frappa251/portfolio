import { motion } from "framer-motion";

export default function MiniBio() {
  return (
    <section className="border-y border-border bg-bg-elev/40">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl px-6 py-16 text-center"
      >
        <p className="text-balance text-xl leading-relaxed text-white/85 md:text-2xl">
          3rd-year{" "}
          <span className="text-neon-cyan">Computer Engineering</span>{" "}
          student at{" "}
          <span className="font-medium">Sapienza University of Rome</span>. I
          combine a strong focus on{" "}
          <span className="text-neon-pink">cybersecurity</span> and ethical
          hacking with full-stack software development to build secure and
          scalable solutions.
        </p>
      </motion.div>
    </section>
  );
}
