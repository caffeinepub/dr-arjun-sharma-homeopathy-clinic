import { useState } from "react";
import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useBookAppointment } from "@/hooks/useQueries";

interface FormState {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
}

const TIME_SLOTS = [
  { value: "morning", label: "Morning — 9:00 AM to 11:00 AM" },
  { value: "late-morning", label: "Late Morning — 11:00 AM to 1:00 PM" },
  { value: "afternoon", label: "Afternoon — 2:00 PM to 4:00 PM" },
  { value: "evening", label: "Evening — 5:00 PM to 7:00 PM" },
];

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  preferredDate: "",
  preferredTime: "",
  reason: "",
};

export function AppointmentSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutateAsync: bookAppointment, isPending, error } = useBookAppointment();

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookAppointment(form);
      setIsSuccess(true);
      setForm(INITIAL_FORM);
    } catch {
      // error is surfaced via `error` state
    }
  };

  if (isSuccess) {
    return (
      <section id="appointment" className="py-24 bg-cream">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mx-auto text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "oklch(0.42 0.085 158 / 0.15)" }}
            >
              <CheckCircle2 className="w-10 h-10 text-forest" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-forest mb-3">
              Appointment Booked!
            </h2>
            <p className="text-muted-foreground font-body mb-6">
              Thank you! Dr. Sheeba's team will confirm your appointment shortly. Please check your email for details.
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-forest hover:bg-forest-light text-white"
            >
              Book Another Appointment
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="py-24 bg-cream">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left info panel */}
          <div>
            <Badge className="mb-4 text-forest-light border-forest-light font-medium" variant="outline">
              Schedule a Visit
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-forest mb-6 leading-tight">
              Book an{" "}
              <span className="italic text-forest-light">Appointment</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Schedule your consultation with Dr. Sheeba. We offer flexible timing
              slots to fit your schedule. Appointments are confirmed within 24 hours.
            </p>

            {/* Clinic hours */}
            <div className="p-6 rounded-2xl border border-border bg-white shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <CalendarDays className="w-5 h-5 text-forest" />
                <span className="font-semibold text-forest text-sm uppercase tracking-wide">
                  Clinic Hours
                </span>
              </div>
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday – Saturday</span>
                  <span className="font-medium text-foreground">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium text-foreground">10:00 AM – 1:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appt-name" className="text-sm font-medium text-foreground">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="appt-name"
                    placeholder="Rajesh Kumar"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                    className="border-input focus:ring-forest"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appt-phone" className="text-sm font-medium text-foreground">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="appt-phone"
                    type="tel"
                    placeholder="+91 92893 71243"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    required
                    className="border-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appt-email" className="text-sm font-medium text-foreground">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="appt-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                  className="border-input"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appt-date" className="text-sm font-medium text-foreground">
                    Preferred Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="appt-date"
                    type="date"
                    min={today}
                    value={form.preferredDate}
                    onChange={handleChange("preferredDate")}
                    required
                    className="border-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Preferred Time <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.preferredTime}
                    onValueChange={(val) =>
                      setForm((prev) => ({ ...prev, preferredTime: val }))
                    }
                    required
                  >
                    <SelectTrigger className="border-input">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appt-reason" className="text-sm font-medium text-foreground">
                  Reason for Visit
                </Label>
                <Textarea
                  id="appt-reason"
                  placeholder="Briefly describe your health concern..."
                  value={form.reason}
                  onChange={handleChange("reason")}
                  rows={3}
                  className="border-input resize-none"
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
                className="w-full bg-forest hover:bg-forest-light text-white font-semibold py-6 text-base"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Book Appointment"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
