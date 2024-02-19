import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {

    const userDefaultData = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    }
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(userDefaultData);

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            isAuthenticated: false,
            token: '',
            account: {}
        }));
    };
    // 
    const fetchUserAccount = async () => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
            //set data for login context
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.accessToken;

            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username },
                isLoading: false,
            }
            setUser(data);
        }
        else {
            setUser({ ...userDefaultData, isLoading: false });
        }
    }

    useEffect(() => {
        // Featch user account when the path is not '/' or '/login'
        if (window.location.pathname !== '/' || window.location.pathname !== '/login') {
            fetchUserAccount();
        } else {
            setUser({ ...userDefaultData, isLoading: false });
        }
    }, [])


    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };