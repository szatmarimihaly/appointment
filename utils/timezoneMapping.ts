export const COUNTRY_TIMEZONE_MAP = {
    "Magyarország" : "Europe/Budapest",
    "Germany" : "Europe/Berlin",
    "Slovakia" : "Europe/Bratislava"
}as const;
export type CountryType = keyof typeof COUNTRY_TIMEZONE_MAP;

export function getTimezoneForCountry(country: CountryType): string {
  return COUNTRY_TIMEZONE_MAP[country];
}

export function isValidCountry(country: string): country is CountryType {
  return country in COUNTRY_TIMEZONE_MAP;
}