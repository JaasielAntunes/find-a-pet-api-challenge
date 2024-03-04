import { FastifyInstance } from "fastify";
import { createPetController } from "./create-pet-controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { getPetController } from "./get-pet-controller";
import { searchPetController } from "./search-pet-controller";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/orgs/pets", { onRequest: [verifyJwt] }, createPetController);
  app.get("/orgs/pets/:id", getPetController);
  app.get("/orgs/pets", searchPetController);
}
