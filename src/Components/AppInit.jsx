import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {CART_INIT} from "../Redux/cartSlice";
import {AUTH_INIT} from "../Redux/authSlice";
import getProducts from "../Services/getProducts";
import {PRODUCTS_INIT} from "../Redux/productsSlice";

const AppInit = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems')
        if(!savedCart) {
            localStorage.setItem('cartItems', JSON.stringify([]))
        }
    }, []);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cartItems'))
        const total = JSON.parse(localStorage.getItem('cartTotal'))
        const orgTotal = JSON.parse(localStorage.getItem('cartOrgTotal'))
        dispatch(CART_INIT({cart, total, orgTotal}))

        const user = JSON.parse(localStorage.getItem('userData'))
        dispatch(AUTH_INIT(user))

        getProducts().then(
            response => {
                dispatch(PRODUCTS_INIT(response?.data))
            }
        )
    }, [dispatch]);
};

export default AppInit;
