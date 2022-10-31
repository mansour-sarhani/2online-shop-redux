import Layout from "../Layout/Layout";
import SingleProduct from "../Components/Products/SingleProduct";

function ProductPage() {
    return (
        <Layout>
            <div className="inner-page product-page">
                <div className="container">
                    <SingleProduct />
                </div>
            </div>
        </Layout>
    );
}

export default ProductPage;