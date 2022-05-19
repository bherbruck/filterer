export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export type ComparatorFunciton<T extends unknown = unknown, U extends T = T> = (
  x: T,
  y: U
) => boolean

export type OperatorFunction = (filters: FilterFunction[]) => boolean

export type FilterFunction = XOR<ComparatorFunciton, OperatorFunction>

export type Comparator<T extends unknown = unknown, U extends T = T> = {
  id?: string
  x: T
  y: U
  fn: ComparatorFunciton<T, U>
}

export type Operator = {
  id?: string
  filters: Filter[]
  fn: OperatorFunction
}

export type Filter = XOR<Comparator, Operator>

export const COMPARATOR: Record<string, ComparatorFunciton<any>> = {
  equalTo: (x, y) => x === y,
  notEqualTo: (x, y) => x !== y,
  greaterThan: (x, y) => x > y,
  greaterThanOrEqual: (x, y) => x >= y,
  lessThan: (x, y) => x < y,
  lessThanOrEqual: (x, y) => x <= y,
  in: (x, y) => y.includes(x),
  notIn: (x, y) => !y.includes(x),
  startsWith: (x, y) => x.startsWith(y),
  endsWith: (x, y) => x.endsWith(y),
  contains: (x, y) => x.includes(y),
  notContains: (x, y) => !x.includes(y),
}

export const OPERATOR: Record<string, OperatorFunction> = {
  and: (filters) => filters.every((comparator) => comparator),
  or: (filters) => filters.some((comparator) => comparator),
}

export const evaluate = (
  filters: Filter[],
  operator = OPERATOR.and
): boolean => {
  const operatorFn = (filter: Filter) =>
    filter.filters // check whether the filter is an operator or a comparator
      ? evaluate(filter.filters, filter.fn)
      : filter.fn(filter.x, filter.y)

  // I don't like this explicit check...
  // wish I could call the prototype funciton directly
  return operator === OPERATOR.and
    ? filters.every(operatorFn)
    : filters.some(operatorFn)
}
