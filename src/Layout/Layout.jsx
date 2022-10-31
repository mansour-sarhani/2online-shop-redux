import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import './layout.css'

const Layout = ({ children }) => {
    return (
        <div className="main-wrapper">
            <Header />
            <div className="page-wrapper">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
