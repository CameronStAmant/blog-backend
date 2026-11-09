import { defineRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  body: varchar({ length: 10000 }).notNull(),
  authorId: integer("author_id"),
});

const relations = defineRelations({ users, posts }, (r) => ({
  posts: {
    author: r.one.users({
      from: r.posts.authorId,
      to: r.users.id,
    }),
  },
  users: {
    posts: r.many.posts(),
  },
}));

const db = drizzle(process.env.DATABASE_URL!, { relations });

export default db;
