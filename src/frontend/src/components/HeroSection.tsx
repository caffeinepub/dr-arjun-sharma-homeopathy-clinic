import { Button } from "@/components/ui/button";
import { Award, ChevronDown, Users } from "lucide-react";

const trustBadges = [
  { icon: Award, label: "More than three decades of clinical experience" },
  { icon: Users, label: "10,000+ Patients" },
];

interface HeroSectionProps {
  onBookAppointment: () => void;
  onLearnMore: () => void;
}

export function HeroSection({
  onBookAppointment,
  onLearnMore,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/clinic-interior.dim_1200x600.jpg')",
        }}
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

      {/* Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left: Text */}
          <div className="flex-1 max-w-xl">
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
                  style={{
                    background: "oklch(1 0 0 / 0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "oklch(0.75 0.13 85 / 0.3)" }}
                  >
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-white font-medium text-sm">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Doctor Photo - semi-transparent */}
          <div className="flex-shrink-0 w-72 md:w-96 hidden md:block">
            <img
              src="https://i.ibb.co/jZrc1VbJ/Doctor-Photo.png"
              alt="Dr. Sheeba"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
              style={{
                maxHeight: "520px",
                objectPosition: "top center",
                opacity: 0.6,
              }}
            />
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
