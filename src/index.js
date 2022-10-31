import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {ProductsProvider} from "./Context/Product/productsContext";
import {CartProvider} from "./Context/Cart/cartContext";
import {AuthProvider} from "./Context/Auth/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <ProductsProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </ProductsProvider>
    </AuthProvider>
);
