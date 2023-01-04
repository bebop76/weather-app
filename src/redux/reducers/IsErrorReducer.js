import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isError: null
}

export const isErrorSlice = createSlice({
    name: "isError",
    initialState,
    reducers: {
        setError: ( state, action ) => {
            state.isError = action.payload
        }, 
        unsetError: ( state, action ) => {
            state.isError = null
        }
    }
})

export const { setError, unsetError } = isErrorSlice.actions

export default isErrorSlice.reducer