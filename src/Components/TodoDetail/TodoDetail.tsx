import React, {useEffect, useState} from 'react'
import {useParams, Navigate} from 'react-router-dom'
import {User} from 'firebase/auth'
import {IDeed} from '../../types/IDeed'
import {prepareAutoBatched} from '@reduxjs/toolkit'


interface ITodoDetailProps {
	getDeed: (key: string) => IDeed | undefined
	currentUser: User | null
}

const TodoDetail: React.FC<ITodoDetailProps> = ({getDeed, currentUser}) => {
	const {key} = useParams()
	let deed
	if (key) {
		deed = getDeed(key)
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