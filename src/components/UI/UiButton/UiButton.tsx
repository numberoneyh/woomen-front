import React, { FC, useRef } from 'react'
import style from './UiButton.module.scss'
import { useClickAnimation } from '../../../hooks/clickAnimation'

interface UiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  variant?: 'primary' | 'info' | 'success' | 'error' | 'warning'
  icon?: React.ReactNode
  ripple?: string
}

const UiButton: FC<UiButtonProps> = ({ text, icon, variant, ripple, ...props }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const classes = [style.UiButton]

  if (variant === 'primary') classes.push(style.primary)
  if (variant === 'info') classes.push(style.info)
  if (variant === 'success') classes.push(style.success)
  if (variant === 'error') classes.push(style.error)
  if (variant === 'warning') classes.push(style.warning)

  useClickAnimation(buttonRef)

  return (
      <button {...props} className={classes.join(' ')} data-ripple={ripple} ref={buttonRef}>
        {icon && icon}
        <span>{text}</span>
      </button>
  )
}

export { UiButton }