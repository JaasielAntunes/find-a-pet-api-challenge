/* eslint-disable prettier/prettier */
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface ListAllOrgsUseCaseResponse {
  orgs: Org[];
}

export class ListAllOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) { }

  async execute(): Promise<ListAllOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findAll();
    return { orgs };
  }
}
