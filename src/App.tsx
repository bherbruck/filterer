import { useMemo, useState, createContext } from 'react'
import { type Field } from './components/FieldEditor'
import { type Filter, evaluate, OPERATOR } from './lib/filter'
import { OperatorFilter } from './components/OperatorFilter'
import { FieldList } from './components/FieldList'
import { useLocalStorage } from 'react-use'
import { replaceFieldValues } from './lib/replace-field-values'

const FieldContext = createContext<Field[]>([])

export const App = () => {
  const [fields, setFields] = useLocalStorage<Field[]>('fields', [])
  // need to change data model or use serialization to use localstorage filters
  const [filters, setFilters] = useState<Filter[]>([])

  const filtersWithFields = useMemo(
    () => replaceFieldValues(fields ?? [], filters),
    [fields, filters]
  )
  const result = useMemo(() => evaluate(filtersWithFields), [filtersWithFields])

  return (
    <div className="flex max-w-3xl flex-col gap-2 p-2">
      <div className="navbar rounded-2xl bg-base-200">
        <h1 className="btn btn-ghost text-xl normal-case">filterer</h1>
      </div>

      {/* fields */}
      <div className="card w-full flex-1 overflow-visible bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Fields</h2>
          <FieldList
            initialFields={fields ?? []}
            onChange={(newFields) => setFields(newFields)}
          />
        </div>
      </div>

      {/* filters */}
      <div className="card w-full flex-1 overflow-visible bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Filters</h2>
          {/*
            TODO: use this context to style filters that are fields
            (and possibly set a shadow value)
          */}
          <FieldContext.Provider value={fields ?? []}>
            <OperatorFilter
              operatorNames={['and']} // root level is `and`
              initialOperator={{ filters: filters ?? [], fn: OPERATOR.and }}
              onChange={(operator) => setFilters(operator.filters)}
            />
          </FieldContext.Provider>
        </div>
      </div>

      {/* result */}
      <div className="card w-full flex-1 overflow-visible bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Result</h2>
          {JSON.stringify(result)}
        </div>
      </div>
    </div>
  )
}
