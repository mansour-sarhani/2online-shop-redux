import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

const reducer = {
    products: productsSlice,
    cart: cartSlice,
    auth: authSlice
}

const store = configureStore({
    reducer
})

export default store