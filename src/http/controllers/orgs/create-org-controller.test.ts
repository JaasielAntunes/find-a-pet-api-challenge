import request from "supertest";
import { app } from "@/app";
import { beforeAll, afterAll, expect, describe, test } from "vitest";
import { makeOrg } from "tests/factories/org-factory";

describe("Cadastrar uma Org (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Deve ser possível cadastrar uma org", async () => {
    const response = await request(app.server).post("/orgs").send(makeOrg());
    expect(response.status).toBe(201);
  });
});
