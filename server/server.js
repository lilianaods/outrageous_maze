import dotenv from "dotenv";
import fastify from "fastify";
dotenv.config();

const app = fastify();

app.listen({ port: process.env.PORT });
