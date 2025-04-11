import React, { useState } from 'react'
import { RadioChangeEvent } from 'antd'
import * as S from './Radio.style'

interface RadioProps {
  defaultValue?: string | number
  onChange?: (value: string | number) => void
  options: { value: string | number; label: React.ReactNode }[]
  style?: React.CSSProperties
}

export function Radio({ defaultValue, onChange, options, style }: RadioProps) {
  const [selectedValue, setSelectedValue] = useState<string | number>(
    defaultValue || '',
  )

  const handleChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value
    setSelectedValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <S.RadioGroup value={selectedValue} onChange={handleChange} style={style}>
      {options.map(option => (
        <S.Radio key={option.value} value={option.value}>
          {option.label}
        </S.Radio>
      ))}
    </S.RadioGroup>
  )
}
