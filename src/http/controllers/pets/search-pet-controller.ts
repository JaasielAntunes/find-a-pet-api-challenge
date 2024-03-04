import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";
import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";

const searchSchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  type: z.string().optional(),
  breed: z.string().optional(),
});

export async function searchPetController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const { city, age, type, breed } = searchSchema.parse(req.query);

  const searchPetUseCase = makeSearchPetsUseCase();

  try {
    const { pets } = await searchPetUseCase.execute({
      city,
      age,
      type,
      breed,
    });

    return res.status(200).send({ pets });
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return res.status(404).send({ message: err.message });
    }

    console.error(err);

    return res.status(500).send({ message: "Erro interno no servidor!" });
  }
}
