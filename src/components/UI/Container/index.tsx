import React, { FC } from 'react'
import style from './Container.module.scss'

interface ContainerProps {
  children: React.ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className={style.root}>
      {children}
    </div>
  )
}

export { Container }