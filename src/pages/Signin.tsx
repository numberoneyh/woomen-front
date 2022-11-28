import React, { FC, useEffect, useState } from 'react'
import { UiInput } from '../components/UI/UiInput/UiInput'
import { UiButton } from '../components/UI/UiButton/UiButton'
import { Container } from '../components/UI/Container'
import { Link, useNavigate } from 'react-router-dom'
import { todoApi } from '../app/todo/todo.api'
import { Err, Login } from '../models'
import { useActions } from '../hooks/actions'
import { useAuth } from '../hooks/auth'

const Signin: FC = () => {
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  const [err, setErr] = useState<Err>()
  const { setToken } = useActions()
  const [register, { isError }] = todoApi.useLoginMutation()
  const [value, setValue] = useState<Login>({
    email: 'test@gmail.com',
    password: 'kompl211',
  })

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', value.email || '')
    formData.append('password', value.password || '')
    // @ts-ignore
    await register(formData)
      .unwrap()
      .then(data => setToken(data.token))
      .catch(res => setErr(res))
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/todo', { replace: true })
      window.location.reload();
    }
  }, [isAuth, navigate])

  return (
    <Container>
      <form className={'form'} onSubmit={onSubmit}>
        <UiInput
          value={value.email}
          onChange={e => setValue({ ...value, email: e.target.value })}
          text={'Email'}
          type={'text'}
        />
        <UiInput
          value={value.password}
          onChange={e => setValue({ ...value, password: e.target.value })}
          text={'Password'}
          type={'password'}
        />
        <UiButton type={'submit'} text={'Log in'} variant={'primary'} />
        <div className={'form__link'}>
          {isError && <h4>{err?.data}</h4>}
          <span>create account:</span>
          <Link to={'/'}> Sign up </Link>
        </div>
      </form>
    </Container>
  )
}

export { Signin }
