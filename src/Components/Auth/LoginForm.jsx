import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import http from "../../Services/httpService";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {useAuthDispatch, useAuthState} from "../../Context/Auth/authContext";
import {useQuery} from "../../hooks/useQuery";
import {useEffect, useState} from "react";

const initialValues = {
    email: '',
    password: '',
}

const validationSchema = Yup.object({
    email: Yup.string()
        .required('ایمیل الزامی است'),
    password: Yup.string()
        .required('رمز عبور الزامی است')
})

function LoginForm() {
    const dispatch = useAuthDispatch()

    const loginRedirect = useNavigate();
    const query = useQuery().get('redirect')
    
    const savedUser = useAuthState().user

    const [regUser, setRegUser] = useState(null);

    useEffect(() => {
        if (savedUser) {
            setRegUser({
                email: savedUser.email,
                password: savedUser.password
            })
        }
    }, [savedUser]);

    const isUser = async (serverUsers, formValue) => {
        const user = serverUsers.find(user => user.email === formValue.email && user.password === formValue.password)
        if(user) return user
    }

    const onSubmit = async (values) => {
        const user = await http.get('/users').then(
            res => isUser(res.data, values)
        )
        if (user) {
            dispatch({
                type: 'USER_LOGIN',
                payload: user
            })
            toast.success(`${user.name} عزیز خوش آمدید `)
            loginRedirect( query === 'checkout' ? '/checkout' : '/profile')
        }
        else {
            toast.error('نام کاربری یا رمز عبور اشتباه است')
        }
    }

    const formik = useFormik({
        initialValues : regUser || initialValues,
        validationSchema,
        onSubmit,
        validateOnChange: false,
        enableReinitialize: true
    })

    return (
        <div className="auth-form login-form">
            <h1>ورود کاربران</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        {...formik.getFieldProps('email')}
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="ایمیل"
                    />
                    <label htmlFor="email">ایمیل</label>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="form-error">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...formik.getFieldProps('password')}
                        type="text"
                        className="form-control"
                        id="password"
                        placeholder="رمز عبور"
                    />
                    <label htmlFor="password">رمز عبور</label>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="form-error">{formik.errors.password}</div>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    ورود
                </button>
            </form>
        </div>
    );
}

export default LoginForm;