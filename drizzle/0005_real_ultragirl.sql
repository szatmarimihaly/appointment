ALTER TABLE "company" DROP CONSTRAINT "company_slug_unique";--> statement-breakpoint
DROP INDEX "company_slug_idx";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN "slug";