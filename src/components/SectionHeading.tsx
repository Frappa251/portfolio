type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="font-mono text-xs tracking-widest text-neon-cyan">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
