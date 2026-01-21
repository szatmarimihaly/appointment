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
  number : string;
  alphabet : string;
  phone : string;
  createdAt: Date;
  updatedAt: Date;
};

export interface Services {
    name: string,
    description: string,
    price: number,
    deviza: string,
    duration: number
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
    number: string,
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
    number : string,
    alphabet : string,
    phone : string,
};

export interface CompanyCardProps {
    company: Company
};

export interface CompanyListProps {
    companies: Company[]
};