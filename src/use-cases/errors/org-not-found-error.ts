export class OrgNotFoundError extends Error {
  constructor() {
    super("ORG não encontrada!");
  }
}
