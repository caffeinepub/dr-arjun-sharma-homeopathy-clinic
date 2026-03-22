import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDoctorContext } from "@/context/DoctorContext";
import { useSubmitContactMessage } from "@/hooks/useQueries";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const INITIAL: ContactForm = { name: "", phone: "", email: "", message: "" };

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="WhatsApp"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#25D366"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactSection() {
  const { profile } = useDoctorContext();
  const [form, setForm] = useState<ContactForm>(INITIAL);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    mutateAsync: submitMessage,
    isPending,
    error,
  } = useSubmitContactMessage();

  const contactDetails = [
    {
      icon: MapPin,
      label: "Address",
      value: profile.address,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Clock,
      label: "Clinic Hours",
      value: profile.clinicHours,
    },
  ];

  const handleChange =
    (field: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMessage(form);
      setIsSuccess(true);
      setForm(INITIAL);
    } catch {
      // error surfaced via error state
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            className="mb-4 text-forest-light border-forest-light font-medium"
            variant="outline"
          >
            Get in Touch
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-forest mb-4 leading-tight">
            Contact <span className="italic text-forest-light">the Clinic</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Have questions? Reach out to us and we'll get back to you within 24
            hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Contact Details */}
          <div>
            <div className="space-y-6 mb-8">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "oklch(0.42 0.085 158 / 0.12)" }}
                  >
                    <Icon className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-body text-foreground hover:text-forest transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-body text-foreground whitespace-pre-line">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <div className="flex gap-4 items-start">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "oklch(0.55 0.18 145 / 0.15)" }}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                    WhatsApp
                  </div>
                  <a
                    href="https://wa.me/919289371243"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-body text-foreground hover:text-forest transition-colors"
                  >
                    9289371243
                  </a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden border border-border"
              style={{ height: "240px" }}
            >
              <iframe
                title="Clinic location map"
                src="https://maps.google.com/maps?q=Rajasthan+Apartment+Sector+4+Dwarka+Delhi+110078&output=embed"
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="bg-cream rounded-2xl border border-border p-8">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.42 0.085 158 / 0.15)" }}
                >
                  <CheckCircle2 className="w-8 h-8 text-forest" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-forest">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="mt-2 border-forest text-forest hover:bg-secondary"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-forest mb-2">
                  Send a Message
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-phone"
                      className="text-sm font-medium"
                    >
                      Phone
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 xxxxx xxxxx"
                      value={form.phone}
                      onChange={handleChange("phone")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-medium"
                    >
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="text-sm font-medium"
                  >
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={form.message}
                    onChange={handleChange("message")}
                    required
                    className="resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">
                    Something went wrong. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-forest hover:bg-forest-light text-white font-semibold py-5"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
