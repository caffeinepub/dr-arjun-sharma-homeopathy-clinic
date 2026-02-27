# Dr. Sheeba Homeopathy Clinic

## Current State
The website displays Dr. Sheeba's real details (BHMS & Surgery, Sector 4 Dwarka address, phone 9289371243, 7 specialized services). All content is hardcoded in individual React components.

## Requested Changes (Diff)

### Add
- Backend: A `DoctorProfile` data store that holds all editable doctor details (name, qualification, address, phone, email, clinic hours, bio, services list)
- Admin panel page (route `/admin`) protected by a simple password, allowing the clinic owner to edit all doctor details and services
- All website sections (Hero, About, Services, Contact, Footer) read from a shared context/store that is populated from the backend

### Modify
- HeroSection, AboutSection, ServicesSection, ContactSection, Footer — pull dynamic data from a shared `DoctorContext` instead of hardcoded constants
- App.tsx — provide `DoctorContext` and add an admin route

### Remove
- Hardcoded contact details, qualifications, and services arrays in individual components

## Implementation Plan
1. Generate backend with DoctorProfile store (get/update profile, get/update services)
2. Create DoctorContext in frontend that fetches data from backend and provides it to all components
3. Update all sections to consume DoctorContext
4. Build AdminPanel page with edit forms for all doctor details and services
5. Add password-protected access to admin panel (simple PIN/password stored in backend)
6. Wire admin panel save actions to backend update calls

## UX Notes
- Admin panel accessible at /admin or via a hidden link in the footer
- Clean form-based UI for editing: name, qualifications, address, phone, email, hours, bio, and a list editor for services
- Changes reflect immediately on the public website after saving
- Password protection: simple admin password check before showing edit forms
