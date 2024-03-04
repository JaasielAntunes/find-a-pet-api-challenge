import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

const createOrgBodySchema = z.object({
  name: z.string().min(3).max(25),
  author_name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(7).max(20),
  whatsapp: z.string().max(14),
  city: z.string().min(4).max(20),
  state: z.string().min(4).max(15),
  street: z.string().min(4).max(20),
  cep: z.string().max(10),
  latitude: z
    .number()
    .max(12)
    .refine((value) => {
      return Math.abs(value) <= 90;
    }),
  longitude: z
    .number()
    .max(12)
    .refine((value) => {
      return Math.abs(value) <= 180;
    }),
});

export async function createOrgController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const body = createOrgBodySchema.parse(req.body);

  const createOrgUseCase = makeCreateOrgUseCase();

  try {
    const { org } = await createOrgUseCase.execute(body);
    return res.status(201).send(org);
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return res.status(400).send({
        message: err.message,
      });
    }
  }
}
