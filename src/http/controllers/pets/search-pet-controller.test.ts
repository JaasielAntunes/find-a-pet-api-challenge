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

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: org.city });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(2);
  });

  test("não deve ser possível encontrar animais de estimação sem cidade", async () => {
    const response = await request(app.server).get("/orgs/pets");
    expect(response.status).toBe(400);
  });

  test("deve ser capaz de pesquisar animais de estimação por cidade e idade", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ age: "1" }));

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: org.city, age: "1" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  test("deve ser capaz de pesquisar animais de estimação por cidade e tamanho", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ type: "small" }));

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ type: "medium" }));

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ type: "large" }));

    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: org.city, size: "small" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  test("deve ser capaz de procurar animais de estimação por cidade e nível de energia", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ breed: "Test" }));

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ breed: "Test" }));

    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: org.city, breed: "Test" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  test("deve ser capaz de pesquisar animais de estimação por cidade e ambiente", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ age: "1" }));

    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: org.city, age: "1" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  // create a test with a lot of pets that combines all the filters
  test("deve ser capaz de pesquisar animais de estimação por cidade e todos os filtros", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    const pets = [
      makePet({
        age: "1",

        type: "low",
        breed: "indoor",
      }),
      makePet({
        age: "2",
        type: "medium",
        breed: "outdoor",
      }),
      makePet({
        age: "1",
        breed: "high",
      }),
      makePet({
        age: "4",
        type: "low",
        breed: "outdoor",
      }),
      makePet({
        age: "5",
        type: "medium",
      }),
    ];

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post("/orgs/pets")
          .set("Authorization", `Bearer ${authResponse.body.token}`)
          .send(pet),
      ),
    );

    let response = await request(app.server).get("/orgs/pets").query({
      city: org.city,
      age: "1",

      breed: "low",
      type: "indoor",
    });

    expect(response.body.pets).toHaveLength(1);

    response = await request(app.server).get("/orgs/pets").query({
      city: org.city,
      size: "medium",
    });

    expect(response.body.pets).toHaveLength(2);

    response = await request(app.server).get("/orgs/pets").query({
      city: org.city,
      breed: "low",
    });

    expect(response.body.pets).toHaveLength(2);
  });
});
