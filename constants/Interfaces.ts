export interface Company {
  id: string;
  ownerId: string;
  name: string;
  nameSearch: string;
  description: string;
  slug: string;
  serviceType: string;
  serviceTypeSearch: string
  rating: number;
  imageUrl: string | null;
  country : string;
  city : string;
  zipCode : string;
  address : string;
  number : number;
  alphabet : string;
  phone : string;
  createdAt: Date;
  updatedAt: Date;
  instagramUrl: string | null;
  websiteUrl: string | null;
  timezone: string | null;
};

export interface Appointment {
    id: string,
    date: string,
    startSlot: number,
    endSlot: number,
    status: "pending" | "booked" | "completed" | "cancelled"
}

export interface Services {
    id: string,
    name: string,
    description: string,
    price: number,
    deviza: string,
    duration: number
};

export interface WorkingHours {
    id: string,
    companyId: string,
    weekday: number,
    startSlot: number,
    endSlot: number
};

export interface CompanySearchCardProps{
    id: string,
    name: string,
    slug: string,
    serviceType: string,
    rating: number,
    imageUrl: string | null,
    zipCode: string,
    address: string,
    city: string,
    number: number,
    alphabet: string
};

export interface CompanyDetailProps{
    slug : string,
    name : string,
    description : string,
    serviceType : string,
    rating : number,
    imageUrl : string | null,
    country : string,
    city : string,
    zipCode : string,
    address : string,
    number : number,
    alphabet : string,
    phone : string,
    instagramUrl: string | null
    websiteUrl: string | null
};

export interface CompanyCardProps {
    company: Company
};

export interface CompanyListProps {
    companies: Company[]
};