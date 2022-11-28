import React, { FC, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

interface RequireAuthProps {
  children: JSX.Element
}

const RequireAuth: FC<RequireAuthProps> = ({children}) => {
  const {isAuth} = useAuth()

  if (!isAuth) {
    return <Navigate to={'/signin'}/>
  }

  return children
}

export { RequireAuth }