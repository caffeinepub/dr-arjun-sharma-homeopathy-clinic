import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { AdminPanel } from "./components/AdminPanel";
import { AppointmentSection } from "./components/AppointmentSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ServicesSection } from "./components/ServicesSection";
import { WhyHomeopathySection } from "./components/WhyHomeopathySection";
import { DoctorProvider } from "./context/DoctorContext";

function scrollToSection(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

export default function App() {
  const hash = useHash();
  const isAdmin = hash === "#/admin";

  if (isAdmin) {
    return (
      <>
        <Toaster richColors position="top-right" />
        <AdminPanel />
      </>
    );
  }

  return (
    <DoctorProvider>
      <div className="min-h-screen font-body bg-background">
        <Toaster richColors position="top-right" />
        <Navbar />

        <main>
          <HeroSection
            onBookAppointment={() => scrollToSection("#appointment")}
            onLearnMore={() => scrollToSection("#about")}
          />
          <AboutSection />
          <ServicesSection />
          <WhyHomeopathySection />
          <AppointmentSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </DoctorProvider>
  );
}
