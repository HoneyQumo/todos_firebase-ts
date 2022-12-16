import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import {User} from 'firebase/auth'
import {IDeed} from '../../types/IDeed'
import {useAppDispatch, useAppSelector} from '../../store/storeHook'


interface ITodoListProps {
  setDoneDeed: (key: string) => void
  deleteDeed: (key: string) => void
}

const TodoList: React.FC<ITodoListProps> = ({setDoneDeed, deleteDeed}) => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.app.currentUser)
  const userDeeds = useAppSelector(state => state.app.userDeeds)

  if (!currentUser) return <Navigate to="/login" replace/>
  else
    return (
      <section>
        <h1>Дела</h1>
        <table className="table is-hoverable is-fullwidth">
          <tbody>
          {userDeeds ? userDeeds.map((deed) => (
            <tr key={deed.key}>
              <td>
                <Link to={`/${deed.key}`}>
                  {deed.done && <del>{deed.title}</del>}
                  {!deed.done && deed.title}
                </Link>
              </td>
              <td>
                <button
                  className="button is-success"
                  title="Пометить как выполненное"
                  disabled={deed.done}
                  onClick={() => setDoneDeed(deed.key)}
                >
                  &#10003;
                </button>
              </td>
              <td>
                <button
                  className="button is-danger"
                  title="Удалить"
                  onClick={() => deleteDeed(deed.key)}
                >
                  &#10007;
                </button>
              </td>
            </tr>
          ))
          : null}
          </tbody>
        </table>
      </section>
    )
}

export default TodoList