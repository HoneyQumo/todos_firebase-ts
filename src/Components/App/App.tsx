import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Navigate, NavLink, Route, Routes} from 'react-router-dom'
import {del, getList, logout, setDone} from '../../auth'
import {getAuth, User, onAuthStateChanged} from 'firebase/auth'
import firebaseApp from '../../firebase'
import {IDeed} from '../../types/IDeed'
import TodoList from '../TodoList/TodoList'
import TodoAdd from '../TodoAdd/TodoAdd'
import TodoDetail from '../TodoDetail/TodoDetail'
import Register from '../Register/Register'
import Login from '../Login/Login'


const App: React.FC = () => {
	const [data, setData] = useState<IDeed[]>([])
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	async function authStateChanged(user: User) {
		if (user) {
			setCurrentUser(user)
			const newData = await getList(user)
			setData(newData)
		} else {
			setCurrentUser(null)
			setData([])
		}
	}

	//Todo: Logout не работает, потому что useEffect срабатывает один раз и после этого не обновляет state currentUser
	useEffect(() => {
		onAuthStateChanged(getAuth(firebaseApp), async (user) => {
			if (user) {
				await authStateChanged(user)
			}
		})
	}, [])

	function getDeed(key: string) {
		return data.find(deed => deed.key === key)
	}

	function showMenuToggle(event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) {
		event.preventDefault()
		setShowMenu(prevState => !prevState)
	}

	function addDeed(deed: IDeed) {
		setData(prevState => [...prevState, deed])
	}

	async function deleteDeed(key: string) {
		if (currentUser) {
			await del(currentUser, key)
		}
		const newData = data.filter((current) => current.key !== key)
		setData(newData)
	}

	async function setDoneDeed(key: string) {
		if (currentUser) {
			await setDone(currentUser, key)
		}
		const newData = data.map(deed => deed.key === key
			? {...deed, done: !deed.done}
			: deed,
		)
		setData(newData)
	}

	function handleNavLinkLogoutClick() {
		if (currentUser) {
			console.log('currentUser')
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
					<a href="/" className={showMenu ? 'navbar-burger is-active' : 'navbar-burger'}
						 onClick={showMenuToggle}
					>
						<span></span>
						<span></span>
						<span></span>
					</a>
				</div>
				<div className={showMenu ? 'navbar-menu is-active' : 'navbar-menu'} onClick={showMenuToggle}>
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
					<Route path="/" element={
						<TodoList setDoneDeed={setDoneDeed} deleteDeed={deleteDeed} list={data} currentUser={currentUser}/>
					}/>
					<Route path="/add" element={<TodoAdd addDeed={addDeed} currentUser={currentUser}/>}/>
					<Route path="/:key" element={<TodoDetail getDeed={getDeed} currentUser={currentUser}/>}/>
					<Route path="/register" element={<Register currentUser={currentUser}/>}/>
					<Route path="/login" element={<Login currentUser={currentUser}/>}/>
				</Routes>
			</main>
		</Router>
	)
}

export default App