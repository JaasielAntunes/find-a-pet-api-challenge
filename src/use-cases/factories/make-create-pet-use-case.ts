import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../create-pet-use-case";

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(new PrismaPetsRepository());
}
