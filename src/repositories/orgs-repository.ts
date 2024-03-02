import { Prisma, Org } from "@prisma/client";

export interface OrgsRepository {
  create: (data: Prisma.OrgCreateInput) => Promise<Org>;
  findById(id: string): Promise<Org | null>;
}
