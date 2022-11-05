import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getOneProduct from "../../Services/getOneProduct";
import {useDispatch, useSelector} from "react-redux";
import {ADD_TO_CART} from "../../Redux/cartSlice";

function SingleProduct() {
    const dispatch = useDispatch()
    const {cart} = useSelector(state => state.cart)
    function checkInCart(product, cart){
        if (cart) return cart.find(c => c.id === product.id)
    }

    const [product, setProduct] = useState({
        name: '',
        desc: '',
        price: '',
        offPrice: '',
        image: '',
        feat: null,
        uid: '',
        date: '',
    });

    const fetchedId = useParams()
    const productId = fetchedId.id

    useEffect(() => {
        const loadSingleProduct = async () => {
            await getOneProduct(productId)
                .then(res => {
                    setProduct(res.data)
                })
                .catch(error => console.log(error))
        }
        loadSingleProduct()
    }, [productId]);

    const addToCart = () => {
        dispatch(ADD_TO_CART(product))
    }

    return (
        <div className="single-product-wrapper">
            <div className="single-product-image-container">
                <img src={product.image} alt={product.name}/>
                {product.offPrice && <span className="sales-ribbon">تخفیف</span>}
                {product.feat && <span className="feat-ribbon">فروش ویژه</span>}
            </div>
            <div className="single-product-info-container">
                <div className="single-product-title">
                    <h1>{product.name}</h1>
                    <span className="single-product-uid">شناسه محصول: </span><span>{product.uid}</span>
                </div>
                <div className="single-product-desc">
                    <h5>توضیحات محصول:</h5>
                    <p>{product.desc}</p>
                </div>
                <div className="single-product-price">
                    {product.offPrice
                    ?
                        <div className="single-product-price-container">
                            <span className="product-org-price">{product.price} تومان </span>
                            <span className="product-final-price">{product.offPrice} تومان </span>
                        </div>
                    :
                        <div className="single-product-price-container">
                            <span className="product-final-price">{product.price} تومان </span>
                        </div>
                    }
                </div>
                <div className="single-product-cta">
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
        </div>
    );
}

export default SingleProduct;