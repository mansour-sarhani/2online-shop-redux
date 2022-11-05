import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ADD_TO_CART} from "../../Redux/cartSlice";

function ArchiveProduct({product}) {
    const {cart} = useSelector(state => state.cart)
    const dispatch = useDispatch()

    function checkInCart(product, cart){
        if (cart) return cart.find(c => c.id === product.id)
    }

    const addToCart = (product) => {
        dispatch(ADD_TO_CART(product))
    }

    return (
        <div className="product-item">
            <div className="product-img">
                <Link to={`/product/${product.id}`} state={{singleProduct : product}}>
                    <img src={product.image} alt={product.name}/>
                </Link>
            </div>
            <div className="product-name">
                <Link to={`/product/${product.id}`} state={{singleProduct : product}}>
                    <h4>{product.name}</h4>
                </Link>
            </div>
            <div className="product-meta">
                <div className="product-price">
                    {product.price && !product.offPrice
                        ?
                        <span className="final-price">{product.price} تومان</span>
                        :
                        <>
                            <span className="org-price">
                                {product.price} تومان
                            </span>
                            <span className="final-price">
                                {product.offPrice} تومان
                            </span>
                        </>
                    }
                </div>
                <div className="product-add-to-cart">
                    {checkInCart(product, cart)
                    ?
                        <Link to={"/cart"}>
                            <button>ادامه خرید</button>
                        </Link>
                    :
                        <button onClick={() => addToCart(product)}>افزودن به سبد خرید</button>
                    }
                </div>
            </div>
            {product.offPrice && <span className="sales-ribbon">تخفیف</span>}
            {product.feat && <span className="feat-ribbon">فروش ویژه</span>}
        </div>
    );
}

export default ArchiveProduct;