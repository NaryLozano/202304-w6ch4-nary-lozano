import express from "express";
import { type Request, type Response } from "express";
import crypto from "crypto";
import morgan from "morgan";
import knownThings from "../data/knownThings.js";
import { type KnownThingsStructure } from "../types";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.get("/things", (req, res) => {
  res.status(200).json(knownThings);
});

app.get("/things/:idThing", (req, res) => {
  const { idThing } = req.params;
  const knownThing = knownThings.find((thing) => thing.id === idThing);
  if (!knownThing) {
    res.status(404).json({ message: "Thing not found" });
    return;
  }

  res.status(200).json(knownThing);
});

app.delete("/things/:idThing", (req, res) => {
  const { idThing } = req.params;
  const thingToDelete = knownThings.findIndex((thing) => thing.id === idThing);
  if (thingToDelete === -1) {
    res.status(404).json({ message: "Thing not found" });
    return;
  }

  knownThings.splice(thingToDelete, 1);

  res.status(200).json({ message: "thing deleted" });
});

app.post(
  "/things",
  (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      KnownThingsStructure
    >,
    res: Response
  ) => {
    const newKnownThing = { id: crypto.randomUUID(), ...req.body };
    knownThings.push(newKnownThing);
    res.status(201).json(newKnownThing);
  }
);

app.use((req, res) => {
  res.status(404).json({ message: "End point not found" });
});

export default app;
