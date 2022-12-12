import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {getDatabase, ref, push, set, get, query, remove} from 'firebase/database'
import {IDeed} from './types/IDeed'
import {User} from 'firebase/auth'


export async function register(email: string, password: string) {
  try {
    const oUC = await createUserWithEmailAndPassword(
      getAuth(),
      email, password,
    )
    return oUC.user
    //  TODO: error any type
  } catch (error: any) {
    return error.code
  }
}

export async function login(email: string, password: string) {
  try {
    const oUC = await signInWithEmailAndPassword(getAuth(), email, password)
    return oUC.user
  } catch (error: any) {
    return error.code
  }
}

export async function logout() {
  await signOut(getAuth())
}

export async function add(user: User, deed: IDeed) {
  const oRef = await push(
    ref(
      getDatabase(),
      `users/${user.uid}/todos`,
    ),
  )
  await set(oRef, deed)
  const oSnapshot = await get(query(oRef))
  const oDeed: IDeed = oSnapshot.val()
  if (oRef.key){
    oDeed.key = oRef.key
  }
  return oDeed
}

export async function getList(user: User) {
  const oSnapshot = await get(query(ref(getDatabase(), `users/${user.uid}/todos`)))
  const oArr: IDeed[] = []
  let oDeed: IDeed
  oSnapshot.forEach((oDoc) => {
    oDeed = oDoc.val()
    if (oDoc.key) {
      oDeed.key = oDoc.key
    }
    oArr.push(oDeed)
  })
  return oArr
}

export function setDone(user: User, key: string) {
  return set(ref(getDatabase(), `users/${user.uid}/todos/${key}/done`), true)
}

export function del(user: User, key: string) {
  return remove(ref(getDatabase(), `users/${user.uid}/todos/${key}`))
}