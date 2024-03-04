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
      about: data.about,
      age: data.age,
      breed: data.breed ?? null,
      name: data.name,
      org_id: data.org_id,
      type: data.type,
    };

    this.items.push(pet);
    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async findAll(): Promise<Pet[]> {
    return this.items;
  }
}
