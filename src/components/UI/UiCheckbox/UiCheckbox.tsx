import React, { FC } from 'react'
import style from './UiCheckbox.module.scss'

interface UiCheckboxProps  {
  checked?: boolean | undefined
  onChange?: () => void
}

const UiCheckbox: FC<UiCheckboxProps> = ({checked, onChange}) => {
  return (
    <div className={style.cntr}>
      <label>
        <input checked={checked} onChange={onChange} type='checkbox' className={style.hiddenXsUs} />
        <span className={style.cbx}></span>
      </label>
    </div>
  )
}

export { UiCheckbox }
