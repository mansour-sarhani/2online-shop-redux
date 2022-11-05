import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import ShopPage from "../Pages/ShopPage";
import AdminPage from "../Pages/AdminPage";
import Dashboard from "../Components/Admin/Dashboard/Dashboard";
import AddProductForm from "../Components/Admin/AddProduct/AddProductForm";
import EditProductForm from "../Components/Admin/AddProduct/EditProductForm";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";
import ProfilePage from "../Pages/ProfilePage";
import AuthPage from "../Pages/AuthPage";
import CheckOutPage from "../Pages/CheckOutPage";

export const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={<HomePage/>} errorElement={<ErrorPage/>}/>,
        <Route path="/shop" element={<ShopPage/>} errorElement={<ErrorPage/>} />,
        <Route path="/admin" element={<AdminPage/>} errorElement={<ErrorPage/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>,
            <Route path="/admin/add-product" element={<AddProductForm/>}/>,
            <Route path="/admin/edit/:id" element={<EditProductForm/>}/>,
            <Route path="*" element={<ErrorPage/>}/>
        </Route>,
        <Route path="/product/:id" element={<ProductPage/>} errorElement={<ErrorPage/>} />,
        <Route path="/cart" element={<CartPage/>} errorElement={<ErrorPage/>} />,
        <Route path="/profile" element={<ProfilePage/>} errorElement={<ErrorPage/>} />,
        <Route path="/auth" element={<AuthPage/>} errorElement={<ErrorPage/>} />,
        <Route path="/checkout" element={<CheckOutPage/>} errorElement={<ErrorPage/>} />,
    ])
);