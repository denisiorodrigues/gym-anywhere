export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Max of number check-ins reached.')
  }
}
