import { FastifyInstance } from "fastify";
import { createOrgController } from "./create-org-controller";
import { findAllOrgsController } from "./find-all-org-controller";
import { authenticateOrgController } from "./authenticate-org-controller";
import { nearbyOrgsController } from "./nearby-orgs-controller";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController);
  app.post("/orgs/authenticate", authenticateOrgController);
  app.get("/orgs/find-all", findAllOrgsController);
  app.get("/orgs/nearby", nearbyOrgsController);
}
