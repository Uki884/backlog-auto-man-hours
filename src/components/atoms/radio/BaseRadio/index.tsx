import React, { ChangeEventHandler } from 'react';
import './index.scss'

interface Props {
  label: string;
  selected: any;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const BaseRadio: React.FC<Props> = (props) => {
  const { label, selected, value, onChange } = props;
  return (
    <div className="baseRadio">
      <label>
        <input type="radio" value={value} onChange={onChange} checked={ selected === value } />
        { label }
      </label>
    </div>
  )
}