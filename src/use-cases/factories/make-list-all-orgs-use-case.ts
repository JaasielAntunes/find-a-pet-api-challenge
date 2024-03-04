import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { ListAllOrgsUseCase } from "../list-all-orgs-use-case";

export function makeListAllUseCase() {
  return new ListAllOrgsUseCase(new PrismaOrgsRepository());
}
