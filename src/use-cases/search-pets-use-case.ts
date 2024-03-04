/* eslint-disable prettier/prettier */
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetNotFoundError } from "./errors/pet-not-found-error";

interface SearchPetsUseCaseRequest {
  city: string;
  age?: string;
  type?: string;
  breed?: string;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ city, age, type, breed }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      type,
      breed
    })

    if (!pets) throw new PetNotFoundError()

    return { pets }
  }
}
