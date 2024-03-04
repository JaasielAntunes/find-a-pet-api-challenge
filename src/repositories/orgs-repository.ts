import { Prisma, Org } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface OrgsRepository {
  create: (data: Prisma.OrgCreateInput) => Promise<Org>;
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findAllOrgs(): Promise<Org[]>;
  findManyNearby(params: FindManyNearbyParams): Promise<Org[]>;
}
