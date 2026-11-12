import { user as usersTable, post as postsTable } from "./src/db/schema";
import db from "./src/db/schema";
import { eq } from "drizzle-orm";

const main = async () => {
  const user: typeof usersTable.$inferInsert = {
    firstName: "John",
    lastName: "Smith",
    email: "j@example.com",
  };

  await db.insert(usersTable).values(user);

  const newUser = (
    await db.select().from(usersTable).where(eq(usersTable.email, user.email))
  )[0];

  const post: typeof postsTable.$inferInsert = {
    title: "PostTitle",
    body: "PostBody",
    authorId: newUser.id,
  };

  await db.insert(postsTable).values(post);

  await db
    .update(usersTable)
    .set({
      lastName: "SmithEdited",
    })
    .where(eq(usersTable.lastName, user.lastName));

  await db.delete(postsTable).where(eq(postsTable.authorId, newUser.id));
  await db.delete(usersTable).where(eq(usersTable.email, user.email));
};

export default main;
