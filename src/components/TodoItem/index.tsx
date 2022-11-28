import React, { FC, useState } from 'react'
import { UiCheckbox } from '../UI/UiCheckbox/UiCheckbox'
import { UiButton } from '../UI/UiButton/UiButton'
import style from './TodoItem.module.scss'
import { Doc } from '../../models'
import { todoApi } from '../../app/todo/todo.api'
import { UiInput } from '../UI/UiInput/UiInput'

interface TodoItemProps {
  item: Doc
}

const TodoItem: FC<TodoItemProps> = ({ item }) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const [updateTodo] = todoApi.useUpdateTodosMutation()
  const [removeTodo] = todoApi.useDeleTodoMutation()

  const oncCheck = async () => {
    await updateTodo({
      id: item?._id,
      body: {
        complete: !item.complete,
      },
    }).unwrap().catch(() => alert('error on check'))
  }

  const editTodo = async () => {
    await updateTodo({
      id: item?._id,
      body: {
        title: title ? title : item.title,
      },
    }).unwrap().catch(() => alert('error on edit'))
    await setIsActive(false)
  }

  const deleteTodo = async () => {
    await removeTodo(item?._id).unwrap().catch(() => alert('error on delete'))
  }

  return (
    <li className={style.content}>
      <div className={style.text}>
        <UiCheckbox checked={item.complete} onChange={oncCheck} />
        <UiInput
          disabled={!isActive}
          onChange={e => setTitle(e.target.value)}
          text={item?.title}
          type={'text'}
        />
      </div>
      <div className={style.btns}>
        {isActive ? (
          <UiButton
            onClick={editTodo}
            type={'button'}
            text={'done'}
            variant={'success'}
          />
        ) : (
          <UiButton
            onClick={() => setIsActive(true)}
            type={'button'}
            text={'edit'}
            variant={'primary'}
          />
        )}
        <UiButton
          onClick={deleteTodo}
          type={'button'}
          text={'delete'}
          variant={'error'}
        />
      </div>
    </li>
  )
}

export { TodoItem }