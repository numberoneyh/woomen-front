import React, { useState } from 'react'
import { todoApi } from '../../app/todo/todo.api'
import { UiInput } from '../UI/UiInput/UiInput'
import { UiButton } from '../UI/UiButton/UiButton'
import { FaRegPlusSquare } from 'react-icons/fa'
import style from './TodoAdd.module.scss'

const TodoAdd = () => {
  const [createTodo] = todoApi.useAddTodosMutation()
  const [title, setTitle] = useState('')

  const addTodo = async () => {
    await createTodo({
      title: title ? title : 'new todo',
    }).unwrap().catch(() => setTitle('error on create post'))
    await setTitle('')
  }

  return (
    <div className={style.todoAdd}>
      <UiInput value={title} onChange={(e) => setTitle(e.target.value)} text={'Add todo'} type={'text'}/>
      <UiButton onClick={addTodo} icon={<FaRegPlusSquare/>} text={'add'}/>
    </div>
  )
}

export { TodoAdd }