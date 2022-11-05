import Loader from "../../../Common/Loader";
import './dashboard.css'
import DashboardTable from "./DashboardTable";
import {useSelector} from "react-redux";

function Dashboard() {
    const {products, initialized} = useSelector(state => state.products)

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

