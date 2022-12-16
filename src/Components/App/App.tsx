import React, {useEffect} from 'react'
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom'
import {del, getList, logout, setDone} from '../../auth'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import firebaseApp from '../../firebase'
import TodoList from '../TodoList/TodoList'
import TodoAdd from '../TodoAdd/TodoAdd'
import TodoDetail from '../TodoDetail/TodoDetail'
import Register from '../Register/Register'
import Login from '../Login/Login'
import {useAppDispatch, useAppSelector} from '../../store/storeHook'
import {setCurrentUser, toggleBurgerMenu, setUserDeeds, toggleDeedAsDone} from '../../store/slice/appSlice'


const App: React.FC = () => {
	const dispatch = useAppDispatch()
	const userDeeds = useAppSelector(state => state.app.userDeeds)
	const currentUser = useAppSelector(state => state.app.currentUser)
	const isBurgerMenu = useAppSelector(state => state.app.isBurgerMenu)

	useEffect(() => {
		onAuthStateChanged(getAuth(firebaseApp), async (user) => {
			if (user) {
				dispatch(setCurrentUser(user))
				const newData = await getList(user)
				dispatch(setUserDeeds(newData))
			} else {
				dispatch(setCurrentUser(null))
				dispatch(setUserDeeds(null))
			}
		})
	}, [])

	function getDeed(key: string) {
		if (userDeeds) {
			return userDeeds.find(deed => deed.key === key)
		}
	}

	function showMenuToggle(event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) {
		event.preventDefault()
		dispatch(toggleBurgerMenu())
	}

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

	function handleNavLinkLogoutClick() {
		if (currentUser) {
			logout()
			setCurrentUser(null)
		}
	}

	return (
		<Router>
			<nav className="navbar is-light">
				<div className="navbar-brand">
					<NavLink to="/" className={({isActive}) => `navbar-item is-uppercase ${isActive ? 'is-active' : ''}`}>
						{currentUser ? currentUser.email : 'Todos'}
					</NavLink>
					<a href="/" className={isBurgerMenu ? 'navbar-burger is-active' : 'navbar-burger'}
						 onClick={showMenuToggle}
					>
						<span></span>
						<span></span>
						<span></span>
					</a>
				</div>
				<div className={isBurgerMenu ? 'navbar-menu is-active' : 'navbar-menu'} onClick={showMenuToggle}>
					<div className="navbar-start">
						{currentUser && (
							<NavLink to="/add" className={({isActive}) => `navbar-item ${isActive ? 'is-active' : ''}`}>
								Создать дело
							</NavLink>)}
						{!currentUser && (
							<NavLink to="/login" className={({isActive}) => `navbar-item ${isActive ? 'is-active' : ''}`}>
								Войти
							</NavLink>
						)}
						{!currentUser && (
							<NavLink to="/register" className={({isActive}) => `navbar-item ${isActive ? 'is-active' : ''}`}>
								Зарегистрироваться
							</NavLink>)}
						{currentUser && (
							<div className="navbar-end">
								<NavLink to="/logout" onClick={handleNavLinkLogoutClick} className={({isActive}) => `navbar-item ${isActive ? 'is-active' : ''}`}>
									Выйти
								</NavLink>
							</div>
						)}
					</div>
				</div>
			</nav>
			<main className="content px-6 mt-6">
				<Routes>
					<Route path="/" element={<TodoList setDoneDeed={setDoneDeed} deleteDeed={deleteDeed}/>}/>
					<Route path="/add" element={<TodoAdd/>}/>
					<Route path="/:key" element={<TodoDetail getDeed={getDeed} currentUser={currentUser}/>}/>
					<Route path="/register" element={<Register currentUser={currentUser}/>}/>
					<Route path="/login" element={<Login currentUser={currentUser}/>}/>
				</Routes>
			</main>
		</Router>
	)
}

export default App