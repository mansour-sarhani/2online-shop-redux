import {useCartState} from "../../Context/Cart/cartContext";
import {useAuthState} from "../../Context/Auth/authContext";
import {Link} from "react-router-dom";

function CartSummary() {
    const {user, isLoggedIn} = useAuthState()
    const {total, orgTotal} = useCartState()

    return (
        <div className="cart-summary">
            <div className="cart-summary-item summary-org-price">
                <label>مبلغ کل:</label>
                <span>{orgTotal} تومان </span>
            </div>
            <div className="cart-summary-item summary-disc-price">
                <label>تخفیف:</label>
                <span>{orgTotal - total} تومان </span>
            </div>
            <div className="cart-summary-item summary-total-price border-0 m-0">
                <label>مبلغ قابل پرداخت:</label>
                <span>{total} تومان </span>
            </div>
            <div className="cart-summary-cta">
                {user && isLoggedIn
                    ?
                    <Link to={'/checkout'}>
                        <button className="btn btn-success">پرداخت</button>
                    </Link>
                    :
                    <>
                        <Link to={'/auth?redirect=checkout'} state={{ref: 'cart'}}>
                            <button className="btn btn-primary">ثبت نام | ورود</button>
                        </Link>
                        <span>برای خرید از سایت باید عضو شوید</span>
                    </>
                }
            </div>
        </div>
    );
}

export default CartSummary;