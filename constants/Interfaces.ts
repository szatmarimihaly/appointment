export interface Company {
    id: string,
    ownerId: string,
    name: string,
    description: string,
    serviceType: string,
    createdAt: string,
    updatedAt: string
};

export interface CompanyCardProps {
    company: Company
};

export interface CompanyListProps {
    companies: Company[]
};