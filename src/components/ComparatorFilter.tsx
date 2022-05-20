import { type FC, useState, useEffect } from 'react'
import { type Comparator, COMPARATOR } from '../lib/filter'
import { Dropdown } from './Dropdown'
import { TrashIcon } from '@heroicons/react/solid'

const comparatorNames = Object.keys(COMPARATOR)

export type ComparatorFilterProps = {
  initialComparator: Comparator
  onChange?: (comparator: Comparator) => void
  onDelete?: (comparator: Comparator) => void
}

export const ComparatorFilter: FC<ComparatorFilterProps> = ({
  initialComparator,
  onChange,
  onDelete,
}) => {
  const [comparator, setComparator] = useState(initialComparator)

  useEffect(() => {
    onChange && onChange(comparator)
  }, [comparator])

  return (
    <div className="flex w-full flex-row gap-2">
      <input
        className="input w-24 flex-1 font-mono"
        onChange={(e) =>
          setComparator({
            ...comparator,
            x: e.target.value,
          })
        }
      />
      <Dropdown
        items={comparatorNames}
        onChange={(item) =>
          setComparator({ ...comparator, fn: COMPARATOR[item] })
        }
      >
        {comparator.fn.name}
      </Dropdown>
      <input
        className="input w-24 flex-1 font-mono"
        onChange={(e) =>
          setComparator({
            ...comparator,
            y: e.target.value,
          })
        }
      />
      {/* <div className="flex-1" /> */}
      <button
        tabIndex={1}
        className="btn btn-square text-sm"
        onClick={() => onDelete && onDelete(comparator)}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </div>
  )
}
