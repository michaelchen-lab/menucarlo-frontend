import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import axios from "axios"

import DataContextProvider from "./contexts/Data.Context"
import AuthContextProvider from "./contexts/Auth.Context"
import PrivateRoute from "./utils/PrivateRoute"
import Login from "./components/Login.Component"
// import Dashboard from "./components/Dashboard.Component"
import NewDashboard from "./components/NewDashboard.Component"

function App() {

    return (
        <Router>
            <Switch>
                <AuthContextProvider>
                    <DataContextProvider>
                        <Route path="/login" exact component={Login} />
                        <PrivateRoute path="/" exact component={NewDashboard} />
                    </DataContextProvider>
                </AuthContextProvider>
            </Switch>
        </Router>
    );
}

export default App;
