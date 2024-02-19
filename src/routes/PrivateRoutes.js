import {
    // BrowserRouter as Router,
    // Switch,
    Route,
} from "react-router-dom";

import { useEffect, useContext } from "react";
import { useHistory, Redirect } from 'react-router-dom';

import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);

    // let history = useHistory();

    // Only user is logged in can use PrivateRoutes
    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component}></Route>
            </>
        )
    } else {
        return (
            <Redirect to='/login'></Redirect>
        )
    }
}
export default PrivateRoutes;