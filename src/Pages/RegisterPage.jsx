import Layout from "../Layout/Layout";
import RegisterForm from "../Components/Auth/RegisterForm";
import '../Components/Auth/auth.css'

function RegisterPage() {
    return (
        <Layout>
            <div className="inner-page register-page">
                <div className="container">
                    <RegisterForm />
                </div>
            </div>
        </Layout>
    );
}

export default RegisterPage;