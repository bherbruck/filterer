// just don't put any json in here
export const parseValue = (value: string): any => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
