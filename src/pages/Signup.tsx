import React, { FC, useEffect, useRef, useState } from 'react'
import { Container } from '../components/UI/Container'
import { UiInput } from '../components/UI/UiInput/UiInput'
import { UiButton } from '../components/UI/UiButton/UiButton'
import { BiImageAdd } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { Err, Register } from '../models'
import { todoApi } from '../app/todo/todo.api'

const Signup: FC = () => {
  const ref = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [err, setErr] = useState<Err>()
  const [register, {isSuccess, isError}] = todoApi.useRegisterMutation()
  const [value, setValue] = useState<Register>({
    email: '',
    password: '',
    fullName: '',
    avatar: null
  })

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', value.email || '')
    formData.append('password', value.password || '')
    formData.append('fullName', value.fullName || '')
    // @ts-ignore
    formData.append('avatar', value.avatar ? value.avatar[0] : null)
    // @ts-ignore
    await register(formData).unwrap().catch((res) => setErr(res))
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/signin')
      window.location.reload();
    }
  }, [isSuccess, navigate])

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
        <UiInput
          value={value.fullName}
          onChange={e => setValue({ ...value, fullName: e.target.value })}
          text={'Full Name'}
          type={'text'}
        />
        <input
          type='file'
          ref={ref}
          onChange={e => setValue({ ...value, avatar: e.target.files })}
          style={{ display: 'none' }}
        />
        <UiButton
          type={'button'}
          text={'avatar'}
          icon={<BiImageAdd />}
          variant={'warning'}
          onClick={() => ref.current?.click()}
        />
        <UiButton type={'submit'} text={'register'} variant={'primary'} />
        <div className={'form__link'}>
          {isError && (<h4>{err?.data}</h4>)}
          <span>if you have a account:</span>
          <Link to={'/signin'}> Sign in </Link>
        </div>
      </form>
    </Container>
  )
}

export { Signup }
