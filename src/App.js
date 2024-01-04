import './App.scss';

import Nav from './components/Navigation/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    return (
        <Router>

            <div className='app-container'>
                <Nav />
                <Switch>
                    <Route path="/about">
                        about
                    </Route>
                    <Route path="/news">
                        news
                    </Route>
                    <Route path="/contact">
                        contacts
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/" exact>
                        Home
                    </Route>
                    <Route path="*">
                        404 NOT FOUND!
                    </Route>
                </Switch>
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
