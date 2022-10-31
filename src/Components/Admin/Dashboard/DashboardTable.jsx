import {useProductsState} from "../../../Context/Product/productsContext";
import DbTableItem from "./DbTableItem";

function DashboardTable() {
    const {products} = useProductsState()
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => (a.date < b.date) ? 1 : -1);

    const renderedProducts = sortedProducts.map(product => (<DbTableItem key={product.id} product={product}/>))

    return (
        <div className="db-products-wrapper">
            <table className="table table-bordered table-hover align-middle db-products-table text-center">
                <thead className="table-dark">
                <tr>
                    <th scope="col">تصویر شاخص</th>
                    <th scope="col">نام محصول</th>
                    <th scope="col">قیمت محصول</th>
                    <th scope="col">قیمت با تخفیف</th>
                    <th scope="col">عملیات</th>
                </tr>
                </thead>
                <tbody className="table-group-divider">
                    {renderedProducts}
                </tbody>
            </table>
        </div>
    );
}

export default DashboardTable;