import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    cart: [],
    orgTotal: 0,
    total: 0,
    initialized: false
}

const saveToLocal = (updatedCart, savedTotal, savedOrgTotal) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    localStorage.setItem('cartTotal', JSON.stringify(savedTotal))
    localStorage.setItem('cartOrgTotal', JSON.stringify(savedOrgTotal))
}

function finalPrice(product) {
    if (product.offPrice) {
        return parseInt(product.offPrice)
    }
    return parseInt(product.price)
}

function removeFinalPrice(product) {
    if (product.offPrice) {
        return parseInt(product.offPrice) * parseInt(product.qty)
    }
    return parseInt(product.price) * parseInt(product.qty)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        CART_INIT : (state, action) => {
            const {cart, total, orgTotal} = action.payload
            state.cart = cart
            state.total = total
            state.orgTotal = orgTotal
            state.initialized = true
        },
        ADD_TO_CART : (state, action) => {
            const product = action.payload
            const productId = product.id
            const productIndex = state.cart.findIndex(item => item.id === productId)

            const orgPrice = parseInt(product.price)
            const savedOrgTotal = state.orgTotal + orgPrice
            state.orgTotal = savedOrgTotal

            const offPrice = finalPrice(product)
            const savedTotal = state.total + offPrice
            state.total = state.total + finalPrice(product)

            if (productIndex < 0) {
                state.cart.push({...product, qty: 1})

                saveToLocal(state.cart, savedTotal, savedOrgTotal)
            } else {
                const updatedItem = state.cart[productIndex]
                updatedItem.qty++

                saveToLocal(state.cart, savedTotal, savedOrgTotal)
            }
            toast.success(`${product.name} به سبد خرید اضافه شد `)
        },
        MINUS_FROM_CART : (state, action) => {
            const product = action.payload
            const productId = product.id
            const productIndex = state.cart.findIndex(item => item.id === productId)
            const updatedItem = state.cart[productIndex]

            const orgPrice = parseInt(product.price)
            const savedOrgTotal = state.orgTotal - orgPrice
            state.orgTotal = savedOrgTotal

            const offPrice = finalPrice(product)
            const savedTotal = state.total - offPrice
            state.total = state.total - finalPrice(product)

            if (updatedItem.qty === 1) {
                const filteredCart = state.cart.filter(item => item.id !== updatedItem.id)
                state.cart = filteredCart

                saveToLocal(filteredCart, savedTotal, savedOrgTotal)
                toast.error(`${product.name} از سبد خرید حذف شد `)
            } else {
                updatedItem.qty--

                saveToLocal(state.cart, savedTotal, savedOrgTotal)
            }
        },
        REMOVE_CART_ITEM : (state, action) => {
            const product = action.payload
            const productId = product.id
            const productIndex = state.cart.findIndex(item => item.id === productId)
            const updatedItem = state.cart[productIndex]

            const orgPrice = parseInt(product.price) * parseInt(product.qty)
            const savedOrgTotal = state.orgTotal - orgPrice
            state.orgTotal = savedOrgTotal

            const offPrice = removeFinalPrice(product)
            const savedTotal = state.total - offPrice
            state.total = state.total - removeFinalPrice(product)

            const filteredCart = state.cart.filter(item => item.id !== updatedItem.id)
            state.cart = filteredCart

            saveToLocal(filteredCart, savedTotal, savedOrgTotal)
            toast.error(`${product.name} از سبد خرید حذف شد `)
        }
    }
})

export const {CART_INIT, ADD_TO_CART, MINUS_FROM_CART, REMOVE_CART_ITEM} = cartSlice.actions

export default cartSlice.reducer