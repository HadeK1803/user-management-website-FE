import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUser/Users';
import Role from '../components/Role/Role';
// import _ from 'lodash';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = (props) => {
    const Projects = () => {
        return (
            <h1>Projects</h1>
        )
    }
    return (
        <>
            <Switch>
                {/* Use PrivateRoutes to check */}
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={Projects} />
                <PrivateRoutes path="/roles" component={Role} />

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
        </>
    )
}
export default AppRoutes;