import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const entriesTable = pgTable("entries", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 80 }).notNull(),
  body: text().notNull(),
  orgId: text().notNull()
});

export type CreateEntryType = typeof entriesTable.$inferInsert;
export type SelectEntryType = typeof entriesTable.$inferSelect;
