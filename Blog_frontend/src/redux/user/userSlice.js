import { createSLice } from '@reduxjs/toolkit';
import { FaSleigh } from 'react-icons/fa';

const initialState = {
    currentUser: null,
    error: null,
    loading:False
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;