import React, { FC } from 'react'
import style from './TodoList.module.scss'
import { TodoItem } from '../TodoItem'
import { ResponseTodos } from '../../models'

interface TodoListProps {
  data?: ResponseTodos | undefined
}

const TodoList: FC<TodoListProps> = ({data}) => {
    return (
      <ul className={style.list}>
        {data?.docs.map((item) => (
          <TodoItem item={item} key={item._id}/>
        ))}
      </ul>
    )
}

export { TodoList }