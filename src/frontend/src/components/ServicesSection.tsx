import { Badge } from "@/components/ui/badge";
import { useDoctorContext } from "@/context/DoctorContext";
import {
  Droplets,
  Leaf,
  Scale,
  Scissors,
  Sparkles,
  Wind,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SERVICE_ICONS: LucideIcon[] = [
  Zap,
  Scale,
  Sparkles,
  Droplets,
  Wind,
  Leaf,
  Scissors,
];
const SERVICE_COLORS = [
  "oklch(0.65 0.09 145)",
  "oklch(0.72 0.12 80)",
  "oklch(0.6 0.08 200)",
  "oklch(0.62 0.1 30)",
  "oklch(0.58 0.11 155)",
  "oklch(0.6 0.13 168)",
  "oklch(0.65 0.11 120)",
];

const FALLBACK_SERVICES = [
  {
    title: "Laser Treatment",
    description:
      "Advanced laser therapy for skin rejuvenation, scar reduction, pigmentation, and other cosmetic concerns.",
  },
  {
    title: "Weight Loss Diet Counseling",
    description:
      "Personalized diet plans and counseling to help you achieve and maintain a healthy weight effectively.",
  },
  {
    title: "Skin Disease Treatment",
    description:
      "Effective treatment for eczema, psoriasis, acne, urticaria, and other acute and chronic skin conditions.",
  },
  {
    title: "Liver Disease Treatment",
    description:
      "Holistic homeopathic care for liver disorders including fatty liver, hepatitis support, and liver function improvement.",
  },
  {
    title: "Allergic Treatment",
    description:
      "Targeted treatment for all types of allergies — dust, food, seasonal, and skin allergies with long-lasting relief.",
  },
  {
    title: "Hair Loss Treatment",
    description:
      "Effective homeopathic remedies for hair fall, alopecia, thinning hair, and promoting healthy hair regrowth.",
  },
  {
    title: "Dandruff Treatment",
    description:
      "Treating scalp conditions including dandruff, seborrheic dermatitis, and dry/oily scalp issues naturally.",
  },
];

export function ServicesSection() {
  const { services, loading } = useDoctorContext();

  // Use backend services if available, otherwise fall back to static list
  const displayServices =
    services.length > 0
      ? services
      : loading
        ? []
        : FALLBACK_SERVICES.map((s, i) => ({ id: BigInt(i), ...s }));

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            className="mb-4 text-forest-light border-forest-light font-medium"
            variant="outline"
          >
            What We Treat
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-forest mb-4 leading-tight">
            Treatments &amp;{" "}
            <span className="italic text-forest-light">Specializations</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base font-body">
            Dr. Sheeba provides personalized homeopathic treatment across a wide
            range of acute and chronic conditions, tailored to each patient's
            unique constitution.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
              <div
                key={sk}
                className="p-6 rounded-2xl border border-border bg-white animate-pulse"
              >
                <div className="w-12 h-12 rounded-xl bg-muted mb-4" />
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-full mb-1" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            ))}
          </div>
        )}

        {/* Services Grid */}
        {!loading && displayServices.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-body">
            <Leaf className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Services are being updated. Please check back soon.</p>
          </div>
        )}

        {!loading && displayServices.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, idx) => {
              const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
              const color = SERVICE_COLORS[idx % SERVICE_COLORS.length];
              return (
                <div
                  key={service.id.toString()}
                  className="group relative p-6 rounded-2xl border border-border bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {/* Background accent */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-6 transition-opacity group-hover:opacity-10"
                    style={{
                      background: `radial-gradient(circle at top right, ${color}, transparent)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-xs"
                    style={{ background: `${color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-forest mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to right, ${color}, transparent)`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
