import { Fragment } from 'react';
import './App.scss';
import Nav from './components/Navigation/Nav';
import Login from './components/Login/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
function App() {
    return (
        <Router>

            <div className='app-container'>
                {/* <Nav /> */}
                <Switch>
                    <Route path="/about">
                        about
                    </Route>
                    <Route path="/news">
                        news
                    </Route>
                    <Route path="/contacts">
                        contacts
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/" exact>
                        Home
                    </Route>
                    <Route path="*">
                        404 NOT FOUND!
                    </Route>
                </Switch>

            </div>
        </Router>

    );
}

export default App;
