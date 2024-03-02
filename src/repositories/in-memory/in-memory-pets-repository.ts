/* eslint-disable prettier/prettier */
import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgsRepository) { }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      ...data,
    };

    this.items.push(pet);
    return pet;
  }
}
