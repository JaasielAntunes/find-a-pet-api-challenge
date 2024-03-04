import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { makeOrg } from "tests/factories/org-factory";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { CreateOrgUseCase } from "./create-org-use-case";

describe("Caso de uso para cadastrar uma Org", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: CreateOrgUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  test("Deve ser possível cadastrar uma org", async () => {
    const { org } = await sut.execute(makeOrg());

    expect(orgsRepository.items).toHaveLength(1);
    expect(org.id).toEqual(expect.any(String));
  });

  test("Não deveria ser possível criar uma nova organização com um e-mail já usado", async () => {
    const org = makeOrg();

    await orgsRepository.create(org);

    await expect(sut.execute(org)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    );
  });

  test("Deve ser gerado o hash da senha no cadastro", async () => {
    const password = "1234567";
    const { org } = await sut.execute(makeOrg({ password }));

    expect(await compare(password, org.password)).toBe(true);
    expect(await compare(password, orgsRepository.items[0].password)).toBe(
      true,
    );
  });
});
