import {createContext, useContext, useEffect, useReducer} from "react";
import {productsReducer} from "./productsReducer";
import getProducts from "../../Services/getProducts";

const ProductsStateContext = createContext()
const ProductsDispatchContext = createContext()

export const useProductsState = () => useContext(ProductsStateContext)
export const useProductsDispatch = () => useContext(ProductsDispatchContext)

const initialState = {
    products: [],
    initialized: false,
}

export function ProductsProvider({children}) {
    const [state, dispatch] = useReducer(productsReducer, initialState);

    useEffect(() => {
        getProducts().then(
            response => {
                dispatch({
                    type: 'INITIALIZE_PRODUCTS',
                    payload: {
                        products: response?.data
                    }
                })
            }
        )
    }, []);

    return (
        <ProductsStateContext.Provider value={state}>
            <ProductsDispatchContext.Provider value={dispatch}>
                {children}
            </ProductsDispatchContext.Provider>
        </ProductsStateContext.Provider>
    )
}


