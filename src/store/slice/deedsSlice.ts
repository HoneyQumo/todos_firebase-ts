import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	deed: {}
}

const deedsSlice = createSlice({
	name: 'deeds',
	initialState,
	reducers: {},
	extraReducers: {}
})

export default deedsSlice.reducer