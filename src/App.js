import './App.scss';

import Nav from './components/Navigation/Nav';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';

import {
    BrowserRouter as Router
} from "react-router-dom";

import AppRoutes from './routes/AppRoutes';

function App() {

    // const [account, setAccount] = useState({});

    useEffect(() => {
        // let session = sessionStorage.getItem("account");
        // if (session) {
        //     setAccount(JSON.parse(session));
        // }
    }, [])

    return (
        <Router>
            <div className='app-header'>
                {/* Render Nav component when user logged in  */}
                {/* {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />} */}
                <Nav />

            </div>
            <div className='app-container'>
                <AppRoutes />

            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>

    );
}

export default App;
