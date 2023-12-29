export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-amil already exits')
  }
}
