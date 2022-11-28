import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Doc, Login, LoginData, Register, ResponseTodos } from '../../models'
import { RootState } from '../store'

type userParams = {
  id: string | undefined
  limit: number
  page: number
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL as string,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userReducer.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: build => ({
    register: build.mutation({
      query: (body: Register) => ({
        url: 'api/user/signup',
        method: 'POST',
        body: body,
      }),
    }),
    login: build.mutation<LoginData, Login>({
      query: (body: Login) => ({
        url: 'api/user/signin',
        method: 'POST',
        body: body,
      }),
    }),
    todos: build.query<ResponseTodos | undefined, userParams>({
      query: ({ limit, page, id }) => ({
        url: 'api/todos/' + id,
        params: {
          limit: limit,
          page: page
        },
      }),
      providesTags: (result) =>
        result
          ? [
            { type: 'Todos', id: 'LIST' },
          ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    updateTodos: build.mutation({
      query: ({ id, body }: {id: string | undefined, body: Doc}) => ({
        url: 'api/todos/' + id,
        method: 'PUT',
        body: {...body},
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    deleTodo: build.mutation({
      query: (id) => ({
        url: 'api/todos/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    addTodos: build.mutation({
      query: (body) => ({
        url: 'api/todos',
        method: 'POST',
        body: {...body},
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),
})
