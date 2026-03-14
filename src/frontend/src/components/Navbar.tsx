import { Button } from "@/components/ui/button";
import { Leaf, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center shadow-soft transition-transform group-hover:scale-105">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-display font-semibold text-lg leading-tight transition-colors ${isScrolled ? "text-forest" : "text-white"}`}
              >
                Dr. Sheeba
              </span>
              <span
                className={`text-xs font-body leading-tight transition-colors ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}
              >
                Bachelor of Homoeopathic Medicine and Surgery -JPR
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-md hover-underline transition-colors ${
                  isScrolled
                    ? "text-foreground hover:text-forest"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919289371243"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isScrolled ? "text-forest" : "text-white/90 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>+91 92893 71243</span>
            </a>
            <Button
              onClick={() => handleNavClick("#appointment")}
              className="bg-forest hover:bg-forest-light text-white shadow-soft font-medium"
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-border shadow-soft">
          <div className="container max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 text-sm font-medium text-foreground hover:text-forest hover:bg-secondary rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 pt-3 border-t border-border">
              <Button
                onClick={() => handleNavClick("#appointment")}
                className="w-full bg-forest hover:bg-forest-light text-white"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
