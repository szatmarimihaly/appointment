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
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanySearchCardProps{
    id: string,
    name: string,
    slug: string,
    serviceType: string,
    rating: number,
    imageUrl: string | null
}

export interface CompanyCardProps {
    company: Company
};

export interface CompanyListProps {
    companies: Company[]
};