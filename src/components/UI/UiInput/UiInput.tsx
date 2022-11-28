import React, { FC } from 'react'
import style from './UiInput.module.scss'

interface UiInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  text: string | undefined
  type: "text" | "password" | "email"
}

const UiInput: FC<UiInputProps> = ({ text, type, ...props }) => {
  return (
    <div className={style.inputGroup}>
      <input {...props} className={style.input} required type={type} autoComplete='off' />
      <label className={style.label}>{text}</label>
    </div>
  )
}

export { UiInput }