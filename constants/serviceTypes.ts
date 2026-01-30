export const SERVICE_TYPES = [
    "Hairdresser", "Personal Trainer", "Barber", "Massage", "Beauty", "Yoga", "Pilates Instructor", "Nutritionist", "Tech company" 
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

export const COUNTRIES = [
    "Magyarország", 
    "Germany", 
    "Slovakia"
] as const;
export type CountryType = (typeof COUNTRIES)[number];