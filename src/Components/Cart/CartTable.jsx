import CartTableItem from "./CartTableItem";
import {useSelector} from "react-redux";

function CartTable() {
    const {cart} = useSelector(state => state.cart)

    const renderedCartItems = cart && cart.map(product => <CartTableItem product={product} key={product.id} />)

    return (
        <div className="cart-table">
            <table className="table table-bordered table-hover align-middle cart-products-table text-center">
                <tbody className="table-group-divider">
                    {renderedCartItems}
                </tbody>
            </table>
        </div>
    );
}

export default CartTable;