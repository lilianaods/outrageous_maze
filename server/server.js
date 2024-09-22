import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import fastify from "fastify";
dotenv.config();

const app = fastify();
app.register(sensible);
app.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
});
const prisma = new PrismaClient();

app.get("/posts", async (req, res) => {
  return await commitToDb(
    prisma.post.findMany({ select: { id: true, title: true } })
  );
});

app.listen({ port: process.env.PORT });

const commitToDb = async (promise) => {
  const [error, data] = await app.to(promise);
  if (error) return app.httpErrors.internalServerError(error.message);
  return data;
};
