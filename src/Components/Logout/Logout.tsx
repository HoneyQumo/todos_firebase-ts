import React from 'react'
import {Navigate} from 'react-router-dom'
import {User} from 'firebase/auth'
import {logout} from '../../auth'


interface ILogoutProps {
	currentUser: User | null
}

const Logout: React.FC<ILogoutProps> = ({currentUser}) => {
	if (currentUser) {
		logout()
		return null
	} else {
		return <Navigate to="/login" replace/>
	}
}

export default Logout