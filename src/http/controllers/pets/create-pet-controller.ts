import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.string(),
  type: z.string(),
  breed: z.string(),
});

export async function createPetController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const body = bodySchema.parse(req.body);

  const createPetUseCase = makeCreatePetUseCase();

  const org_id = req.user.sub;

  try {
    const { pet } = await createPetUseCase.execute({
      ...body,
      org_id,
    });
    return res.status(201).send(pet);
  } catch (e) {
    if (e instanceof OrgNotFoundError) {
      return res.status(404).send({ message: e.message });
    }

    console.log(e);
    return res.status(500).send({ message: "Erro interno no servidor!" });
  }
}
