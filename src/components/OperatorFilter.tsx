import { type FC, useState, useEffect } from 'react'
import { type Operator, OPERATOR, COMPARATOR, Filter } from '../lib/filter'
import { ComparatorFilter } from './ComparatorFilter'
import { Dropdown } from './Dropdown'
import { PlusIcon, TrashIcon } from '@heroicons/react/solid'
import { insert } from '../lib/insert'
import { v4 as uuid } from 'uuid'

export type OperatorFilterProps = {
  initialOperator: Operator
  operatorNames?: string[]
  onChange?: (operator: Operator) => void
  onDelete?: (operator: Operator) => void
}

export const OperatorFilter: FC<OperatorFilterProps> = ({
  initialOperator,
  onChange,
  onDelete,
  operatorNames = Object.keys(OPERATOR),
}) => {
  const [operator, setOperator] = useState(initialOperator)

  useEffect(() => {
    onChange && onChange(operator)
  }, [operator])

  const handleChange = (index: number, newFilter: Filter) =>
    setOperator({
      ...operator,
      filters: insert(operator.filters, index, newFilter),
    })

  const handleDelete = (index: number) =>
    setOperator({
      ...operator,
      filters: operator.filters.filter((_, i) => i !== index),
    })

  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border-2 border-base-300 p-2">
      <div className="flex w-full flex-row gap-2">
        <Dropdown
          items={operatorNames}
          onChange={(item) => setOperator({ ...operator, fn: OPERATOR[item] })}
        >
          {operator.fn.name}
        </Dropdown>
        <Dropdown
          items={['Operator', 'Comparator']}
          onChange={(item) => {
            if (item === 'Operator')
              setOperator({
                ...operator,
                filters: [
                  ...operator.filters,
                  { fn: OPERATOR.and, id: uuid(), filters: [] },
                ],
              })
            if (item === 'Comparator')
              setOperator({
                ...operator,
                filters: [
                  ...operator.filters,
                  { fn: COMPARATOR.equalTo, id: uuid(), x: '', y: '' },
                ],
              })
          }}
        >
          <PlusIcon className="h-6 w-6" />
        </Dropdown>
        <div className="flex-1" />
        <button
          tabIndex={1}
          className="btn btn-square text-sm"
          onClick={() => onDelete && onDelete(operator)}
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>

      {operator.filters.map((filter, index) => (
        <div key={filter.id} className="flex w-full flex-col gap-2">
          {!!filter.filters ? (
            <OperatorFilter
              initialOperator={filter}
              onChange={(newFilter) => handleChange(index, newFilter)}
              onDelete={() => handleDelete(index)}
            />
          ) : (
            <ComparatorFilter
              initialComparator={filter}
              onChange={(newFilter) => handleChange(index, newFilter)}
              onDelete={() => handleDelete(index)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
