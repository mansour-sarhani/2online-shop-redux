import {useFormik} from "formik";
import * as Yup from 'yup';
import {useAuthDispatch} from "../../Context/Auth/authContext";
import http from "../../Services/httpService";
import {toast} from "react-toastify";

const initialValues = {
    name: '',
    userName: '',
    email: '',
    telNo: '',
    password: '',
    passwordConf: ''
}

const validationSchema = Yup.object({
    name: Yup.string()
        .required('نام و نام خانوادگی الزامی است'),
    userName: Yup.string()
        .required('نام کاربری الزامی است'),
    email: Yup.string()
        .email('فرمت ایمیل اشتباه است')
        .required('ایمیل الزامی است'),
    telNo: Yup.string()
        .matches(/^[0-9]{11}$/, 'شماره تماس معتبر نمی باشد')
        .nullable()
        .required('شماره موبایل الزامی است'),
    password: Yup.string()
        .required('رمز عبور الزامی است')
        .min(6, 'رمز عبور باید حداقل 6 حرف باشد'),
    passwordConf: Yup.string()
        .oneOf([Yup.ref('password'), null], 'رمز عبور مطابقت ندارد')
})

function RegisterForm() {
    const dispatch = useAuthDispatch()

    const checkEmail = (serverUsers,values) => {
        const user = serverUsers.find(user => user.email === values.email);
        if (user) return user;
    }
    async function registerUser(values){
        const user = await http.get("/users")
            .then((res) => checkEmail(res.data,values))
        if (user) {
            toast.error("ایمیل شما قبلا ثبت شده است!")
        } else {
            const userData = {
                name: values.name,
                userName: values.userName,
                email: values.email,
                telNo: values.telNo,
                password: values.password
            }
            dispatch({
                type: 'USER_REGISTER',
                payload: userData
            })
        }
    }

    const onSubmit = (values) => {
        registerUser(values)
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        validateOnMount: true,
        validateOnChange: false
    })

    return (
        <div className="auth-form register-form">
            <h1>ثبت نام</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        {...formik.getFieldProps('name')}
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="نام و نام خانوادگی"
                    />
                    <label htmlFor="name">نام و نام خانوادگی</label>
                    {formik.touched.name && formik.errors.name ? (
                        <div className="form-error">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...formik.getFieldProps('userName')}
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="نام کاربری"
                    />
                    <label htmlFor="userName">نام کاربری</label>
                    {formik.touched.userName && formik.errors.userName ? (
                        <div className="form-error">{formik.errors.userName}</div>
                    ) : null}
                </div>
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
                        {...formik.getFieldProps('telNo')}
                        type="tel"
                        className="form-control"
                        id="telNo"
                        placeholder="شماره موبایل"
                    />
                    <label htmlFor="telNo">شماره موبایل</label>
                    {formik.touched.telNo && formik.errors.telNo ? (
                        <div className="form-error">{formik.errors.telNo}</div>
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
                <div className="form-floating mb-3">
                    <input
                        {...formik.getFieldProps('passwordConf')}
                        type="text"
                        className="form-control"
                        id="passwordConf"
                        placeholder="تایید رمز عبور"
                    />
                    <label htmlFor="passwordConf">تایید رمز عبور</label>
                    {formik.touched.passwordConf && formik.errors.passwordConf ? (
                        <div className="form-error">{formik.errors.passwordConf}</div>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className={`btn ${!formik.isValid ? 'btn-danger' : 'btn-success'}`}
                    disabled={!formik.isValid}
                >
                    ثبت نام
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;