import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { makeOrg } from "tests/factories/org-factory";
import { NearbyOrgsUseCase } from "./nearby-orgs-use-case";

describe("Caso de uso para organizações próximas", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: NearbyOrgsUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new NearbyOrgsUseCase(orgsRepository);
  });

  test("Deve ser possiível encontrar as organizações mais próximas", async () => {
    const org = await orgsRepository.create(makeOrg());

    const nearbyOrgs = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    });

    expect(nearbyOrgs.orgs).toEqual([org]);
  });
});
