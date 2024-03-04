import { FastifyInstance } from "fastify";
import { createOrgController } from "./create-org-controller";
import { findAllOrgsController } from "./find-all-org-controller";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController);
  app.get("/orgs", findAllOrgsController);
}
