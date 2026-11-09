import express, { Request, Response } from "express";
import { users as usersTable } from "./db/schema";
import db from "./db/schema";
import { eq } from "drizzle-orm";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

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

main();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
