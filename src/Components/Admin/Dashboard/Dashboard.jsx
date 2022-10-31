import {useProductsState} from "../../../Context/Product/productsContext";
import Loader from "../../../Common/Loader";
import './dashboard.css'
import DashboardTable from "./DashboardTable";

function Dashboard() {
    const {products, initialized} = useProductsState()

    if (!initialized) {
        return <Loader/>
    }

    if (products.length !==0 ) {
        return <DashboardTable />
    } else {
        return <p>هیح محصولی موجود نیست</p>
    }
}

export default Dashboard;

