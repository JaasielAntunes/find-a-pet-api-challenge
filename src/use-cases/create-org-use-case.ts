/* eslint-disable prettier/prettier */
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { hash } from "bcryptjs";

interface CreateOrgUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  password: string;
  whatsapp: string;
  city: string;
  state: string;
  street: string;
  cep: string;
  latitude: number;
  longitude: number;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) { }

  async execute({
    name,
    author_name,
    email,
    password,
    whatsapp,
    city,
    state,
    street,
    cep,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email);

    if (orgByEmail) throw new OrgAlreadyExistsError();

    const password_hash = await hash(password, 8);

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      password: password_hash,
      whatsapp,
      city,
      state,
      street,
      cep,
      latitude,
      longitude,
    });

    return {
      org,
    };
  }
}
