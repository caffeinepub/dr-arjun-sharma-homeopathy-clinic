import type { DoctorProfile, Service } from "@/backend.d";
import { createActorWithConfig } from "@/config";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DEFAULT_PROFILE: DoctorProfile = {
  name: "Dr. Sheeba",
  qualification: "BHMS, Surgery",
  bio: "Dedicated to providing gentle, effective homeopathic treatment for acute and chronic conditions. Dr. Sheeba believes in treating the whole person — mind, body, and spirit — rather than just symptoms.",
  address: "Flat C-502, Rajasthan Apartment\nSector 4, Dwarka, Delhi — 110078",
  phone: "+91 92893 71243",
  email: "dr.sheeba@homeopathy.com",
  clinicHours:
    "Mon–Sat: 11:00 AM – 8:00 PM (By Appointment)\nSunday: Pre-Appointments Only",
};

interface DoctorContextValue {
  profile: DoctorProfile;
  services: Service[];
  loading: boolean;
  refreshProfile: () => Promise<void>;
  refreshServices: () => Promise<void>;
}

const DoctorContext = createContext<DoctorContextValue>({
  profile: DEFAULT_PROFILE,
  services: [],
  loading: true,
  refreshProfile: async () => {},
  refreshServices: async () => {},
});

export function useDoctorContext() {
  return useContext(DoctorContext);
}

export function DoctorProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<DoctorProfile>(DEFAULT_PROFILE);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const actor = await createActorWithConfig();
      const result = await actor.getDoctorProfile();
      if (result !== null) {
        setProfile(result);
      }
    } catch {
      // keep defaults on error
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const actor = await createActorWithConfig();
      const result = await actor.getAllServices();
      setServices(result);
    } catch {
      // keep empty on error
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchProfile(), fetchServices()]).finally(() => {
      setLoading(false);
    });
  }, [fetchProfile, fetchServices]);

  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  const refreshServices = useCallback(async () => {
    await fetchServices();
  }, [fetchServices]);

  return (
    <DoctorContext.Provider
      value={{ profile, services, loading, refreshProfile, refreshServices }}
    >
      {children}
    </DoctorContext.Provider>
  );
}
