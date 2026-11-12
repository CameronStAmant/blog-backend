import { defineRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const post = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  body: varchar({ length: 10000 }).notNull(),
  authorId: integer("author_id")
    .references(() => user.id)
    .notNull(),
});

const relations = defineRelations({ user, post }, (r) => ({
  post: {
    author: r.one.user({
      from: r.post.authorId,
      to: r.user.id,
    }),
  },
  user: {
    posts: r.many.post(),
  },
}));

const db = drizzle(process.env.DATABASE_URL!, { relations });

export default db;
