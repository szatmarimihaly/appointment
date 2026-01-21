ALTER TABLE "company" ADD COLUMN "country" text DEFAULT 'Magyarország' NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "city" text DEFAULT 'No data provided.' NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "zip_code" text DEFAULT 'No data provided.' NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "address" text DEFAULT 'No data provided.' NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "street_number" text DEFAULT 'No data provided.' NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "house_alphabet" text DEFAULT 'No data provided.' NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "phone" text DEFAULT 'No data provided.' NOT NULL;