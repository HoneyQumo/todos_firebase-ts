import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import {User} from 'firebase/auth'
import {IDeed} from '../../types/IDeed'


interface ITodoListProps {
  currentUser: User | null
  list: IDeed[]
  setDoneDeed: (key: string) => void
  deleteDeed: (key: string) => void
}

const TodoList: React.FC<ITodoListProps> = ({setDoneDeed, deleteDeed, list, currentUser}) => {

  if (!currentUser) return <Navigate to="/login" replace/>
  else
    return (
      <section>
        <h1>Дела</h1>
        <table className="table is-hoverable is-fullwidth">
          <tbody>
          {list.map((item) => (
            <tr key={item.key}>
              <td>
                <Link to={`/${item.key}`}>
                  {item.done && <del>{item.title}</del>}
                  {!item.done && item.title}
                </Link>
              </td>
              <td>
                <button
                  className="button is-success"
                  title="Пометить как выполненное"
                  disabled={item.done}
                  onClick={() => setDoneDeed(item.key)}
                >
                  &#10003;
                </button>
              </td>
              <td>
                <button
                  className="button is-danger"
                  title="Удалить"
                  onClick={() => deleteDeed(item.key)}
                >
                  &#10007;
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </section>
    )
}

export default TodoList