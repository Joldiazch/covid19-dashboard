import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Components */
import DashboardTotal from '../containers/dashboard/DashboardTotal';
import DashboardCountry from '../containers/dashboard/DashboardCountry';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={DashboardTotal}></Route>
            <Route exact path="/country" component={DashboardCountry}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route component={NotFound}></Route>
        </Switch>
    </BrowserRouter>
)

export default App;