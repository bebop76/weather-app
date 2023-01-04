import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true
}

export const isLoadingSlice = createSlice({
    name: "isLoading",
    initialState,
    reducers: {
        onLoading: (state, action) => {
            state.isLoading = true
        },
        offLoading: (state, action) => {
            state.isLoading = false
        },
    }
})

export const { onLoading, offLoading } = isLoadingSlice.actions

export default isLoadingSlice.reducer