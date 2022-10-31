import {Link, useParams} from "react-router-dom";
import {useCartDispatch} from "../../Context/Cart/cartContext";
import {useEffect, useState} from "react";
import getOneProduct from "../../Services/getOneProduct";

function SingleProduct() {
    const dispatch = useCartDispatch()
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
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                product
            }
        })
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
                    <Link>
                        <button onClick={addToCart}>افزودن به سبد خرید</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;