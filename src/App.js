import logo from "./logo.svg";
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import DataContextProvider from "./contexts/Data.Context"
import Dashboard from "./components/Dashboard.Component"

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div>
                        <p className="text-7xl">Hello World!</p>
                    </div>
                </Route>
                <DataContextProvider>
                    <Route path="/dashboard/:name" children={ <Dashboard /> } />
                </DataContextProvider>
            </Switch>
        </Router>
    );
}

export default App;
