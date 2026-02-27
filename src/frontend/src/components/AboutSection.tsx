import { Award, GraduationCap, Users2, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDoctorContext } from "@/context/DoctorContext";

const stats = [
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "5000+", label: "Happy Patients", icon: Users2 },
  { value: "200+", label: "Conditions Treated", icon: Stethoscope },
];

export function AboutSection() {
  const { profile } = useDoctorContext();

  // Build qualification list from the qualification string
  const qualifications = profile.qualification
    .split(",")
    .map((q) => q.trim())
    .filter(Boolean);

  return (
    <section id="about" className="py-24 bg-cream leaf-pattern">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Doctor Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-hero">
              <img
                src="/assets/generated/doctor-portrait.dim_600x700.jpg"
                alt={`${profile.name} — Homeopathic Doctor`}
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
              {/* Decorative border */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: "inset 0 0 0 1px oklch(0.42 0.085 158 / 0.15)" }}
              />
            </div>
            {/* Floating credential card */}
            <div
              className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-xl p-4 shadow-card border border-border max-w-[220px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-5 h-5 text-forest" />
                <span className="text-xs font-semibold text-forest uppercase tracking-wide">{qualifications[0] ?? "BHMS"}</span>
              </div>
              <p className="text-sm text-muted-foreground font-body">{profile.qualification}</p>
            </div>
            {/* Decorative green square */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-xl opacity-20 -z-10"
              style={{ background: "oklch(0.42 0.085 158)" }}
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div>
            <Badge
              className="mb-4 text-forest-light border-forest-light font-medium"
              variant="outline"
            >
              About the Doctor
            </Badge>

            <h2 className="font-display text-4xl md:text-5xl font-semibold text-forest mb-6 leading-tight">
              About{" "}
              <span className="italic text-forest-light">{profile.name}</span>
            </h2>

            {/* Qualifications */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gold mb-3">
                Qualifications
              </h3>
              <ul className="space-y-2">
                {qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "oklch(0.42 0.085 158)" }}
                    />
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bio */}
            <p className="text-base text-foreground/80 leading-relaxed mb-8 font-body">
              {profile.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="text-center p-4 rounded-xl border border-border bg-white shadow-xs"
                >
                  <Icon className="w-6 h-6 text-forest mx-auto mb-2" />
                  <div className="font-display text-3xl font-bold text-forest mb-0.5">{value}</div>
                  <div className="text-xs text-muted-foreground font-body leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
