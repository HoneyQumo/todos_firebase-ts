import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getAuth, onAuthStateChanged, User} from 'firebase/auth'
import {IDeed} from '../../types/IDeed'

interface IAppSliceInitialState {
	userDeeds: IDeed[] | null,
	isBurgerMenu: boolean,
	currentUser: User | null
}

const initialState: IAppSliceInitialState = {
	userDeeds: null,
	isBurgerMenu: false,
	currentUser: null,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setCurrentUser(state, action: PayloadAction<User | null>) {
			state.currentUser = action.payload
		},
		setUserDeeds(state, action: PayloadAction<IDeed[] | null>) {
			state.userDeeds = action.payload
		},
		toggleBurgerMenu(state) {
			state.isBurgerMenu = !state.isBurgerMenu
		},
		addDeed(state, action: PayloadAction<IDeed>) {
			if (state.userDeeds) {
				state.userDeeds.push(action.payload)
			}
		},
		toggleDeedAsDone(state, action: PayloadAction<string>) {
			if (state.userDeeds) {
				const findDeed = state.userDeeds.find(deed => deed.key === action.payload)
				if (findDeed) {
					findDeed.done = !findDeed.done
				}
			}
		},
	},
	extraReducers: {},
})

export const {setCurrentUser, setUserDeeds, toggleBurgerMenu, addDeed, toggleDeedAsDone} = appSlice.actions
export default appSlice.reducer