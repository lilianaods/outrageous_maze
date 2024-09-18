import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import fastify from "fastify";
dotenv.config();

const app = fastify();
const prisma = new PrismaClient();

app.get("/posts", async (req, res) => {
  return await prisma.post.findMany({ select: { id: true, title: true } });
});

app.listen({ port: process.env.PORT });
