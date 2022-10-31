import Layout from "../Layout/Layout";
import RegisterForm from "../Components/Auth/RegisterForm";
import LoginForm from "../Components/Auth/LoginForm";
import '../Components/Auth/auth.css'

function AuthPage() {
    return (
        <Layout>
            <div className="inner-page auth-page">
                <div className="container">
                    <div className="auth-page-wrapper">
                        <div className="auth-page-register">
                            <RegisterForm />
                        </div>
                        <div className="auth-page-login">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AuthPage;