import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, doublePrecision, integer } from "drizzle-orm/pg-core";

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
  zipCode: text("zip_code").notNull().default("No data provided."),
  address: text("address").notNull().default("No data provided."),
  number: text("street_number").notNull().default("No data provided."),
  alphabet: text("house_alphabet").notNull().default("No data provided."),
  phone: text("phone").notNull().default("No data provided."),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull() 
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
  duration: integer("duration").notNull().default(15)
},
(table) => [
  index("services_ownerId_idx").on(table.ownerId),
  index("services_companyOwner_idx").on(table.ownerCompanyId),
]
)

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
