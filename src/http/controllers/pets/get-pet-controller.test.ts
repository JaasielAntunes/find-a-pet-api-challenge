import request from "supertest";
import { beforeAll, afterAll, expect, describe, test } from "vitest";
import { app } from "@/app";
import { makeOrg } from "tests/factories/org-factory";
import { makePet } from "tests/factories/pet-factory";

describe("Listagem de Pets (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Deve ser possível listar um pet cadastrado", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    const response = await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const getPetResponse = await request(app.server)
      .get(`/orgs/pets/${response.body.id}`)
      .set("Authorization", `Bearer ${authResponse.body.token}`);

    expect(getPetResponse.status).toBe(200);
  });
});
