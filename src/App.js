import React from "react"
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";

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
                    <Route path="/login" exact component={Login} />
                    <PrivateRoute path="/" exact component={NewDashboard} />
                </AuthContextProvider>
            </Switch>
        </Router>
    );
}

export default App;
