import {
  user as usersTable,
  post as postsTable,
  comment as commentsTable,
} from "./src/db/schema";
import db from "./src/db/schema";
import { eq } from "drizzle-orm";

const main = async () => {
  const user: typeof usersTable.$inferInsert = {
    firstName: "John",
    lastName: "Smith",
    email: `${crypto.randomUUID()}@example.com`,
    password: "password",
  };

  await db.insert(usersTable).values(user);

  const newUser = (
    await db.select().from(usersTable).where(eq(usersTable.email, user.email))
  )[0];

  const post: typeof postsTable.$inferInsert = {
    title: `PostTitle-${crypto.randomUUID()}`,
    body: "PostBody",
    authorId: newUser.id,
  };

  await db.insert(postsTable).values(post);

  const newPost = (
    await db.select().from(postsTable).where(eq(postsTable.title, post.title))
  )[0];

  const comment: typeof commentsTable.$inferInsert = {
    authorId: newUser.id,
    body: `CommentBody-${crypto.randomUUID()}`,
    postId: newPost.id,
  };

  await db.insert(commentsTable).values(comment);

  await db
    .update(usersTable)
    .set({
      lastName: "SmithEdited",
    })
    .where(eq(usersTable.lastName, user.lastName));

  await db.delete(commentsTable).where(eq(commentsTable.authorId, newUser.id));
  await db.delete(postsTable).where(eq(postsTable.authorId, newUser.id));
  await db.delete(usersTable).where(eq(usersTable.email, user.email));
};

export default main;
