import { Award, Users, Leaf, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDoctorContext } from "@/context/DoctorContext";

const trustBadges = [
  { icon: Award, label: "30+ Years Experience" },
  { icon: Users, label: "10,000+ Patients" },
  { icon: Leaf, label: "100% Natural" },
];

interface HeroSectionProps {
  onBookAppointment: () => void;
  onLearnMore: () => void;
}

export function HeroSection({ onBookAppointment, onLearnMore }: HeroSectionProps) {
  const { profile } = useDoctorContext();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/clinic-interior.dim_1200x600.jpg')" }}
        aria-hidden="true"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 158 / 0.92) 0%, oklch(0.25 0.07 158 / 0.85) 50%, oklch(0.28 0.095 158 / 0.78) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative circles */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.13 85) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-8"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.09 158) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Credentials badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-white/20 animate-fade-in"
            style={{ background: "oklch(1 0 0 / 0.12)", backdropFilter: "blur(8px)" }}>
            <Leaf className="w-4 h-4 text-gold" />
            <span className="text-white/90 text-sm font-medium">
              {profile.name} — {profile.qualification} | Dwarka, Delhi
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-tight mb-6 animate-fade-in-up">
            Natural{" "}
            <span className="italic text-gold">Healing,</span>
            <br />
            Lasting Wellness
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-white/85 mb-8 font-body leading-relaxed max-w-xl animate-fade-in-up delay-200">
            Expert Homeopathic Care in Dwarka, Delhi — Treating the whole
            person, mind, body &amp; spirit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16 animate-fade-in-up delay-300">
            <Button
              size="lg"
              onClick={onBookAppointment}
              className="bg-gold hover:bg-gold-light text-white font-semibold px-8 py-6 text-base shadow-hero transition-all duration-300 hover:shadow-hero hover:-translate-y-0.5"
              style={{ color: "oklch(0.15 0.05 40)" }}
            >
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onLearnMore}
              className="border-white/40 text-white hover:bg-white/15 px-8 py-6 text-base transition-all duration-300"
              style={{ background: "oklch(1 0 0 / 0.08)" }}
            >
              Learn More
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 sm:gap-8 animate-fade-in-up delay-400">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/15"
                style={{ background: "oklch(1 0 0 / 0.1)", backdropFilter: "blur(8px)" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.75 0.13 85 / 0.3)" }}>
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <span className="text-white font-medium text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
}
