import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'
import {User} from 'firebase/auth'


interface IRegisterProps {
  currentUser: User | null
}

const Register: React.FC<IRegisterProps> = ({currentUser}) => {
  const [errorEmail, setErrorEmail] = useState<string>('')
  const [errorPassword, setErrorPassword] = useState<string>('')
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string>('')

  const formData = {
    email: '',
    password: '',
    passwordConfirm: '',
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    formData.email = event.target.value
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