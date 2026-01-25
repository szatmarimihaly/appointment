CREATE TABLE "weekly_working_hours" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"weekday" integer NOT NULL,
	"start_slot" integer NOT NULL,
	"end_slot" integer NOT NULL,
	CONSTRAINT "weekly_working_hours_weekday_check" CHECK ("weekly_working_hours"."start_slot" < 0 AND "weekly_working_hours"."end_slot" <= 144),
	CONSTRAINT "weekly_working_hours_slot_bounds_check" CHECK ("weekly_working_hours"."start_slot" >= 0 AND "weekly_working_hours"."end_slot" <=144),
	CONSTRAINT "weekly_working_hours_start_before_end_check" CHECK ("weekly_working_hours"."start_slot" < "weekly_working_hours"."end_slot")
);
--> statement-breakpoint
ALTER TABLE "weekly_working_hours" ADD CONSTRAINT "weekly_working_hours_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "weekly_working_hours_company_weekday_uq" ON "weekly_working_hours" USING btree ("company_id","weekday");--> statement-breakpoint
CREATE INDEX "weekly_working_hours_companyId_idx" ON "weekly_working_hours" USING btree ("company_id");