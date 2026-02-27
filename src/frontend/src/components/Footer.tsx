import { Leaf, Heart, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { useDoctorContext } from "@/context/DoctorContext";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book Appointment", href: "#appointment" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const { profile } = useDoctorContext();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAdminAccess = () => {
    window.location.hash = "#/admin";
    window.location.reload();
  };

  return (
    <footer className="bg-forest text-white/85">
      {/* Main footer content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "oklch(1 0 0 / 0.15)" }}>
                <Leaf className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="font-display font-semibold text-white text-lg leading-tight">
                  {profile.name}
                </div>
                <div className="text-xs text-white/60">{profile.qualification}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/65 mb-6 font-body">
              Providing gentle, effective homeopathic care for families across Dwarka and Delhi
              with {profile.name}'s trusted expertise.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/20"
                style={{ background: "oklch(1 0 0 / 0.1)" }}
              >
                <Instagram className="w-4 h-4 text-white/80" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/20"
                style={{ background: "oklch(1 0 0 / 0.1)" }}
              >
                <Facebook className="w-4 h-4 text-white/80" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(href)}
                    className="text-sm text-white/65 hover:text-white transition-colors font-body"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-white/65 font-body whitespace-pre-line">
                  {profile.address}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="text-sm text-white/65 hover:text-white transition-colors font-body"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-white/65 hover:text-white transition-colors font-body break-all"
                >
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-5"
        style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50 font-body">
            © 2026 Dr. Sheeba Homeopathy Clinic. All rights reserved.
          </p>
          <p className="text-xs text-white/50 font-body flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-gold fill-gold" /> using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 underline underline-offset-2 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
        {/* Hidden admin link */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex justify-end mt-1">
          <button
            type="button"
            onClick={handleAdminAccess}
            className="text-xs text-white/20 hover:text-white/60 transition-colors font-body cursor-pointer"
            aria-label="Admin access"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
