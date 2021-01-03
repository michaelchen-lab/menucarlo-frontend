import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from "../contexts/Auth.Context"

const PrivateRoute = ({component: Component, ...rest}) => {

    const { auth } = useContext(AuthContext)

    if (auth.loading) {
        return (
            <Route {...rest} render={() => {
                return <p>Loading...</p>;
            }} />
        )
    }

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            auth.isAuthenticated ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;
