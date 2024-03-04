import request from "supertest";
import { app } from "@/app";
import { beforeAll, afterAll, expect, describe, test } from "vitest";
import { makeOrg } from "tests/factories/org-factory";

describe("Orgs próximas (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Deve ser possível encontrar uma org proxima", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org).expect(201);

    const response = await request(app.server)
      .get("/orgs/nearby")
      .query({ latitude: org.latitude, longitude: org.longitude })
      .expect(200);

    expect(response.body.orgs).toHaveLength(1);
    expect(response.body.orgs[0].name).toEqual(org.name);
  });
});
