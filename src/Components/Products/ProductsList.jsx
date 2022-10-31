import ArchiveProduct from "./ArchiveProduct";
import './products.css'
import Loader from "../../Common/Loader";
import {useProductsState} from "../../Context/Product/productsContext";

function ProductsList() {
    const {products, initialized} = useProductsState()

    const renderedProducts = products.map(product => <ArchiveProduct key={product.uid} product={product}/>)

    if (!initialized) {
        return <Loader/>
    }

    if (products.length !==0 ) {
        return (
            <div className="products-wrapper">
                {renderedProducts}
            </div>
        )
    } else {
        return <p>هیح محصولی موجود نیست</p>
    }
}

export default ProductsList;