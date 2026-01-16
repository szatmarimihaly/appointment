ALTER TABLE "company" ADD COLUMN "slug" text;--> statement-breakpoint
CREATE INDEX "company_slug_idx" ON "company" USING btree ("slug");