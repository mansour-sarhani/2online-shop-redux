import {useProductsDispatch} from "../../../Context/Product/productsContext";
import {BsPencilSquare, BsTrash} from "react-icons/bs";
import {Link} from "react-router-dom";

function DbTableItem({product}) {
    const dispatch = useProductsDispatch()

    const deleteProduct = (productId) => {
        dispatch({
            type: 'DELETE_PRODUCT',
            payload: productId
        })
    }

    return (
        <tr>
            <td style={{"width": "15%"}}>
                <div className="db-product-item-img">
                    <Link to={`/product/${product.id}`} state={{singleProduct : product}}>
                        <img src={product.image} alt={product.name}/>
                    </Link>
                </div>
            </td>
            <td style={{"width": "40%"}}>
                <div className="db-product-item-name">
                    <Link to={`/product/${product.id}`} state={{singleProduct : product}}>
                        <h5>{product.name}</h5>
                    </Link>
                    <span>شناسه محصول: </span>
                    <span>{product.uid}</span>
                    {product.feat && <div className="feat-product">محصول ویژه</div>}
                </div>
            </td>
            <td style={{"width": "15%"}}>
                <div className="db-product-item-org-price">
                    {product.price}
                    <span className="me-1">تومان</span>
                </div>
            </td>
            <td style={{"width": "15%"}}>
                <div className="db-product-item-final-price">
                    {product.offPrice
                        ?
                        <>
                            {product.offPrice}
                            <span className="me-1">تومان</span>
                        </>
                        :
                        '-'
                    }
                </div>
            </td>
            <td style={{"width": "15%"}}>
                <div className="db-product-item-actions">
                    <button
                        className="action-btn delete-btn text-danger"
                        onClick={() => deleteProduct(product.id)}
                    >
                        <BsTrash/>
                    </button>
                    <button className="action-btn edit-btn text-primary">
                        <Link to={`/admin/edit/${product.id}`} state={{ productVal: product }}>
                            <BsPencilSquare/>
                        </Link>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default DbTableItem;