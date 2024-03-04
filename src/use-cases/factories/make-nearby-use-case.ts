import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { NearbyOrgsUseCase } from "../nearby-orgs-use-case";

export function makeNearbyUseCase() {
  return new NearbyOrgsUseCase(new PrismaOrgsRepository());
}
