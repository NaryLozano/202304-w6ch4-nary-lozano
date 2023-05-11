import express from "express";
import morgan from "morgan";
import knownThings from "../data/knownThings.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.get("/things", (req, res) => {
  res.status(200).json(knownThings);
});

app.use((req, res) => {
  res.status(404).json({ message: "End point not found" });
});

export default app;
