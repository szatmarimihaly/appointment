// lib/query/searchCompanies.ts
import { db } from "@/db";
import { company } from "@/db/schema";
import { like, or, desc, asc } from "drizzle-orm";
import { searchify } from "@/utils/searchify";
import type { Company } from "@/constants/Interfaces";

export async function searchCompanies(searchTerm: string): Promise<Company[]> {
  if (!searchTerm || searchTerm.trim() === "") {
    // Return all companies sorted by reviews if no search term
    const companies = await db.query.company.findMany({
      orderBy: [desc(company.rating), asc(company.createdAt)],
      limit:3
    });
    return companies;
  }

  const formattedSearch = searchify(searchTerm);

  const companies = await db.query.company.findMany({
    where: or(
      like(company.nameSearch, `%${formattedSearch}%`),
      like(company.serviceTypeSearch, `%${formattedSearch}%`)
    ),
    orderBy: [desc(company.rating), desc(company.createdAt)],
  });

  return companies;
}