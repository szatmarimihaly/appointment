export const SERVICE_TYPES = [
    "Hairdresser", "Personal Trainer", "Massage Therapist", "Yoga Instructor", "Physical Therapist", "Barber",
    "Fitness Coach", "Nutritionist", "Pilates Instructor", "Chiropractor", "Dentist", "Dermatologist", "Eye Doctor", "Foot Doctor", "Gastroenterologist", "Heart Doctor", "Hormone Doctor", "Kidney Doctor", "Liver Doctor", "Lung Doctor", "Mouth Doctor", "Nose Doctor", "Ophthalmologist", "Oral Surgeon", "Orthopedist", "Pediatrician", "Plastic Surgeon", "Psychiatrist", "Psychologist", "Skin Doctor", "Spine Doctor", "Thyroid Doctor", "Urologist", "Vascular Surgeon", "Vitamin Doctor", "Weight Doctor", "X-Ray Doctor", "Zinc Doctor" 
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];