import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../Services/httpService";
import {toast} from "react-toastify";

const initialState = {
    user: null,
    isRegistered: false,
    isLoggedIn: false
}

export const USER_REGISTER = createAsyncThunk(
    'auth/USER_REGISTER',
    async (payload, { rejectWithValue }) => {
        try {
            async function registerUser(userData){
                await http.post('/users', userData)
                toast.success('ثبت نام شما با موفقیت انجام شد')
            }
            await registerUser(payload)
            return payload
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        AUTH_INIT : (state, action) => {
            const user = action.payload
            if (user) {
                state.user = user
                state.isRegistered = true
                state.isLoggedIn = true
            }
        },
        USER_LOG_IN : (state, action) => {
            const user = action.payload
            localStorage.setItem('userData', JSON.stringify(user))
            state.user = user
            state.isLoggedIn = true
            state.isRegistered = true
        },
        USER_LOG_OUT : (state) => {
            localStorage.removeItem("userData")
            state.user = null
            state.isLoggedIn = false
            state.isRegistered = false
            toast.error('به امید دیدار مجدد')
        }
    },
    extraReducers: {
        [USER_REGISTER.fulfilled] : (state, action) => {
            state.user = action.payload
            state.isRegistered = true
        }
    }
})

export const {AUTH_INIT, USER_LOG_IN, USER_LOG_OUT} = authSlice.actions

export default authSlice.reducer