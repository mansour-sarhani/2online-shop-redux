import Layout from "../Layout/Layout";
import '../Components/Cart/cart.css'
import CartTable from "../Components/Cart/CartTable";
import CartSummary from "../Components/Cart/CartSummary";
import {useSelector} from "react-redux";

function CartPage() {
    const {cart} = useSelector(state => state.cart)

    return (
        <Layout>
            <div className="inner-page cart-page">
                <div className="container">
                    <div className="cart-page-wrapper">
                        {cart.length === 0
                            ?
                            <div className="cart-empty-container">
                                <h4>سبد خرید خالی است ...</h4>
                            </div>
                            :
                            <>
                                <div className="cart-page-items">
                                    <CartTable />
                                </div>
                                <div className="cart-page-summary">
                                    <CartSummary />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;
