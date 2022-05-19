import { type FC, useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/solid'
import { type Field, FieldEditor } from './FieldEditor'
import { insert } from '../lib/insert'
import { v4 as uuid } from 'uuid'

export type FieldListProps = {
  initialFields: Field[]
  onChange?: (fields: Field[]) => void
}

export const FieldList: FC<FieldListProps> = ({
  initialFields = [],
  onChange,
}) => {
  const [fields, setFields] = useState<Field[]>(initialFields)

  useEffect(() => {
    onChange && onChange(fields)
  }, [fields])

  return (
    <div className="flex w-full flex-col gap-2">
      <button
        onClick={() =>
          setFields([...fields, { id: uuid(), name: '', value: '' }])
        }
        className="btn btn-square"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      {fields.map((field, index) => (
        <FieldEditor
          initialField={field}
          key={field.id}
          onChange={(newField) => setFields(insert(fields, index, newField))}
          onDelete={() => setFields(fields.filter((_, i) => i !== index))}
        />
      ))}
    </div>
  )
}
