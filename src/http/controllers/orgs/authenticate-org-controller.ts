import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeAuthenticateOrgUseCase } from "@/use-cases/factories/make-authenticate-org-use-case";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function authenticateOrgController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const body = bodySchema.parse(req.body);

  const authenticateOrgUseCase = makeAuthenticateOrgUseCase();

  try {
    const { org } = await authenticateOrgUseCase.execute(body);

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    );

    return res.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message });
    }

    throw err;
  }
}
