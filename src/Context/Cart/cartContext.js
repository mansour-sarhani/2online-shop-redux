import {createContext, useContext, useEffect, useReducer} from "react";
import {cartReducer} from "./cartReducer";

const CartStateContext = createContext()
const CartDispatchContext = createContext()

export const useCartState = () => useContext(CartStateContext)
export const useCartDispatch = () => useContext(CartDispatchContext)

const initialState = {
    cart: [],
    orgTotal: 0,
    total: 0,
    initialized: false
}

export function CartProvider({children}) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

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
        dispatch({
            type: 'INITIALIZE_CART',
            payload: {
                cart,
                total,
                orgTotal
            }
        })
    }, []);

    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    )
}

