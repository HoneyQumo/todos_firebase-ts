import React, {useEffect, useState} from 'react'
import {useParams, Navigate} from 'react-router-dom'
import {User} from 'firebase/auth'
import {IDeed} from '../../types/IDeed'
import {prepareAutoBatched} from '@reduxjs/toolkit'
import {useAppSelector} from '../../store/storeHook'


const TodoDetail: React.FC = () => {
	const {key} = useParams()
	const userDeeds = useAppSelector(state => state.app.userDeeds)
	const currentUser = useAppSelector(state => state.app.currentUser)

	let deed
	if (userDeeds) {
		deed = userDeeds.find(deed => deed.key === key)
	}

	if (!currentUser) return <Navigate to="/login" replace/>
	if (deed) {
		return (
			<section>
				{deed.done &&
					<p className="has-text-success">
						Выполнено
					</p>
				}
				<h1>{deed.title}</h1>
				<p>{deed.createdAt}</p>
				{deed.desc && <p>{deed.desc}</p>}
				{deed.image && <p><img src={deed.image} alt="Иллюстрация"/></p>}
			</section>
		)
	} else return null
}

export default TodoDetail