import React, {useState} from 'react'
import {login} from '../../auth'
import {User} from 'firebase/auth'


interface ILoginProps {
	currentUser: User | null
}

const Login: React.FC<ILoginProps> = ({currentUser}) => {
	const [errorEmail, setErrorEmail] = useState('')
	const [errorPassword, setErrorPassword] = useState('')

	const formData = {
		email: '',
		password: '',
	}

	function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
		formData.email = event.target.value
	}

	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		formData.password = event.target.value
	}

	async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (validate()) {
			const result = await login(formData.email, formData.password)
			if (result !== 'object') {
				showErrorMessage(result)
			}
		}
	}

	function resetErrorMessage() {
		setErrorEmail('')
		setErrorPassword('')
	}

	function validate() {
		resetErrorMessage()
		if (!formData.email) {
			setErrorEmail('Адрес электронной почты не указан')
			return false
		}
		if (!formData.password) {
			setErrorPassword('Пароль не указан')
			return false
		}
		return true
	}

	function showErrorMessage(code: string) {
		resetErrorMessage()
		if (code === 'auth/invalid-email') {
			setErrorEmail('Неверный адрес электронной почты')
		} else if (code === 'auth/user-disabled') {
			setErrorPassword('Пользователь заблокирован')
		} else if (code === 'auth/user-not-found') {
			setErrorEmail('Пользователь не найден')
		} else if (code === 'auth/wrong-password') {
			setErrorEmail('Неверный адрес электронной почты или пароль')
			setErrorPassword('Неверный адрес электронной почты или пароль')
		}
	}


	return (
		<section>
			<h1>Авторизация</h1>
			<form onSubmit={handleFormSubmit}>
				<div className="field">
					<label className="label">Адрес электронной почты</label>
					<div className="control">
						<input type="email" className="input" onChange={handleEmailChange}/>
					</div>
					{errorEmail &&
						<p className="help is-danger">
							{errorEmail}
						</p>
					}
				</div>
				<div className="field">
					<label className="label">Пароль</label>
					<div className="control">
						<input type="password" className="input" onChange={handlePasswordChange}/>
					</div>
					{errorPassword &&
						<p className="help is-danger">
							{errorPassword}
						</p>
					}
				</div>
				<div className="field is-grouped is-grouped-right">
					<div className="control">
						<input type="reset" className="button is-link is-light" value="Сброс"/>
					</div>
					<div className="control">
						<input type="submit" className="button is-primary" value="Войти"/>
					</div>
				</div>
			</form>
		</section>
	)
}

export default Login