import "./App.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router/router";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppInit from "./Components/AppInit";

function App() {
    return (
        <>
            <AppInit />
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <RouterProvider router={router}/>
        </>
    )
}

export default App;
