import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetApprovedTestimonials } from "@/hooks/useQueries";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: bigint;
  patientName: string;
  testimonialText: string;
  rating: bigint;
  approved: boolean;
  date: bigint;
}

const fallbackTestimonials = [
  {
    id: 1n,
    patientName: "Ramesh Kumar",
    testimonialText:
      "Dr. Sharma cured my 10-year chronic skin condition in just 3 months. The treatment was gentle and completely natural. I am amazed by the results. Highly recommend to anyone suffering from skin issues!",
    rating: 5n,
    approved: true,
    date: 0n,
  },
  {
    id: 2n,
    patientName: "Priya Singh",
    testimonialText:
      "My child's recurrent fever and cold stopped completely after treatment. Dr. Sharma explains everything so patiently and the medicines are completely safe for kids. Amazing results!",
    rating: 5n,
    approved: true,
    date: 0n,
  },
  {
    id: 3n,
    patientName: "Anil Verma",
    testimonialText:
      "Very knowledgeable doctor. He explains everything patiently and thoroughly. My arthritis pain has reduced significantly after 2 months of treatment. I feel much better overall.",
    rating: 4n,
    approved: true,
    date: 0n,
  },
];

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_POSITIONS.map((pos) => (
        <Star
          key={pos}
          className={`w-4 h-4 ${pos <= rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative p-6 rounded-2xl bg-white border border-border shadow-xs hover:shadow-card transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4">
      {/* Quote icon */}
      <Quote
        className="w-8 h-8 opacity-10 absolute top-4 right-4"
        style={{ color: "oklch(0.32 0.085 158)" }}
        aria-hidden="true"
      />

      {/* Rating */}
      <StarRating rating={Number(testimonial.rating)} />

      {/* Text */}
      <p className="text-sm text-foreground/80 font-body leading-relaxed flex-1">
        "{testimonial.testimonialText}"
      </p>

      {/* Patient info */}
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
          style={{ background: "oklch(0.42 0.085 158)" }}
        >
          {testimonial.patientName.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-semibold text-forest font-body">
            {testimonial.patientName}
          </div>
          <div className="text-xs text-muted-foreground">Verified Patient</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { data: testimonials, isLoading } = useGetApprovedTestimonials();

  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-24 bg-cream-dark">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            className="mb-4 text-forest-light border-forest-light font-medium"
            variant="outline"
          >
            Patient Stories
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-forest mb-4 leading-tight">
            What Our{" "}
            <span className="italic text-forest-light">Patients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base font-body">
            Real experiences from patients who found lasting wellness through
            homeopathic care.
          </p>
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {(["a", "b", "c"] as const).map((id) => (
              <div
                key={id}
                className="p-6 rounded-2xl bg-white border border-border space-y-3"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="w-9 h-9 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {displayTestimonials.map((t) => (
              <TestimonialCard key={String(t.id)} testimonial={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
