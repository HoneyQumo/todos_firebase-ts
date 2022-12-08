import React, {useState} from 'react'
import {User} from 'firebase/auth'
import {IDeed} from '../../types/IDeed'
import {add} from '../../auth'


interface ITodoAddProps {
  addDeed: (deed: IDeed) => void
  currentUser: User | null
}

const TodoAdd: React.FC<ITodoAddProps> = ({addDeed, currentUser}) => {
  const [redirect, setRedirect] = useState<boolean>(false)

  const formData: IDeed = {
    key: '',
    title: '',
    desc: '',
    image: '',
    createdAt: '',
    done: false,
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newDeed = {...formData}
    const date = new Date()
    newDeed.createdAt = date.toLocaleString()
    if (currentUser) {
      const addedDeed = await add(currentUser, newDeed)
      addDeed(addedDeed)
    }
    setRedirect(true)
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    formData.title = event.target.value
  }

  function handleDescChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    formData.desc = event.target.value
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const cFiles = event.target.files
    // if (cFiles.length > 0) {
    if (cFiles) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        if (fileReader.result) {
          formData.image = fileReader.result
        }
      }
      fileReader.readAsDataURL(cFiles[0])
    } else {
      formData.image = ''
    }
  }

  return (
    <section>
      <h1>Создание нового дела</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label className="label">Заголовок</label>
          <div className="control">
            <input onChange={handleTitleChange} className="input"/>
          </div>
        </div>
        <div className="field">
          <label className="label">Примечание</label>
          <div className="control">
            <textarea onChange={handleDescChange} className="textarea"/>
          </div>
        </div>
        <div className="field">
          <div className="file">
            <label className="file-label">
              <input onChange={handleImageChange} type="file" className="file-input" accept="image/*"/>
              <span className="file-cta">
                  <span className="file-label">
                    Графическая иллюстрация...
                  </span>
                </span>
            </label>
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <input type="reset" value="Сброс" className="button is-link is-light"/>
          </div>
          <div className="control">
            <input type="submit" value="Создать дело" className="button is-primary"/>
          </div>
        </div>
      </form>
    </section>
  )
}

export default TodoAdd