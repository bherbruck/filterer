import { Field } from '../components/FieldEditor'
import { Filter } from './filter'

export const isInBrackets = (str: string) =>
  str.startsWith('{') && str.endsWith('}') // TODO: allow custom brackets

export const getFieldValue = (value: string, fields: Field[]): string => {
  if (!isInBrackets(value)) return value
  const fieldName = value.slice(1, -1)
  return fields.find((field) => field.name === fieldName)?.value ?? value
}

export const replaceFieldValues = (
  fields: Field[],
  filters: Filter[]
): Filter[] => {
  const replaced = filters.map((filter) => {
    if (filter.filters)
      return { ...filter, filters: replaceFieldValues(fields, filter.filters) }
    const { x, y } = filter
    const xValue = getFieldValue(x as string, fields)
    const yValue = getFieldValue(y as string, fields)
    return { ...filter, x: xValue, y: yValue }
  })

  return replaced
}
