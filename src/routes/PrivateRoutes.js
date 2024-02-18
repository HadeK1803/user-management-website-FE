import {
    // BrowserRouter as Router,
    // Switch,
    Route,
} from "react-router-dom";

import { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';

import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);

    let history = useHistory();

    useEffect(() => {
        console.log('Check context user: ', user);
        let session = sessionStorage.getItem("account");
        if (!session) {
            history.push("/login");
            window.location.reload();
        }
        if (session) {
            //check role
        }
    }, []);
    return (
        <>
            <Route path={props.path} component={props.component}></Route>
        </>
    )
}
export default PrivateRoutes;