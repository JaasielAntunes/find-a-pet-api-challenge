/* eslint-disable prettier/prettier */
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface NearbyOrgsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}


interface NearbyOrgsUseCaseResponse {
  orgs: Org[];
}

export class NearbyOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) { }

  async execute({
    userLatitude,
    userLongitude,
  }: NearbyOrgsUseCaseRequest): Promise<NearbyOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      orgs,
    }
  }
}
