import request from "supertest";
import { beforeAll, afterAll, expect, describe, test } from "vitest";
import { app } from "@/app";
import { makePet } from "tests/factories/pet-factory";

describe("Cadastro de Pet (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Deve ser possível cadastrar um pet", async () => {
    const response = await request(app.server).post("/pets").send(makePet());
    expect(response.status).toBe(201);
  });
});
