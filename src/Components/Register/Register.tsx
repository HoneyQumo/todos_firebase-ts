import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'
import {User} from 'firebase/auth'
import {register} from '../../auth'


interface IRegisterProps {
	currentUser: User | null
}

const Register: React.FC<IRegisterProps> = ({currentUser}) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [passwordConfirm, setPasswordConfirm] = useState<string>('')
	const [errorEmail, setErrorEmail] = useState<string>('')
	const [errorPassword, setErrorPassword] = useState<string>('')
	const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string>('')

	function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value)
	}

	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value)
	}

	function handlePasswordConfirmChange(event: React.ChangeEvent<HTMLInputElement>) {
		setPasswordConfirm(event.target.value)
	}

	async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (validate()) {
			const result = await register(email, password)
			if (typeof result !== 'object') {
				showErrorMessage(result)
			}
		}
	}

	function resetErrorMessages() {
		setErrorEmail('')
		setErrorPassword('')
		setErrorPasswordConfirm('')
	}

	function validate() {
		resetErrorMessages()
		if (!email) {
			setErrorEmail('Адрес электронной почты не указан')
			return false
		}
		if (!password) {
			setErrorPassword('Пароль не указан')
			return false
		}
		if (!passwordConfirm) {
			setErrorPasswordConfirm('Повтор пароля не указан')
			return false
		}
		if (password !== passwordConfirm) {
			setErrorPassword('Введенные пароли не совпадают')
			setErrorPasswordConfirm('Введенные пароли не совпадают')
			return false
		}
		return true
	}

	function showErrorMessage(code: string) {
		resetErrorMessages()
		if (code === 'auth/email-already-in-use') {
			setErrorEmail('Пользователь с таким адресом электронной почты уже зарегистрирован')
		} else if (code === 'auth/weak-password') {
			setErrorPassword('Пароль слишком простой')
			setErrorPasswordConfirm('Пароль слишком простой')
		} else if (code === 'auth/invalid-email') {
			setErrorEmail('Недопустимый формат электронной почты')
		}
	}

	if (currentUser) return <Navigate to="/" replace/>
	else
		return (
			<section>
				<h1>Регистрация</h1>
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
					<div className="field">
						<label className="label">Повтор пароля</label>
						<div className="control">
							<input type="password" className="input" onChange={handlePasswordConfirmChange}/>
						</div>
						{errorPasswordConfirm &&
							<p className="help is-danger">
								{errorPasswordConfirm}
							</p>
						}
					</div>
					<div className="field is-grouped is-grouped-right">
						<div className="control">
							<input type="reset" className="button is-link is-light" value="Сброс"/>
						</div>
						<div className="control">
							<input type="submit" className="button is-primary" value="Зарегистрироваться"/>
						</div>
					</div>
				</form>
			</section>
		)
}

export default Register