import express from "express";
import cors from "cors";
import { PrismaClient } from "../generated/prisma";
import ProductRouter from "./routes/product.routes.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/api/product", ProductRouter);

app.get("/", (_req, res) => {
  res.send("API is running ");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
