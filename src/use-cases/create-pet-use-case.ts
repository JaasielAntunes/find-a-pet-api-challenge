/* eslint-disable prettier/prettier */
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: string;
  type: string;
  breed?: string;
  org_id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    name,
    about,
    age,
    type,
    breed,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      type,
      breed,
      org_id,
    });

    return {
      pet,
    };
  }
}
