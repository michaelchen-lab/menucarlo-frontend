import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner'

import { AuthContext } from "../contexts/Auth.Context"

const PrivateRoute = ({component: Component, ...rest}) => {

    const { auth } = useContext(AuthContext)

    if (auth.loading) {
        return (
            <Route {...rest} render={() => (
                <div className="py-4 px-4">
                    <Loader type="TailSpin" color="rgba(59, 130, 246)" height={50} width={50} />
                </div>
            )} />
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
