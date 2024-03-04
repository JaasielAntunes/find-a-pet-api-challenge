import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.items.push(org);
    return org;
  }

  async findById(id: string): Promise<Org | null> {
    return this.items.find((org) => org.id === id) || null;
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((org) => org.email === email) || null;
  }

  async findAllOrgs(): Promise<Org[]> {
    return this.items;
  }
}
