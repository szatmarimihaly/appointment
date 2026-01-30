import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, doublePrecision, integer, uniqueIndex, check, date } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const company = pgTable("company", {
  id: text("id").primaryKey().notNull(),
  ownerId: text("owner_id").notNull().references(() => user.id, { onDelete : "cascade" }),
  name: text("name").notNull(),
  nameSearch: text("name_search").notNull(),
  description: text("description").notNull(),
  slug : text("slug").notNull().unique(),
  serviceType: text("service_type").notNull(),
  serviceTypeSearch: text("service_type_search").notNull(),
  rating: doublePrecision("rating").default(5.0).notNull(),
  imageUrl: text("image_url"),
  country : text("country").notNull().default("Magyarország"),
  city: text("city").notNull().default("No data provided."),
  zipCode: text("zip_code").notNull().default("1121"),
  address: text("address").notNull().default("No data provided."),
  number: integer("street_number").notNull().default(10),
  alphabet: text("house_alphabet").notNull().default("No data provided."),
  phone: text("phone").notNull().default("No data provided."),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  instagramUrl: text("instagram_url"),
  websiteUrl: text("website_url")
},
(table) => [
  index("company_ownerId_idx").on(table.ownerId),
  index("company_slug_idx").on(table.slug),
  index("company_serviceTypeSearch_idx").on(table.serviceTypeSearch),
  index("company_nameSearch_idx").on(table.nameSearch)
  ],
);

export const services = pgTable("services", {
  id: text("id").primaryKey().notNull(),
  ownerId: text("owner_id").notNull().references(() => user.id, { onDelete : "cascade" }),
  ownerCompanyId: text("owner_company_id").notNull().references(() => company.id,{ onDelete : "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  deviza: text("deviza").notNull().default("HUF"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  duration: integer("duration").notNull().default(10)
},
(table) => [
  index("services_ownerId_idx").on(table.ownerId),
  index("services_companyOwner_idx").on(table.ownerCompanyId),
]
);

export const appointments = pgTable("appointments", {
  id: text("id").primaryKey().notNull(),
  companyId: text("company_id").notNull().references(() => company.id, { onDelete: "cascade" }),
  serviceId: text("service_id").references(() => services.id, { onDelete: "set null" }),
  date: date("date").notNull(),
  startSlot: integer("start_slot").notNull(),
  endSlot: integer("end_slot").notNull(),
  status: text("status").notNull().default("pending"), // IT CAN ONLY BE: pending, booked, completed, cancelled
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  cancelToken: text("cancel_token").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
},
(table) => [
  index("appointments_companyId_idx").on(table.companyId),
  index("appointments_date_idx").on(table.date),
  index("appointments_companyId_date_idx").on(table.companyId, table.date),
  index("appointments_status_idx").on(table.status),
  index("appointments_serviceId_idx").on(table.serviceId),
  uniqueIndex("appointments_cancelToken_idx").on(table.cancelToken),

  check("appointments_slot_bounds_check", 
    sql`${table.startSlot} >= 0 AND ${table.endSlot} <= 144`
  ),
  check("appointments_start_before_end_check", 
    sql`${table.startSlot} < ${table.endSlot}`
  ),
  check("appointments_status_check", 
    sql`${table.status} IN ('pending', 'booked', 'completed', 'cancelled')`
  )
]);

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  company: one(company, {
    fields: [appointments.companyId],
    references: [company.id]
  }),
  service: one(services, {
    fields: [appointments.serviceId],
    references: [services.id]
  })
}));

export const companyRelations = relations(company, ({ one }) => ({
  owner: one(user, {
    fields: [company.ownerId],
    references: [user.id]
  })
}));

export const servicesRelations = relations(services, ({ one }) => ({
  owner: one(user, {
    fields: [services.ownerId],
    references: [user.id]
  })
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
