import React, { ChangeEventHandler } from 'react';
import './index.scss'

interface Props {
  label: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const BaseTextField: React.FC<Props> = (props) => {
  const { label, value, onChange } = props;
  return (
    <div className="baseTextField">
      <div className="baseTextField__label">
        {label}
      </div>
      <div className="baseTextField__content">
        <input type="text" value={value} onChange={onChange} />
      </div>
    </div>
  )
}