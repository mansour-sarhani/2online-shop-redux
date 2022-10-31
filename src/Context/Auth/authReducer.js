import http from "../../Services/httpService";
import {toast} from "react-toastify";

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_USER': {
            const userData = action.payload
            return {
                user: userData,
                isRegistered: !!userData,
                isLoggedIn: !!userData,
            }
        }
        case 'USER_REGISTER': {
            const userData = action.payload

            async function registerUser(userData){
                http.post('/users', userData)
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error))
                toast.success('ثبت نام شما با موفقیت انجام شد')
            }
            registerUser(userData)
            return {
                ...state,
                user: userData,
                isRegistered: true,
            }
        }
        case 'USER_LOGIN': {
            const userData = action.payload
            localStorage.setItem('userData', JSON.stringify(userData))
            return {
                user: userData,
                isRegistered: true,
                isLoggedIn: true
            }
        }
        case 'USER_SIGN_OUT': {
            localStorage.removeItem("userData")
            toast.error('به امبد دیدار مجدد')
            return {
                ...state
            }
        }
        default: {
            return state
        }
    }
}