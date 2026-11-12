import { defineRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
});

export const post = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  body: varchar({ length: 10000 }).notNull(),
  creationTimestamp: timestamp("creation_timestamp").defaultNow(),
  published: boolean().default(false),
  authorId: integer("author_id")
    .references(() => user.id)
    .notNull(),
});

export const comment = pgTable("comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  body: varchar({ length: 10000 }).notNull(),
  creationTimestamp: timestamp("creation_timestamp").defaultNow(),
  postId: integer("post_id")
    .references(() => post.id)
    .notNull(),
  authorId: integer("author_id")
    .references(() => user.id)
    .notNull(),
});

const relations = defineRelations({ user, post, comment }, (r) => ({
  post: {
    author: r.one.user({
      from: r.post.authorId,
      to: r.user.id,
    }),
  },
  user: {
    posts: r.many.post(),
  },
  comment: {
    author: r.one.user({
      from: r.comment.authorId,
      to: r.user.id,
    }),
    post: r.one.post({
      from: r.comment.postId,
      to: r.post.id,
    }),
  },
}));

const db = drizzle(process.env.DATABASE_URL!, { relations });

export default db;
