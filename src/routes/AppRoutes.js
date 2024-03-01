import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUser/Users';
import Role from '../components/Role/Role';
import Home from '../components/Home/Home';
import GroupRole from '../components/GroupRole/GroupRole';

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
            <div className='container mt-3'>
                <h1>Projects</h1>
            </div>
        )
    }
    return (
        <>
            <Switch>
                {/* Use PrivateRoutes to check */}
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={Projects} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/group-role" component={GroupRole} />

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="*">
                    <>
                        <div className='container mt-3'>
                            <h1>
                                404 NOT FOUND!
                            </h1>
                        </div>
                    </>
                </Route>
            </Switch>
        </>
    )
}
export default AppRoutes;