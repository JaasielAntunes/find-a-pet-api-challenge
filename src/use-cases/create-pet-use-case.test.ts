import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "@/use-cases/create-pet-use-case";
import { makeOrg } from "tests/factories/org-factory";
import { makePet } from "tests/factories/pet-factory";
import { OrgNotFoundError } from "./errors/org-not-found-error";

describe("Caso de uso para cadastrar um Pet", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: CreatePetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new CreatePetUseCase(petsRepository, orgsRepository);
  });

  test("Deve ser possível cadastrar um pet", async () => {
    const org = await orgsRepository.create(makeOrg());
    const { pet } = await sut.execute(makePet({ org_id: org.id }));

    expect(petsRepository.items).toHaveLength(1);
    expect(pet.id).toEqual(expect.any(String));
  });

  test("Não deve ser possivel cadastrar um pet se não existir uma ORG", async () => {
    const pet = makePet();

    await petsRepository.create(pet);

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError);
  });
});
