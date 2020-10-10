import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "./../components/Header";

export const PublicRoute = (
  { isAuthenticated, component: Component, ...rest } // ...rest = spread op used in destructuring
) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        <Redirect to="/dashboard" /> // '/' path now redirects to dashboard instead of the login page
         ) : (
            <Component {...props} /> // allows user to view login page if they're NOT logged in
            )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid, // if unauth, we get false
});

export default connect(mapStateToProps)(PublicRoute);
