import React, { FC, useState } from 'react'
import decode from 'jwt-decode'
import { IUser } from '../models'
import { todoApi } from '../app/todo/todo.api'
import { Container } from '../components/UI/Container'
import { TodoList } from '../components/TodoList'
import { TodoAdd } from '../components/TodoAdd'
import { useAuth } from '../hooks/auth'
import { Paginate } from '../components/Paginate'

const Todos: FC = () => {
  const { token } = useAuth()
  const { id }: IUser = token ? decode(token) : {}
  const [page, setPage] = useState<number>(1)
  const { data } = todoApi.useTodosQuery({ limit: 5, page: page, id: id })

  const nexHandler = () => {
    setPage(page + 1)
  }

  const prevHandler = () => {
    setPage(page - 1)
  }

  const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage(parseInt(e.currentTarget.innerText))
  }

  return (
    <Container>
      <TodoAdd />
      {data?.docs.length ? <TodoList data={data} /> : <h2>not todo</h2>}
      {data?.docs.length ? (
        <Paginate
          response={data}
          nexHandler={nexHandler}
          prevHandler={prevHandler}
          pageHandler={pageHandler}
        />
      ) : (
        <span></span>
      )}
    </Container>
  )
}

export { Todos }