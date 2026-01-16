ALTER TABLE "company" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "name_search" text NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "service_type_search" text NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "rating" double precision DEFAULT 5 NOT NULL;--> statement-breakpoint
CREATE INDEX "company_serviceTypeSearch_idx" ON "company" USING btree ("service_type_search");--> statement-breakpoint
CREATE INDEX "company_nameSearch_idx" ON "company" USING btree ("name_search");