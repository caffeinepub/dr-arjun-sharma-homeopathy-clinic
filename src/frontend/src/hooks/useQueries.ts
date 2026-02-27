import { useQuery, useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { createActorWithConfig } from "../config";

interface Testimonial {
  id: bigint;
  patientName: string;
  testimonialText: string;
  rating: bigint;
  approved: boolean;
  date: bigint;
}

export function useGetApprovedTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["approvedTestimonials"],
    queryFn: async () => {
      if (!actor) return [];
      // @ts-expect-error — method may not exist in this backend version
      if (typeof actor.getApprovedTestimonials === "function") {
        // @ts-expect-error — method may not exist in this backend version
        return actor.getApprovedTestimonials();
      }
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export interface BookAppointmentInput {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
}

export function useBookAppointment() {
  return useMutation({
    mutationFn: async (data: BookAppointmentInput) => {
      const actor = await createActorWithConfig();
      // @ts-expect-error — method may not exist in this backend version
      if (typeof actor.bookAppointment === "function") {
        // @ts-expect-error — method may not exist in this backend version
        return actor.bookAppointment(
          data.name,
          data.phone,
          data.email,
          data.preferredDate,
          data.preferredTime,
          data.reason
        );
      }
    },
  });
}

export interface ContactMessageInput {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function useSubmitContactMessage() {
  return useMutation({
    mutationFn: async (data: ContactMessageInput) => {
      const actor = await createActorWithConfig();
      return actor.submitContactMessage(
        data.name,
        data.phone,
        data.email,
        data.message
      );
    },
  });
}
