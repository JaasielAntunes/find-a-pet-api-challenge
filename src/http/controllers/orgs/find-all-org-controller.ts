import { FastifyRequest, FastifyReply } from "fastify";
import { makeListAllUseCase } from "@/use-cases/factories/make-list-all-orgs-use-case";

export async function findAllOrgsController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const listAllUseCase = makeListAllUseCase();

  try {
    const { orgs } = await listAllUseCase.execute();
    return res.status(200).send(orgs);
  } catch (err) {
    return res.status(500).send({
      message: "Erro interno do servidor ao buscar organizações!",
    });
  }
}
