import { makeNearbyUseCase } from "@/use-cases/factories/make-nearby-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

const searchSchema = z.object({
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

export async function nearbyOrgsController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const search = searchSchema.parse(req.query);

  const nearbyUseCase = makeNearbyUseCase();

  try {
    const { orgs } = await nearbyUseCase.execute({
      userLatitude: search.latitude,
      userLongitude: search.longitude,
    });
    return res.status(200).send({ orgs });
  } catch (error) {
    console.error(error);

    return res.status(500).send({ message: "Erro interno no servidor!" });
  }
}
