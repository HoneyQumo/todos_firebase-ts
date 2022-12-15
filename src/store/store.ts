import {configureStore} from '@reduxjs/toolkit'
import deedsSlice from './slice/deedsSlice'


const store = configureStore({
	reducer: {
		deeds: deedsSlice
	}
})

export default store