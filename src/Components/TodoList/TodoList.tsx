import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import {User} from 'firebase/auth'
import {IDeed} from '../../types/IDeed'
import {useAppDispatch, useAppSelector} from '../../store/storeHook'
import {del, setDone} from '../../auth'
import {setUserDeeds, toggleDeedAsDone} from '../../store/slice/appSlice'


const TodoList: React.FC = () => {
	const dispatch = useAppDispatch()
	const currentUser = useAppSelector(state => state.app.currentUser)
	const userDeeds = useAppSelector(state => state.app.userDeeds)

	async function deleteDeed(key: string) {
		if (currentUser) {
			await del(currentUser, key)
		}
		if (userDeeds) {
			const newData = userDeeds.filter((current) => current.key !== key)
			dispatch(setUserDeeds(newData))
		}
	}

	async function setDoneDeed(key: string) {
		if (currentUser) {
			await setDone(currentUser, key)
		}
		dispatch(toggleDeedAsDone(key))
	}

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