import {useEffect, useState} from "react";
import CartTableItem from "./CartTableItem";
import {useCartState} from "../../Context/Cart/cartContext";

function CartTable() {
    const {cart} = useCartState()
    const [cartItems, setCartItems] = useState(cart);

    useEffect(() => {
        setCartItems(cart)
    }, [cart]);

    const renderedCartItems = cartItems && cartItems.map(product => <CartTableItem product={product} key={product.id} />)

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