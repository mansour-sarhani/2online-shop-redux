import Layout from "../Layout/Layout";
import ProductsList from "../Components/Products/ProductsList";

export default function ShopPage() {
    return (
        <Layout>
            <div className="inner-page shop-page">
                <div className="container">
                    <ProductsList />
                </div>
            </div>
        </Layout>
    );
}
