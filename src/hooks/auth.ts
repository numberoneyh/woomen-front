import { useAppSelector } from '../app/hooks'

export const useAuth = (): { isAuth: boolean; token: string | null } => {
  const token: string | null = useAppSelector(state => state.userReducer.token)
  const isAuth: boolean = Boolean(token)

  return {
    isAuth,
    token
  }
}