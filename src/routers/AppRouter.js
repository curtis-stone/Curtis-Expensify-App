import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";

import ExpenseDashboardPage from './../components/ExpenseDashboardPage'
import AddExpensePage from './../components/AddExpensePage'
import EditPage from '../components/EditPage';
import HelpPage from './../components/HelpPage';
import NotFoundPage from './../components/NotFoundPage';
import Header from './../components/Header';

  
   
   

    const AppRouter = () => (
        <BrowserRouter>
        <div>
        <Header />
          <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true}/>
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit/:id" component={EditPage} /> 
            <Route path="/help" component={HelpPage} />
            <Route component={NotFoundPage} />
          </Switch>
          </div>
        </BrowserRouter>
    )

  // exact={true} sets paths to be absolute matches
  // switch moves through routes and stops when it finds a match. never checks the rest
  // switch gives the 404 page when no path matches are found

  //dynamic routing => adding /:id dynamically matches whatever comes after the / and gives us access to that value

  export default AppRouter;