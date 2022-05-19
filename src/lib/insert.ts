export const insert = <T>(arr: T[], index: number, value: T) =>
  arr.map((item, i) => (i === index ? value : item))
