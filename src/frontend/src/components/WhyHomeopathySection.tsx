import { Heart, ShieldCheck, Target } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "No Side Effects",
    description:
      "Highly diluted natural substances work gently with your body's own healing mechanisms — completely safe for long-term use.",
  },
  {
    icon: Target,
    title: "Treats Root Cause",
    description:
      "Rather than suppressing symptoms, homeopathy identifies and addresses the underlying cause of illness for lasting relief.",
  },
  {
    icon: Heart,
    title: "Safe for All Ages",
    description:
      "From newborns to seniors, homeopathic medicines are gentle enough for everyone and can be safely used alongside other treatments.",
  },
];

export function WhyHomeopathySection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/homeopathy-remedies.dim_800x500.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.18 0.06 158 / 0.93) 0%, oklch(0.22 0.07 158 / 0.90) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold mb-3 font-body">
            The Homeopathic Way
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
            Why{" "}
            <span className="italic" style={{ color: "oklch(0.85 0.11 85)" }}>
              Homeopathy?
            </span>
          </h2>
          <p className="text-white/75 max-w-2xl mx-auto text-base font-body leading-relaxed">
            Homeopathy is a 200-year-old system of medicine that uses highly
            diluted natural substances to trigger the body's natural healing
            response. It treats the whole person — physical, mental, and
            emotional — to restore balance and harmony.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-8 rounded-2xl border border-white/15 text-center group hover:border-white/30 transition-all duration-300"
              style={{
                background: "oklch(1 0 0 / 0.07)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110 duration-300"
                style={{ background: "oklch(0.75 0.13 85 / 0.25)" }}
              >
                <Icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {title}
              </h3>
              <p className="text-white/70 text-sm font-body leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
