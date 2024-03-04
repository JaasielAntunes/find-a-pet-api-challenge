import request from "supertest";
import { app } from "@/app";
import { beforeAll, afterAll, expect, describe, test } from "vitest";
import { makeOrg } from "tests/factories/org-factory";

describe("Autenticação de Org (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Deve ser possível se autenticar", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const response = await request(app.server).post("/orgs/authenticate").send({
      email: org.email,
      password: org.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
  });
});
