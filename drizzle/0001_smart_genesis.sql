CREATE TABLE "appointments" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"service_id" text,
	"date" date NOT NULL,
	"start_slot" integer NOT NULL,
	"end_slot" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"customer_name" text,
	"customer_email" text,
	"customer_phone" text,
	"cancel_token" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "appointments_cancel_token_unique" UNIQUE("cancel_token"),
	CONSTRAINT "appointments_slot_bounds_check" CHECK ("appointments"."start_slot" >= 0 AND "appointments"."end_slot" <= 144),
	CONSTRAINT "appointments_start_before_end_check" CHECK ("appointments"."start_slot" < "appointments"."end_slot"),
	CONSTRAINT "appointments_status_check" CHECK ("appointments"."status" IN ('pending', 'booked', 'completed', 'cancelled'))
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "appointments_companyId_idx" ON "appointments" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "appointments_date_idx" ON "appointments" USING btree ("date");--> statement-breakpoint
CREATE INDEX "appointments_companyId_date_idx" ON "appointments" USING btree ("company_id","date");--> statement-breakpoint
CREATE INDEX "appointments_status_idx" ON "appointments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "appointments_serviceId_idx" ON "appointments" USING btree ("service_id");--> statement-breakpoint
CREATE UNIQUE INDEX "appointments_cancelToken_idx" ON "appointments" USING btree ("cancel_token");