import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";
import { GetPetUseCase } from "@/use-cases/get-pet-use-case";
import { makePet } from "tests/factories/pet-factory";
import { describe, test, beforeEach, expect } from "vitest";

describe("Caso de uso para buscar um pet", () => {
  let petsRepository: InMemoryPetsRepository;
  let orgsRepository: InMemoryOrgsRepository;
  let sut: GetPetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetUseCase(petsRepository);
  });

  test("Deve ser possiível buscar um pet", async () => {
    const pet = await petsRepository.create(makePet());
    const result = await sut.execute({ id: pet.id });

    expect(result.pet).toEqual(pet);
  });

  test("Não deve ser possiível buscar um pet inexistente", async () => {
    await expect(sut.execute({ id: "invalido!" })).rejects.toBeInstanceOf(
      PetNotFoundError,
    );
  });
});
