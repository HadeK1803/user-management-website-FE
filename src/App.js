import './App.scss';

import Nav from './components/Navigation/Nav';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState, useContext } from 'react';

import {
    BrowserRouter as Router
} from "react-router-dom";

import AppRoutes from './routes/AppRoutes';

import { TailSpin } from 'react-loader-spinner';

import { UserContext } from './context/UserContext';


function App() {
    const { user } = useContext(UserContext);

    return (
        <Router>
            {user && user.isLoading ?
                <div className='loading-container'>
                    <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#1877f2"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <div>Loading data...</div>
                </div>
                :
                <>
                    <div className='app-header'>
                        {/* Render Nav component when user logged in  */}
                        {/* {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />} */}
                        <Nav />
                    </div>

                    <div className='app-container'>
                        <AppRoutes />
                    </div>
                </>
            }

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
