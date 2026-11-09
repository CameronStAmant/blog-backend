import { users as usersTable } from "./src/db/schema";
import db from "./src/db/schema";
import { eq } from "drizzle-orm";

const main = async () => {
  const user: typeof usersTable.$inferInsert = {
    firstName: "John",
    lastName: "Smith",
    email: "j@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  await db
    .update(usersTable)
    .set({
      lastName: "SmithEdited",
    })
    .where(eq(usersTable.lastName, user.lastName));

  console.log("User info updated!");

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("User deleted!");
};

export default main;
