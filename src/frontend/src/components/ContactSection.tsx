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
