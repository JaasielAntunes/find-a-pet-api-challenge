import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";

type Overwrite = {
  org_id?: string;
  age?: string;
  type?: string;
  breed?: string;
};

export function makePet(overwrite?: Overwrite) {
  return {
    id: randomUUID(),
    org_id: overwrite?.org_id ?? randomUUID(),
    name: faker.animal.cat(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int().toString(),
    type:
      overwrite?.type ??
      faker.helpers.arrayElement(["Cachorro", "Gato", "Pássaro"]),
    breed:
      overwrite?.breed ??
      faker.helpers.arrayElement(["Bengala", "Siamês", "Persa", "Maine Coon"]),
  };
}
