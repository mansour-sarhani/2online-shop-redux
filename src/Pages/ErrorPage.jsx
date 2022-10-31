import { useRouteError } from "react-router-dom";
import Layout from "../Layout/Layout";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Layout>
            <div className="inner-page error-page">
                <div className="container">
                    <p>یک خطایی رخ داده است ...</p>
                    <p>
                        <i>{error.statusText || error.message}</i>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
