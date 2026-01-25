export const SERVICE_TYPES = [
    "Hairdresser", "Personal Trainer", "Massage Therapist", "Yoga Instructor", "Physical Therapist", "Barber",
    "Fitness Coach", "Nutritionist", "Pilates Instructor", "Chiropractor", "Dentist", "Dermatologist", "Eye Doctor", "Foot Doctor", "Gastroenterologist", "Heart Doctor", "Hormone Doctor", "Kidney Doctor", "Liver Doctor", "Lung Doctor", "Mouth Doctor", "Nose Doctor", "Ophthalmologist", "Oral Surgeon", "Orthopedist", "Pediatrician", "Plastic Surgeon", "Psychiatrist", "Psychologist", "Skin Doctor", "Spine Doctor", "Thyroid Doctor", "Urologist", "Vascular Surgeon", "Vitamin Doctor", "Weight Doctor", "X-Ray Doctor", "Zinc Doctor", "Car Tuning", "Tech company", "Web developer" 
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export const DEVIZA_TYPES = [
    "HUF", "EUR", "USD", "CHF", "CZK"
] as const;

export type DevizaType = (typeof DEVIZA_TYPES)[number];

export const DURATION_TYPES = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200
] as const;

export type DurationType = (typeof DURATION_TYPES)[number];

