import { type FC, useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/solid'

export type Field = {
  id?: string
  name: string
  value: string
}

export type FieldProps = {
  initialField: Field
  onChange?: (field: Field) => void
  onDelete?: (field: Field) => void
}

export const FieldEditor: FC<FieldProps> = ({
  initialField,
  onChange,
  onDelete,
}) => {
  const [field, setField] = useState<Field>(initialField)

  useEffect(() => {
    onChange && onChange(field)
  }, [field])

  return (
    <div className="flex w-full flex-row gap-2">
      <input
        placeholder="name"
        className="input min-w-0 flex-1 font-mono"
        value={field.name}
        onChange={(e) => setField({ ...field, name: e.target.value })}
      />
      <input
        placeholder="value"
        className="input min-w-0 flex-1 font-mono"
        value={field.value}
        onChange={(e) => setField({ ...field, value: e.target.value })}
      />
      <button
        tabIndex={1}
        className="btn btn-square text-sm"
        onClick={() => onDelete && onDelete(field)}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </div>
  )
}
