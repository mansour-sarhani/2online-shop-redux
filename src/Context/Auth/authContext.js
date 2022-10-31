import {createContext, useContext, useEffect, useReducer} from "react";
import {authReducer} from "./authReducer";

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)

const initialState = {
    user: null,
    isRegistered: false,
    isLoggedIn: false
}

export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'))
        dispatch({
            type: 'INITIALIZE_USER',
            payload: user
        })
    }, []);


    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

