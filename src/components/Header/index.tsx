import { FC } from 'react'
import { Container } from '../UI/Container'
import style from './Header.module.scss'
import decode from 'jwt-decode'
import { useAuth } from '../../hooks/auth'
import { IUser } from '../../models'
import { Link } from 'react-router-dom'
import { useActions } from '../../hooks/actions'

const Header: FC = () => {
  const { token, isAuth } = useAuth()
  const user: IUser = token ? decode(token) : {}
  const {removeToken} = useActions()

  return (
    <header className={style.header}>
      <Container>
        <div className={style.parent}>
          <h1 className={style.h1}>Womanup todo</h1>
          <div className={style.img}>
            {isAuth ? (
              <>
                <Link to={'/todo'}>My Todos</Link>
                <Link to={'/'} onClick={() => removeToken()}>Signout</Link>
                <img
                  src={`http://localhost:5000/api/${user.avatar}`}
                  alt={user.avatar}
                />
              </>
            ): <Link to={'/'}>SignUp</Link>}
          </div>
        </div>
      </Container>
    </header>
  )
}

export { Header }