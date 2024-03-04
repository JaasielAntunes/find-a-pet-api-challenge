import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { makeOrg } from "tests/factories/org-factory";
import { hash } from "bcryptjs";
import { AuthenticateOrgUseCase } from "./authenticate-org-use-case";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Caso de uso para autenticação de Org", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: AuthenticateOrgUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  test("Deve ser possível se autenticar como uma org", async () => {
    const password = "1234567";

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) }),
    );

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password,
    });

    expect(authenticatedOrg).toEqual(org);
  });

  test("Não deve ser possível se autenticar com um e-mail inválido", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "1234567",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("Não deve ser possível se autenticar com uma senha inválida", async () => {
    const password = "1234567";

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) }),
    );

    await expect(() =>
      sut.execute({
        email: org.email,
        password: "12345678",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
