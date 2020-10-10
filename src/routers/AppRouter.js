import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'; // create my own history
import LoginPage from "../components/LoginPage";
import ExpenseDashboardPage from "./../components/ExpenseDashboardPage";
import AddExpensePage from "./../components/AddExpensePage";
import EditPage from "../components/EditPage";
import HelpPage from "./../components/HelpPage";
import NotFoundPage from "./../components/NotFoundPage";

import PrivateRoute from './PrivateRoute'

export const history = createHistory();
 // npm-hisotry: react router usage that is manipulated to outsorce history call
 // use regular "<Router />" instead of the BrowserROuter that has its own history already built in

 const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditPage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

// exact={true} sets paths to be absolute matches
// switch moves through routes and stops when it finds a match. never checks the rest
// switch gives the 404 page when no path matches are found

//dynamic routing => adding /:id dynamically matches whatever comes after the / and gives us access to that value

export default AppRouter;
