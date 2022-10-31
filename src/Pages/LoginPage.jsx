import Layout from "../Layout/Layout";
import LoginForm from "../Components/Auth/LoginForm";
import '../Components/Auth/auth.css'

function LoginPage() {
    return (
        <Layout>
            <div className="inner-page login-page">
                <div className="container">
                    <LoginForm />
                </div>
            </div>
        </Layout>
    );
}

export default LoginPage;