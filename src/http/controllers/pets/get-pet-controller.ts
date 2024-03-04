import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";

const routeSchema = z.object({
  id: z.string(),
});

export async function getPetController(req: FastifyRequest, res: FastifyReply) {
  const { id } = routeSchema.parse(req.params);

  const getPetUseCase = makeGetPetUseCase();

  try {
    const { pet } = await getPetUseCase.execute({ id });

    return res.status(200).send(pet);
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return res.status(404).send({ message: err.message });
    }

    console.error(err);

    return res.status(500).send({ message: "Erro interno no servidor!" });
  }
}
