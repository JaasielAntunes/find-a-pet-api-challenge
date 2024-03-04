import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { makeOrg } from "tests/factories/org-factory";
import { ListAllOrgsUseCase } from "./list-all-org-use-case";

describe("Caso de uso para listar todas as organizações", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: ListAllOrgsUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new ListAllOrgsUseCase(orgsRepository);
  });

  test("Deve retornar todas as organizações cadastradas", async () => {
    const org1 = await orgsRepository.create(makeOrg());
    const org2 = await orgsRepository.create(makeOrg());

    const { orgs } = await sut.execute();

    expect(orgs).toHaveLength(2);
    expect(orgs.map((org) => org.id)).toEqual(
      expect.arrayContaining([org1.id, org2.id]),
    );
  });

  test("Deve retornar uma lista vazia se não houver organizações cadastradas", async () => {
    const { orgs } = await sut.execute();

    expect(orgs).toHaveLength(0);
  });
});
