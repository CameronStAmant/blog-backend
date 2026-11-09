import express, { Request, Response } from "express";
import main from "../dbSeed";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

main();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
