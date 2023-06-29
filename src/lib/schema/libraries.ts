import { int, mysqlEnum, mysqlTable, serial, uniqueIndex, varchar, datetime, boolean } from 'drizzle-orm/mysql-core';
import { nanoid } from '../db';

export const librarySystems = mysqlTable("library_systems", {
  id: serial("id").primaryKey(),
  publicId: varchar("public_id", { length: 16 }).default(nanoid()),
  createdAt: datetime("created_at"),
  updatedAt: datetime("updated_at"),
  name: varchar("name", { length: 255 })
}, (librarySystems) => ({
  publicIdIndex: uniqueIndex("public_id_idx").on(librarySystems.publicId),
}))

export const libraries = mysqlTable("libraries", {
  id: serial("id").primaryKey(),
  publicId: varchar("public_id", { length: 16 }).default(nanoid()),
  createdAt: datetime("created_at"),
  updatedAt: datetime("updated_at"),
  name: varchar("name", { length: 255 }),
  shortName: varchar("short_name", { length: 25 }),
  mailingAddress: varchar("mailing_address", { length: 255 }),
  mailingCity: varchar("mailing_city", { length: 255 }),
  mailingState: varchar("mailing_state", { length: 2 }),
  mailingZip: varchar("mailing_zip", { length: 25 }),
  address: varchar("address", { length: 255}),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 2 }),
  postalCode: varchar("postal_code", { length: 25 }),
  acceptsVoluteers: boolean("acceptsVoluteers"),
  bookBountyPoints: int("book_bounty_points"),
  librarySystemsId: int("library_systems_id").references(() => librarySystems.id)
}, (libraries) => ({
  publicIdIdx: uniqueIndex("public_id_idx").on(libraries.id)
}))