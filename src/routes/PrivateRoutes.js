import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

const PrivateRoutes = (props) => {
    let history = useHistory();
    useEffect(() => {
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