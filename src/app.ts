import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { ZodError } from "zod";
import fastifyCookie from "@fastify/cookie";
import { petsRoutes } from "./http/controllers/pets/pets-routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "5d",
  },
});

app.register(fastifyCookie);

app.register(petsRoutes);

app.setErrorHandler((error, req, res) => {
  if (error.code === "FST_JWT_NO_AUTHORIZATION_IN_COOKIE") {
    return res
      .status(401)
      .send({ message: "Token JWT inválido!", code: error.code });
  }

  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Erro de validação!", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return res.status(500).send({
    message: "Erro interno no servidor! Tente novamente mais tarde.",
  });
});
