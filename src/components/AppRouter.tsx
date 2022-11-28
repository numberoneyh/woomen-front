import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./Layout";
import { Todos } from '../pages/Todos'
import { Signup } from '../pages/Signup'
import { Signin } from '../pages/Signin'
import { NotFound } from '../pages/NotFound'
import { RequireAuth } from '../hoc/RequireAuth'

const AppRouter:FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='todo' element={
          <RequireAuth>
            <Todos />
          </RequireAuth>
        } />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export { AppRouter }