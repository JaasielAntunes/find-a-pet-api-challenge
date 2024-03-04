/* eslint-disable prettier/prettier */
import { OrgsRepository } from "@/repositories/orgs-repository";
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
  constructor(private orgsRepository: OrgsRepository, private petsRepository: PetsRepository) { }

  async execute({
    name,
    about,
    age,
    type,
    breed,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new Error()
    }

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
