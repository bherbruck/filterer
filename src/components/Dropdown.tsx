import { type FC, type ReactNode, useState } from 'react'

export type DropdownProps = {
  items: string[]
  onChange?: (item: string) => void
  className?: string
  children?: ReactNode
}

export const Dropdown: FC<DropdownProps> = ({
  items,
  onChange,
  className = '',
  children,
}) => (
  <div className={`dropdown ${className}`}>
    <button tabIndex={1} className="btn normal-case">
      {children}
    </button>
    <ul className="dropdown-content menu rounded-box max-h-64 overflow-y-scroll bg-base-100 p-2 shadow">
      {items.map((item) => (
        <li key={item} value={item}>
          <button onClick={() => onChange && onChange(item)}>{item}</button>
        </li>
      ))}
    </ul>
  </div>
)
