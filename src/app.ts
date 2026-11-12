import express, { Request, Response } from "express";
import postRoutes from "./routes/post";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

// main();

app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
