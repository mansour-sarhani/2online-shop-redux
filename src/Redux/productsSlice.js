import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../Services/httpService";
import {faker} from "@faker-js/faker";
import {toast} from "react-toastify";

const initialState = {
    products: [],
    initialized: false,
}

export const ADD_NEW_PRODUCT = createAsyncThunk(
    'products/ADD_NEW_PRODUCT',
    async (payload, { rejectWithValue }) => {
        const productUid = faker.random.numeric(5)
        const productDate = new Date().getTime()
        try {
            await http.post('/products', {
                ...payload,
                uid: productUid,
                date: productDate
            })
            toast.success('محصول با موفقیت اضافه شد')
            return {payload, productUid, productDate}
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const DELETE_PRODUCT = createAsyncThunk(
    'products/DELETE_PRODUCT',
    async (payload, { rejectWithValue }) => {
        try {
            await http.delete(`/products/${payload}`)
            toast.error('محصول با موفقیت حذف شد')
            return payload
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const EDIT_PRODUCT = createAsyncThunk(
    'products/EDIT_PRODUCT',
    async (payload, { rejectWithValue }) => {
        const {productId, product} = payload
        try {
            await http.put(`/products/${productId}`, product)
            toast.warning('محصول با موفقیت ویرایش شد')
            return payload
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        PRODUCTS_INIT : (state, action) => {
            state.products = action.payload
            state.initialized = true
        }
    },
    extraReducers: {
        [ADD_NEW_PRODUCT.fulfilled] : (state, action) => {
            const productData = action.payload.payload
            const uid = action.payload.productUid
            const date = action.payload.productDate
            const newProduct = {
                ...productData,
                uid,
                date
            }
            state.products.push(newProduct)
        },
        [DELETE_PRODUCT.fulfilled] : (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        [EDIT_PRODUCT.fulfilled] : () => {
            window.location.reload()
        }
    }
})

export const {PRODUCTS_INIT} = productsSlice.actions

export default productsSlice.reducer
