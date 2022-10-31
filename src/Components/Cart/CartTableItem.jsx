import {Link} from "react-router-dom";
import {useCartDispatch} from "../../Context/Cart/cartContext";
import {BsDash, BsPlus, BsTrash} from "react-icons/bs";

function CartTableItem({product}) {
    const dispatch = useCartDispatch()

    const addToCart = (product) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                product
            }
        })
    }

    const minusFromCart = (product) => {
        dispatch({
            type: 'MINUS_FROM_CART',
            payload: {
                product
            }
        })
    }

    const removeFromCart = (product) => {
        dispatch({
            type: 'REMOVE_CART_ITEM',
            payload: {
                product
            }
        })
    }

    function totalPrice(product) {
        if(product.offPrice) {
            return product.qty * product.offPrice
        }
        return product.qty * product.price
    }

    return (
        <tr>
            <td style={{"width" : "15%"}}>
                <div className="cart-item-image">
                    <Link to={`/product/${product.id}`}>
                        <img src={product.image} alt={product.name}/>
                    </Link>
                </div>
            </td>
            <td style={{"width" : "40%"}}>
                <div className="cart-item-name">
                    <Link to={`/product/${product.id}`}>
                        {product.name}
                    </Link>
                </div>
            </td>
            <td style={{"width" : "15%"}}>
                <div className="cart-item-qty-wrapper">
                    <button onClick={() => addToCart(product)} className="cart-inc-btn">
                        <BsPlus />
                    </button>
                    <span className="cart-item-qty">{product.qty}</span>
                    <button onClick={() => minusFromCart(product)} className="cart-dec-btn">
                        <BsDash />
                    </button>
                </div>
            </td>
            <td style={{"width" : "15%"}}>
                <div className="cart-item-price">
                    <span className="cart-item-final-price">{totalPrice(product)}</span> تومان
                </div>
            </td>
            <td style={{"width" : "15%"}}>
                <div className="cart-item-remove">
                    <button onClick={() => removeFromCart(product)}>
                        <BsTrash /> حذف محصول
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default CartTableItem;