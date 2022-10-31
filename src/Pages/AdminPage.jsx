import React from "react";
import Layout from "../Layout/Layout";
import {Link, Outlet} from "react-router-dom";
import '../Components/Admin/admin.css'

export default function AdminPage() {
    return (
        <Layout>
            <div className="inner-page admin-page">
                <div className="container">
                    <div className="admin-page-container">
                        <div className="admin-page-sidebar">
                            <ul>
                                <li>
                                    <Link to={'/admin/dashboard'}>داشبورد</Link>
                                </li>
                                <li>
                                    <Link to={'/admin/add-product'}>افزودن محصول جدید</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="admin-page-content">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
